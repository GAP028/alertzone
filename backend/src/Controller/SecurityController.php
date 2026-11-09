<?php
namespace App\Controller;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

class SecurityController
{
    // La requête POST /api/login est interceptée par le firewall "json_login".
    // Cette méthode n'est donc jamais réellement exécutée : en cas de succès,
    // c'est lexik qui renvoie le jeton JWT.
    #[Route('/api/login', name: 'api_login', methods: ['POST'])]
    public function login(): JsonResponse
    {
        return new JsonResponse(
            ['erreur' => 'Authentification non traitée.'],
            401
        );
    }
}
