import { UnitInterface } from "@/db/data";
import { RollResult } from "@/components/tracker/dice";

export const caract_primaire = [
  {
    id: "INT",
    label: "Intelligence",
  },
  {
    id: "RÉF",
    label: "Réflexes",
  },
  {
    id: "DEX",
    label: "Dextérité",
  },
  {
    id: "DEX",
    label: "Dextérité",
  },
  {
    id: "COR",
    label: "Corps",
  },
  {
    id: "VIT",
    label: "Vitesse",
  },
  {
    id: "EMP",
    label: "Empathie",
  },
  {
    id: "TECH",
    label: "Technique",
  },
  {
    id: "VOL",
    label: "Volonté",
  },
  {
    id: "CHA",
    label: "Chance",
  },
  {
    id: "VIG",
    label: "Vigueur",
  },
];

export const caract_secondaire = [
  {
    id: "ÉTOU",
    label: "Étourdissement",
  },
  {
    id: "COU",
    label: "Course",
  },
  {
    id: "SAUT",
    label: "Saut",
  },
  {
    id: "PS",
    label: "Points de santé",
  },
  {
    id: "END",
    label: "Endurance",
  },
  {
    id: "ENC",
    label: "Encombrement",
  },
  {
    id: "RÉC",
    label: "Récupération",
  },
];

export const categories = [
  "Humanoïde",
  "Nécrophage",
  "Spectre",
  "Bête",
  "Créature maudite",
  "Hybride",
  "Insectoïde",
  "Élémentaire",
  "Vestige",
  "Ogroïde",
  "Draconide",
  "Vampire",
];

export const modificateursAttaque = [
  { label: "Aucun", mod: 0 },
  { label: "Cible immobilisée", mod: +4 },
  { label: "Cible esquivant activement", mod: -2 },
  { label: "Cible mouvante (RÉF > 10)", mod: -3 },
  { label: "Dégainage rapide", mod: -3 },
  { label: "Embuscade", mod: +5 },
  { label: "Tir ricochet", mod: -5 },
  { label: "Aveuglé (lumière, poussière)", mod: -3 },
  { label: "Cible à contre-jour", mod: +2 },
  { label: "Viser (par tour)", mod: +1 },
];

export const modificateursTaille = [
  { label: "Petite", mod: -2, exemple: "Chat ou nekker" },
  { label: "Moyenne", mod: 0, exemple: "Humain" },
  { label: "Grande", mod: 2, exemple: "Troll ou cheval" },
  { label: "Énorme", mod: 4, exemple: "Fiellon" },
];

export const modificateursPortee = [
  {
    label: "À bout portant",
    sdCible: 10,
    mod: +5,
    exemple:
      "L’arme est très proche de la cible (moins de 50 cm) ou la touche physiquement",
  },
  { label: "Courte", sdCible: 15, mod: 0, exemple: "¼ de la portée de base" },
  {
    label: "Intermédiaire",
    sdCible: 20,
    mod: -2,
    exemple: "½ de la portée de base",
  },
  {
    label: "Longue",
    sdCible: 25,
    mod: -4,
    exemple: "La portée de base de l'arme",
  },
  {
    label: "Extrême",
    sdCible: 30,
    mod: -6,
    exemple: "2x la portée de base de l'arme",
  },
];

export const modificateursLumiere = [
  {
    label: "Lumière brillante",
    mod: -3,
    exemple: "Soleil dans le désert, soleil se réfléchissant sur la neige",
  },
  { label: "Lumière du jour", mod: 0, exemple: "" },
  { label: "Lumière tamisée", mod: 0, exemple: "Clair de lune" },
  { label: "Ténèbres", mod: -2, exemple: "Nuit sans lune, caverne profonde" },
];

export interface rolledFightersInterface {
  id: string;
  Nom: string;
  Data: UnitInterface;
  Groupe: string;
  Initiative: RollResult;
  END: number;
  PS: number;
}
