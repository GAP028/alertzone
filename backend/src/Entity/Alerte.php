<?php
namespace App\Entity;

use App\Repository\AlerteRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: AlerteRepository::class)]
#[ORM\Table(name: 'alerte')]
class Alerte
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 150)]
    private string $titre = '';

    #[ORM\Column(type: 'text', nullable: true)]
    private ?string $description = null;

    #[ORM\Column(type: 'decimal', precision: 10, scale: 7)]
    private string $latitude = '0';

    #[ORM\Column(type: 'decimal', precision: 10, scale: 7)]
    private string $longitude = '0';

    #[ORM\Column]
    private int $niveauGravite = 1;

    #[ORM\Column(length: 20)]
    private string $statut = 'validee';

    #[ORM\Column]
    private int $nombreConfirmations = 0;

    #[ORM\Column]
    private int $nombreFausseAlertes = 0;

    #[ORM\Column]
    private int $rayon = 250;

    #[ORM\Column(type: 'datetime')]
    private \DateTimeInterface $dateCreation;

    #[ORM\ManyToOne(targetEntity: TypeAlerte::class)]
    #[ORM\JoinColumn(name: 'id_type', referencedColumnName: 'id', nullable: false)]
    private ?TypeAlerte $type = null;

    public function __construct() { $this->dateCreation = new \DateTime(); }

    public function getId(): ?int { return $this->id; }
    public function getTitre(): string { return $this->titre; }
    public function setTitre(string $v): self { $this->titre = $v; return $this; }
    public function getDescription(): ?string { return $this->description; }
    public function setDescription(?string $v): self { $this->description = $v; return $this; }
    public function getLatitude(): string { return $this->latitude; }
    public function setLatitude(string $v): self { $this->latitude = $v; return $this; }
    public function getLongitude(): string { return $this->longitude; }
    public function setLongitude(string $v): self { $this->longitude = $v; return $this; }
    public function getNiveauGravite(): int { return $this->niveauGravite; }
    public function setNiveauGravite(int $v): self { $this->niveauGravite = $v; return $this; }
    public function getStatut(): string { return $this->statut; }
    public function setStatut(string $v): self { $this->statut = $v; return $this; }
    public function getNombreConfirmations(): int { return $this->nombreConfirmations; }
    public function setNombreConfirmations(int $v): self { $this->nombreConfirmations = $v; return $this; }
    public function getNombreFausseAlertes(): int { return $this->nombreFausseAlertes; }
    public function setNombreFausseAlertes(int $v): self { $this->nombreFausseAlertes = $v; return $this; }
    public function getRayon(): int { return $this->rayon; }
    public function setRayon(int $v): self { $this->rayon = $v; return $this; }
    public function getDateCreation(): \DateTimeInterface { return $this->dateCreation; }
    public function setDateCreation(\DateTimeInterface $v): self { $this->dateCreation = $v; return $this; }
    public function getType(): ?TypeAlerte { return $this->type; }
    public function setType(?TypeAlerte $v): self { $this->type = $v; return $this; }
}
