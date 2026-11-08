<?php
namespace App\Controller;

use App\Entity\Alerte;
use App\Repository\AlerteRepository;
use App\Repository\TypeAlerteRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api')]
class AlerteController
{
    // Transforme une entité Alerte en tableau JSON (format attendu par le front React)
    private function serialiser(Alerte $a): array
    {
        return [
            'id' => $a->getId(),
            'type' => $a->getType()?->getCle(),
            'titre' => $a->getTitre(),
            'description' => $a->getDescription(),
            'latitude' => (float) $a->getLatitude(),
            'longitude' => (float) $a->getLongitude(),
            'niveauGravite' => $a->getNiveauGravite(),
            'statut' => $a->getStatut(),
            'nombreConfirmations' => $a->getNombreConfirmations(),
            'nombreFausseAlertes' => $a->getNombreFausseAlertes(),
            'rayon' => $a->getRayon(),
            'date' => $a->getDateCreation()->format('c'),
        ];
    }

    // GET /api/alertes -> liste de toutes les alertes
    #[Route('/alertes', methods: ['GET'])]
    public function liste(AlerteRepository $repo): JsonResponse
    {
        $data = array_map([$this, 'serialiser'], $repo->findBy([], ['dateCreation' => 'DESC']));
        return new JsonResponse($data);
    }

    // POST /api/alertes -> crée une nouvelle alerte (signalement citoyen)
    #[Route('/alertes', methods: ['POST'])]
    public function creer(Request $req, EntityManagerInterface $em, TypeAlerteRepository $types): JsonResponse
    {
        $d = json_decode($req->getContent(), true) ?? [];
        if (empty($d['titre']) || empty($d['type'])) {
            return new JsonResponse(['erreur' => 'Le titre et le type sont obligatoires.'], 400);
        }
        $type = $types->findOneBy(['cle' => $d['type']]);
        if (!$type) {
            return new JsonResponse(['erreur' => 'Type inconnu.'], 400);
        }
        $a = new Alerte();
        $a->setTitre($d['titre'])
          ->setDescription($d['description'] ?? 'Signalement citoyen.')
          ->setType($type)
          ->setNiveauGravite((int) ($d['niveauGravite'] ?? 1))
          ->setLatitude((string) ($d['latitude'] ?? 48.8566))
          ->setLongitude((string) ($d['longitude'] ?? 2.3522))
          ->setRayon((int) ($d['rayon'] ?? 250))
          ->setStatut('validee');
        $em->persist($a);
        $em->flush();
        return new JsonResponse($this->serialiser($a), 201);
    }

    // PATCH /api/alertes/{id}/confirmer -> +1 confirmation
    #[Route('/alertes/{id}/confirmer', methods: ['PATCH'])]
    public function confirmer(Alerte $a, EntityManagerInterface $em): JsonResponse
    {
        $a->setNombreConfirmations($a->getNombreConfirmations() + 1);
        $em->flush();
        return new JsonResponse($this->serialiser($a));
    }

    // PATCH /api/alertes/{id}/fausse -> +1 fausse alerte
    #[Route('/alertes/{id}/fausse', methods: ['PATCH'])]
    public function fausse(Alerte $a, EntityManagerInterface $em): JsonResponse
    {
        $a->setNombreFausseAlertes($a->getNombreFausseAlertes() + 1);
        $em->flush();
        return new JsonResponse($this->serialiser($a));
    }
}
