<?php

namespace AppBundle\Controller;

use RandoNavigo\Document\Hike;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class HikeController extends Controller
{
    /**
     * @Route("/", name="homepage")
     */
    public function indexAction(Request $request)
    {
        $dm = $this->get('doctrine_mongodb')->getManager();
        $hikes = $dm->getRepository(Hike::class)->findAll();

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
     * @Route("{slug}.gpx", name="hike_gpx_file", defaults={"_format": "xml"})
     *
     * @param  Hike   $hike [description]
     */
    public function gpxAction(Hike $hike)
    {
        $filePath = $hike->getGpxFilePath();
        $xml = $this->get('app.gpx.segment_merger_transformer')->transform($filePath);

        return new Response($xml);
    }
}
