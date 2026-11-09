<?php
namespace App\Controller;

use App\Entity\Utilisateur;
use App\Repository\UtilisateurRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api')]
class RegistrationController
{
    // POST /api/register -> crée un compte citoyen avec mot de passe haché
    #[Route('/register', methods: ['POST'])]
    public function register(
        Request $req,
        EntityManagerInterface $em,
        UserPasswordHasherInterface $hasher,
        UtilisateurRepository $repo
    ): JsonResponse {
        $d = json_decode($req->getContent(), true) ?? [];

        if (empty($d['email']) || empty($d['password'])) {
            return new JsonResponse(['erreur' => 'Email et mot de passe obligatoires.'], 400);
        }
        if ($repo->findOneBy(['email' => $d['email']])) {
            return new JsonResponse(['erreur' => 'Cet email est déjà utilisé.'], 409);
        }

        $user = new Utilisateur();
        $user->setEmail($d['email'])
             ->setNom($d['nom'] ?? '')
             ->setPrenom($d['prenom'] ?? '')
             ->setTelephone($d['telephone'] ?? null)
             ->setRoles(['ROLE_USER']);
        // Hachage du mot de passe (jamais stocké en clair)
        $user->setPassword($hasher->hashPassword($user, $d['password']));

        $em->persist($user);
        $em->flush();

        return new JsonResponse([
            'id' => $user->getId(),
            'email' => $user->getEmail(),
            'roles' => $user->getRoles(),
            'message' => 'Compte créé avec succès.',
        ], 201);
    }
}
