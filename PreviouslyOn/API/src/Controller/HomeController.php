<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Contracts\HttpClient\HttpClientInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class HomeController extends AbstractController
{

    private $client;

    public function __construct(HttpClientInterface $client)
    {

        $this->client = $client;
    }

    /**
     * @Route("/home", name="home", methods={"GET", "POST"})
     */
    public function getGenderSeries(Request $request): Response
    {
        $response = $this->client->request(

            'GET',
            'https://api.betaseries.com/members/auth?key=API_KEY',
        );
        return new Response($response->getContent());
    }
}
