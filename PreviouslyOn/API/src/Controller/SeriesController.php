<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Contracts\HttpClient\HttpClientInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class SeriesController extends AbstractController
{
    private $client;

    public function __construct(HttpClientInterface $client)
    {

        $this->client = $client;
    }
    /**
     * @Route("/serie_details", name="series_details", methods={"POST", "GET"})
     */
    public function serieDetails(Request $request): Response
    {
        $parameters = json_decode($request->getContent(), true);

        $serie_id = $parameters['serie_id'];

        $data = array(
            'id' => $serie_id
        );

        $response = $this->client->request(

            'GET',
            'https://api.betaseries.com/shows/display?key=API_KEY',
            [
                'body' => $data,
            ]

        );
        return new Response($response->getContent());
    }

    /**
     * @Route("/series_kind", name="series_kind", methods={"POST", "GET"})
     */
    public function seriesKind(Request $request): Response
    {
        $response = $this->client->request(

            'GET',
            'https://api.betaseries.com/shows/genres?key=API_KEY',
        );
        return new Response($response->getContent());
    }

    /**
     * @Route("/all_series", name="all_series", methods={"POST", "GET"})
     */
    public function allSeries(Request $request): Response
    {
        $response = $this->client->request(

            'GET',
            'https://api.betaseries.com/shows/list?key=API_KEY&order=popularity',
        );
        return new Response($response->getContent());
    }

    /**
     * @Route("/series_by_kind", name="series_by_kind", methods={"POST", "GET"})
     */
    public function displaySeriesbyKind(Request $request): Response
    {
        $parameters = json_decode($request->getContent(), true);

        $serie_kind = $parameters['genre'];
        echo $serie_kind;


        $data = array(
            'genres' => $serie_kind
        );
        print_r($data);
        $response = $this->client->request(

            'GET',
            'https://api.betaseries.com/search/shows?key=API_KEY',
            [
                'body' => $data,
            ]
        );
        return new Response($response->getContent());
    }

    /**
     * @Route("/serie_picture", name="serie_picture", methods={"POST", "GET"})
     */
    public function getPictureSerie(Request $request): Response
    {
        $parameters = json_decode($request->getContent(), true);

        $id_serie = $parameters['idSerie'];

        $response = $this->client->request(

            'GET',
            'https://api.betaseries.com/shows/display?key=API_KEY&id=' . $id_serie,
        );
        return new Response($response->getContent());
    }

    /**
     * @Route("/episode_details", name="episode_details", methods={"POST", "GET"})
     */
    public function getEpisodeDetails(Request $request): Response
    {
        $parameters = json_decode($request->getContent(), true);

        $id_serie = $parameters['idSerie'];

        $response = $this->client->request(

            'GET',
            'https://api.betaseries.com/episodes/display?key=API_KEY&id=' . $id_serie,
        );
        return new Response($response->getContent());
    }

    /**
     * @Route("/episode_picture", name="episode_picture", methods={"POST", "GET"})
     */
    public function getEpisodePicture(Request $request): Response
    {
        $parameters = json_decode($request->getContent(), true);

        $id_serie = $parameters['idSerie'];

        $response = $this->client->request(

            'GET',
            'https://api.betaseries.com/pictures/episodes?key=API_KEY&id=' . $id_serie,
        );
        return new Response($response->getContent());
    }
}
