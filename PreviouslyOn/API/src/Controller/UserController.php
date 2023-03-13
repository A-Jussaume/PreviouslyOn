<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Contracts\HttpClient\HttpClientInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class UserController extends AbstractController
{
    private $client;

    public function __construct(HttpClientInterface $client)
    {

        $this->client = $client;
    }
    /**
     * @Route("/api/login", name="login", methods={"POST", "GET"})
     */
    public function login(Request $request): Response
    {
        $parameters = json_decode($request->getContent(), true);
        $login = $parameters['user'];
        $password = MD5($parameters['password']);

        $data = array(
            'login' => $login,
            'password' => $password
        );

        try {
            $response = $this->client->request(

                'POST',
                'https://api.betaseries.com/members/auth?key=API_KEY',
                [
                    'body' => $data,
                ]
            );
            return new Response($response->getContent());
        } catch (\Exception $e) {
            return new Response(400);
        }
    }

    /**
     * @Route("/current_user_series", name="current_user_series", methods={"POST", "GET"})
     */
    public function getCurrentUserSeries(Request $request): Response
    {
        $parameters = json_decode($request->getContent(), true);
        $user_id = $parameters['user_id'];

        $data = array(
            'id' => $user_id,
            'status' => 'current'
        );

        try {
            $response = $this->client->request(

                'GET',
                'https://api.betaseries.com/shows/member?key=API_KEY',
                [
                    'body' => $data,
                ]
            );
            return new Response($response->getContent());
        } catch (\Exception $e) {
            return new Response(400);
        }
    }

    /**
     * @Route("/archived_user_series", name="archived_user_series", methods={"POST", "GET"})
     */
    public function getArchivedUserSeries(Request $request): Response
    {
        $parameters = json_decode($request->getContent(), true);
        $user_id = $parameters['user_id'];

        $data = array(
            'id' => $user_id,
            'status' => 'archived'
        );

        try {
            $response = $this->client->request(

                'GET',
                'https://api.betaseries.com/shows/member?key=API_KEY',
                [
                    'body' => $data,
                ]
            );
            return new Response($response->getContent());
        } catch (\Exception $e) {
            return new Response(400);
        }
    }

    /**
     * @Route("/user_serie_episodes_not_seen", name="user_serie_episodes_not_seen", methods={"POST", "GET"})
     */
    public function userSerieEpisodesNotSeen(Request $request): Response
    {
        $parameters = json_decode($request->getContent(), true);
        $id_serie = $parameters['idSerie'];
        $user_token = $parameters['userToken'];

        $data = array(
            'showId' => $id_serie,
            'limit' => "1000",
        );

        try {
            $response = $this->client->request(

                'GET',
                'https://api.betaseries.com/episodes/list?key=API_KEY',
                [
                    "headers" => ["Authorization" => "Bearer " . $user_token,],
                    'body' => $data,
                ]
            );
            return new Response($response->getContent());
        } catch (\Exception $e) {
            return new Response(400);
        }
    }

    /**
     * @Route("/add_serie", name="add_serie", methods={"POST", "GET"})
     */
    public function addSerie(Request $request): Response
    {
        $parameters = json_decode($request->getContent(), true);
        $id_serie = $parameters['idSerie'];
        $user_token = $parameters['userToken'];

        $data = array(
            'id' => $id_serie,
        );

        try {
            $response = $this->client->request(

                'POST',
                'https://api.betaseries.com/shows/show?key=API_KEY',
                [
                    "headers" => ["Authorization" => "Bearer " . $user_token,],
                    'body' => $data,
                ]
            );
            return new Response($response->getContent());
        } catch (\Exception $e) {
            return new Response(400);
        }
    }

    /**
     * @Route("/delete_serie", name="delete_serie", methods={"POST", "GET"})
     */
    public function deleteSerie(Request $request): Response
    {
        $parameters = json_decode($request->getContent(), true);
        $id_serie = $parameters['idSerie'];
        $user_token = $parameters['userToken'];
        print_r($id_serie);
        print_r($user_token);


        $data = array(
            'id' => $id_serie,
        );

        try {
            $response = $this->client->request(

                "DELETE",
                'https://api.betaseries.com/shows/show?key=API_KEY',
                [
                    "headers" => ["Authorization" => "Bearer " . $user_token,],
                    'body' => $data,
                ]
            );
            return new Response($response->getContent());
        } catch (\Exception $e) {
            return new Response(400);
        }
    }

    /**
     * @Route("/archiver_serie", name="archiver_serie", methods={"POST", "GET"})
     */
    public function archiveSerie(Request $request): Response
    {
        $parameters = json_decode($request->getContent(), true);
        $id_serie = $parameters['idSerie'];
        $user_token = $parameters['userToken'];
        print_r($id_serie);
        print_r($user_token);


        $data = array(
            'id' => $id_serie,
        );

        try {
            $response = $this->client->request(

                "POST",
                'https://api.betaseries.com/shows/archive?key=API_KEY',
                [
                    "headers" => ["Authorization" => "Bearer " . $user_token,],
                    'body' => $data,
                ]
            );
            return new Response($response->getContent());
        } catch (\Exception $e) {
            return new Response(400);
        }
    }

    /**
     * @Route("/add_episode_watched", name="add_episode_watched", methods={"POST", "GET"})
     */
    public function addEpisodeWatched(Request $request): Response
    {
        $parameters = json_decode($request->getContent(), true);
        $id_episode = $parameters['idEpisode'];
        $user_token = $parameters['userToken'];

        $data = array(
            'id' => $id_episode,
        );

        try {
            $response = $this->client->request(

                'POST',
                'https://api.betaseries.com/episodes/watched?key=API_KEY&bulk=false',
                [
                    "headers" => ["Authorization" => "Bearer " . $user_token,],
                    'body' => $data,
                ]
            );
            return new Response($response->getContent());
        } catch (\Exception $e) {
            return new Response(400);
        }
    }

    /**
     * @Route("/add_multiple_episode_watched", name="add_multiple_episode_watched", methods={"POST", "GET"})
     */
    public function addMultipleEpisodeWatched(Request $request): Response
    {
        $parameters = json_decode($request->getContent(), true);
        $id_episode = $parameters['idEpisode'];
        $user_token = $parameters['userToken'];

        $data = array(
            'id' => $id_episode,
        );

        try {
            $response = $this->client->request(

                'POST',
                'https://api.betaseries.com/episodes/watched?key=API_KEY&bulk=true',
                [
                    "headers" => ["Authorization" => "Bearer " . $user_token,],
                    'body' => $data,
                ]
            );
            return new Response($response->getContent());
        } catch (\Exception $e) {
            return new Response(400);
        }
    }

    /**
     * @Route("/comment_episode", name="comment_episode", methods={"POST", "GET"})
     */
    public function commentEpisode(Request $request): Response
    {
        $parameters = json_decode($request->getContent(), true);
        $id_episode = $parameters['idEpisode'];
        $type = $parameters['type'];
        $comment = $parameters['text'];
        $user_token = $parameters['userToken'];

        $data = array(
            'type' => $type,
            'id' => $id_episode,
            'text' => $comment,
        );

        try {
            $response = $this->client->request(

                'POST',
                'https://api.betaseries.com/comments/comment?key=API_KEY',
                [
                    "headers" => ["Authorization" => "Bearer " . $user_token,],
                    'body' => $data,
                ]
            );
            return new Response($response->getContent());
        } catch (\Exception $e) {
            return new Response(400);
        }
    }
}
