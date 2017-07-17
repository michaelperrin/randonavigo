<?php

namespace AppBundle\Controller;

use RandoNavigo\Document\Hike;
use RandoNavigo\Manager\HikeManager;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\ResponseHeaderBag;

class HikeController extends Controller
{
    /**
     * @Route("/", name="homepage")
     */
    public function indexAction(Request $request)
    {
        $dm = $this->get('doctrine_mongodb')->getManager();
        $hikes = $dm->getRepository(Hike::class)->findBy([], ['publicationDate' => 'DESC']);

        // replace this example code with whatever you need
        return $this->render('hike/list.html.twig', ['hikes' => $hikes]);
    }

    /**
     * @Route(
     *     "/{date}/{slug}",
     *     name="hike_show",
     *     requirements={
     *         "date": "\d{4}/\d{2}/\d{2}"
     *     }
     * )
     */
    public function showAction(Hike $hike)
    {
        return $this->render('hike/show.html.twig', ['hike' => $hike]);
    }

    /**
     * @Route("/download/{slug}.gpx", name="hike_download_gpx_file")
     *
     * @param  Hike   $hike
     */
    public function downloadGpxAction(Hike $hike, HikeManager $hikeManager)
    {
        $gpxContent = $hikeManager->getGpxFileContent($hike);

        $response = new Response($gpxContent);

        $disposition = $response->headers->makeDisposition(
            ResponseHeaderBag::DISPOSITION_ATTACHMENT,
            $hike->getGpxFile()
        );

        $response->headers->set('Content-Type', 'application/gpx+xml');
        $response->headers->set('Content-Disposition', $disposition);

        return $response;
    }

    /**
     * @Route("{slug}.gpx", name="hike_gpx_file", defaults={"_format": "xml"})
     *
     * @param  Hike   $hike
     */
    public function gpxAction(Hike $hike, HikeManager $hikeManager)
    {
        $gpxContent = $hikeManager->getGpxFileContent($hike);

        return new Response($gpxContent);
    }
}
