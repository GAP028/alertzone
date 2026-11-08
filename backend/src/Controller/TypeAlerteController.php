<?php
namespace App\Controller;

use App\Repository\TypeAlerteRepository;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api')]
class TypeAlerteController
{
    // GET /api/types-alerte -> liste des types (clé, libellé, couleur)
    #[Route('/types-alerte', methods: ['GET'])]
    public function liste(TypeAlerteRepository $repo): JsonResponse
    {
        $data = array_map(fn($t) => [
            'id' => $t->getId(),
            'cle' => $t->getCle(),
            'libelle' => $t->getLibelle(),
            'couleur' => $t->getCouleur(),
        ], $repo->findAll());
        return new JsonResponse($data);
    }
}
