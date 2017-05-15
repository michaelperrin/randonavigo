<?php

namespace AppBundle\Controller;

use RandoNavigo\Document\Hike;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

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
        return $this->render('hike/list.html.twig', ['posts' => $hikes]);
    }
}
