// db.ts
import Dexie, { type EntityTable } from "dexie";

interface UnitInterface {
  id: number;
  Nom: string;
  Menace: string;
  Récompense: string;
  Armure: string;
  Taille: string;
  Poids: string;
  Environnement: string;
  Intelligence: string;
  Organisation: string;
  Caract: any;
  Compt: any;
  Arme: any[];
  Butins: string[];
  Vulnérabilités: string[];
  Capacités: string[];
  Note: string;
  Source: string;
  Categorie: string;
}

interface EncounterInterface {
  // id
  id: number;
  // Nom de la rencontre
  Nom: string;
  // Favori ou non
  Starred: boolean;
  // liste des unitées
  Combattants: any[];
  // liste des groupes
  Groups: any[];
  // si la rencontre est encore ouverte
  // true => fight
  // false => planning
  Rolled: boolean;
  // index de l'encounter actif = rolledFighters[activeIndex]
  activeIndex: number;
  // liste des combattants dans le combat != Combattants
  rolledFighters: any[];
  // logs
  logs: any[];
}

interface ActiveEncounterInterface {
  id: number;
  activeEncounter: number;
}

const db = new Dexie("UnitsDatabase") as Dexie & {
  units: EntityTable<
    UnitInterface,
    "id" // primary key "id" (for the typings only)
  >;
  encounters: EntityTable<
    EncounterInterface,
    "id" // primary key "id" (for the typings only)
  >;
  active_encounter: EntityTable<
    ActiveEncounterInterface,
    "id" // primary key "id" (for the typings only)
  >;
};

// Schema declaration:
db.version(1).stores({
  units:
    "++id, Nom, Menace, Récompense, Armure, Taille, Poids, Environnement, Intelligence, Organisation, Caract, Compt, Arme, Butins, Vulnérabilités, Capacités, Note, Source, Categorie", // primary key "id" (for the runtime!)
  encounters:
    "++id, Nom, Starred, Combattants, Groups, Rolled, activeIndex, rolledFighters, logs",
  active_encounter: "++id, activeEncounter",
});

const db_units_reset = async () => {
  try {
    // await Promise.all(db_tracker.tables.map(table => table.clear()));
    await db.units.clear();
  } catch (error) {
    console.error(error);
  }
};

export type { UnitInterface, EncounterInterface };
export { db, db_units_reset };
