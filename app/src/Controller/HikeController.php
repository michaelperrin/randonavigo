<?php

namespace RandoNavigo\Controller;

use Doctrine\ODM\MongoDB\DocumentManager;
use RandoNavigo\Document\Hike;
use RandoNavigo\Manager\HikeManager;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\ResponseHeaderBag;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Routing\Annotation\Route;

class HikeController extends AbstractController
{
    /**
     * @Route("/", name="homepage")
     */
    public function indexAction(Request $request, DocumentManager $dm)
    {
        $hikes = $dm->getRepository(Hike::class)->findBy(
            ['hidden' => false],
            ['publicationDate' => 'DESC']
        );

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
    public function showAction(DocumentManager $dm, string $slug)
    {
        $hike = $dm->getRepository(Hike::class)->findOneBy(['slug' => $slug]);

        if (!$hike) {
            throw new NotFoundHttpException(
                sprintf('Hike of slug "%s" was not found', $slug)
            );
        }

        return $this->render('hike/show.html.twig', ['hike' => $hike]);
    }

    /**
     * @Route("/download/{slug}.gpx", name="hike_download_gpx_file")
     */
    public function downloadGpxAction(DocumentManager $dm, HikeManager $hikeManager, string $slug)
    {
        $hike = $dm->getRepository(Hike::class)->findOneBy(['slug' => $slug]);

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
}
