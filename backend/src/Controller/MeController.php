<?php
namespace App\Controller;

use App\Entity\Utilisateur;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\CurrentUser;

class MeController
{
    // GET /api/me -> informations de l'utilisateur connecté (via son token)
    #[Route('/api/me', name: 'api_me', methods: ['GET'])]
    public function me(#[CurrentUser] ?Utilisateur $user): JsonResponse
    {
        if (!$user) {
            return new JsonResponse(['erreur' => 'Non authentifié.'], 401);
        }
        return new JsonResponse([
            'id' => $user->getId(),
            'email' => $user->getEmail(),
            'nom' => $user->getNom(),
            'prenom' => $user->getPrenom(),
            'roles' => $user->getRoles(),
        ]);
    }
}
