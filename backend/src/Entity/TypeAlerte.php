<?php
namespace App\Entity;

use App\Repository\TypeAlerteRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: TypeAlerteRepository::class)]
#[ORM\Table(name: 'type_alerte')]
class TypeAlerte
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 50, unique: true)]
    private string $libelle = '';

    #[ORM\Column(length: 20)]
    private string $cle = ''; // clé technique : agression, vol, meteo...

    #[ORM\Column(length: 7)]
    private string $couleur = '#1E3A8A';

    public function getId(): ?int { return $this->id; }
    public function getLibelle(): string { return $this->libelle; }
    public function setLibelle(string $v): self { $this->libelle = $v; return $this; }
    public function getCle(): string { return $this->cle; }
    public function setCle(string $v): self { $this->cle = $v; return $this; }
    public function getCouleur(): string { return $this->couleur; }
    public function setCouleur(string $v): self { $this->couleur = $v; return $this; }
}
