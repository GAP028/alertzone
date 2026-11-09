<?php
namespace App\DataFixtures;

use App\Entity\Alerte;
use App\Entity\TypeAlerte;
use App\Entity\Utilisateur;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AppFixtures extends Fixture
{
    public function __construct(private UserPasswordHasherInterface $hasher) {}

    public function load(ObjectManager $em): void
    {
        // --- Comptes de démonstration (un par rôle) ---
        $comptes = [
            ['admin@alertzone.fr',    'Admin1234!',    ['ROLE_ADMIN'],    'Admin',    'Système'],
            ['autorite@alertzone.fr', 'Autorite1234!', ['ROLE_AUTORITE'], 'Martin',   'Officier'],
            ['citoyen@alertzone.fr',  'Citoyen1234!',  ['ROLE_USER'],     'Dupont',   'Camille'],
        ];
        foreach ($comptes as [$email, $mdp, $roles, $nom, $prenom]) {
            $u = new Utilisateur();
            $u->setEmail($email)->setNom($nom)->setPrenom($prenom)->setRoles($roles);
            $u->setPassword($this->hasher->hashPassword($u, $mdp));
            $em->persist($u);
        }

        // --- Types d'alerte ---
        $defs = [
            ['agression', 'Agression', '#DC2626'],
            ['vol', 'Vol', '#EA580C'],
            ['meteo', 'Météo', '#F59E0B'],
            ['disparition', 'Disparition', '#7C3AED'],
            ['avis_recherche', 'Avis de recherche', '#991B1B'],
        ];
        $types = [];
        foreach ($defs as [$cle, $lib, $col]) {
            $t = new TypeAlerte();
            $t->setCle($cle)->setLibelle($lib)->setCouleur($col);
            $em->persist($t);
            $types[$cle] = $t;
        }

        // --- 8 alertes de démonstration ---
        $alertes = [
            ['agression','Agression rue de Rivoli','Altercation signalée près du métro Châtelet. Éviter la zone si possible.',48.8606,2.3471,4,3,0,300],
            ['vol','Vol à la tire Gare du Nord','Pickpocket actif dans le hall principal. Surveillez vos affaires.',48.8809,2.3553,3,5,1,250],
            ['meteo','Fortes pluies — 15e arrondissement','Crues localisées signalées. Prudence sur les routes.',48.8422,2.2925,2,8,0,500],
            ['disparition','Personne disparue — Parc des Buttes-Chaumont','Homme de 72 ans, manteau bleu. Dernière vue vers 18h hier.',48.8799,2.3828,5,12,0,400],
            ['avis_recherche','Avis de recherche — Véhicule suspect','Fourgon blanc impliqué dans une tentative de cambriolage.',48.8738,2.2950,4,2,0,350],
            ['agression','Agression métro Ligne 13','Incident entre deux voyageurs à Saint-Lazare.',48.8756,2.3250,3,1,2,200],
            ['vol','Vol de vélo — Canal Saint-Martin','Cycliste victime d un vol à l arraché ce matin.',48.8710,2.3654,2,4,0,180],
            ['meteo','Vent violent — Tour Eiffel','Rafales jusqu a 80 km/h. Accès restreint au Champ-de-Mars.',48.8584,2.2945,3,6,1,450],
        ];
        foreach ($alertes as [$type,$titre,$desc,$lat,$lng,$grav,$conf,$faux,$rayon]) {
            $a = new Alerte();
            $a->setType($types[$type])->setTitre($titre)->setDescription($desc)
              ->setLatitude((string) $lat)->setLongitude((string) $lng)
              ->setNiveauGravite($grav)->setNombreConfirmations($conf)
              ->setNombreFausseAlertes($faux)->setRayon($rayon)->setStatut('validee');
            $em->persist($a);
        }

        $em->flush();
    }
}
