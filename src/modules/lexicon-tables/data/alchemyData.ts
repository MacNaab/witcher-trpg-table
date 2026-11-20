import type { FormulaLexiconEntry, MaterialLexiconEntry } from '../types';

/**
 * Alchemical Substances reference table (138 entries across all 9 substances).
 */
export const SUBSTANCES_DATA: readonly MaterialLexiconEntry[] = [
  {
    "id": "substances-1-allspice-root",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Allspice Root",
      "fr": "Racine de pimenta dioica"
    },
    "substance": "aether",
    "rarity": "P",
    "location": {
      "en": "Fields",
      "fr": "Champs"
    },
    "quantity": {
      "en": "1d6",
      "fr": "1d6"
    },
    "forageDc": "15",
    "weight": "0.1",
    "cost": "18"
  },
  {
    "id": "substances-2-berbercane-fruit",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Berbercane Fruit",
      "fr": "Fruit de berbéris"
    },
    "substance": "aether",
    "rarity": "C",
    "location": {
      "en": "Mountains and swamps",
      "fr": "Montagnes et marais"
    },
    "quantity": {
      "en": "1d10",
      "fr": "1d10"
    },
    "forageDc": "12",
    "weight": "0.1",
    "cost": "9"
  },
  {
    "id": "substances-3-cockatrice-tail-feathers",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Cockatrice Tail Feathers",
      "fr": "Plumes de queue de Cockatrice"
    },
    "substance": "aether",
    "rarity": "none",
    "location": {
      "en": "Cockatrices",
      "fr": "Cockatrices"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "0.1",
    "cost": "135"
  },
  {
    "id": "substances-4-cyclops-bones",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Cyclops' Bones",
      "fr": "Os de cyclope"
    },
    "substance": "aether",
    "rarity": "none",
    "location": {
      "en": "Cyclopes",
      "fr": "Cyclopes"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "4",
    "cost": "87"
  },
  {
    "id": "substances-5-essence-of-wraith",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Essence of Wraith",
      "fr": "Essence de fantôme"
    },
    "substance": "aether",
    "rarity": "R",
    "location": {
      "en": "Found on ghosts",
      "fr": "Trouvé sur les fantômes"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "0.1",
    "cost": "95"
  },
  {
    "id": "substances-6-foglet-essence",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Foglet Essence",
      "fr": "Essence de Brumelin"
    },
    "substance": "aether",
    "rarity": "none",
    "location": {
      "en": "Foglets",
      "fr": "Brumelins"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "0.1",
    "cost": "43"
  },
  {
    "id": "substances-7-ginatia-petals",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Ginatia Petals",
      "fr": "Pétales de Ginatia"
    },
    "substance": "aether",
    "rarity": "P",
    "location": {
      "en": "Fields",
      "fr": "Champs"
    },
    "quantity": {
      "en": "1d6",
      "fr": "1d6"
    },
    "forageDc": "15",
    "weight": "0.1",
    "cost": "17"
  },
  {
    "id": "substances-8-godling-eyes",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Godling Eyes",
      "fr": "Oeil Godling"
    },
    "substance": "aether",
    "rarity": "none",
    "location": {
      "en": "Godlings",
      "fr": "Godlings (Nains-de-jardin)"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "0.1",
    "cost": "55"
  },
  {
    "id": "substances-9-hellebore-petals",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Hellebore Petals",
      "fr": "Pétales d'ellébore"
    },
    "substance": "aether",
    "rarity": "P",
    "location": {
      "en": "Forests",
      "fr": "Forêts"
    },
    "quantity": {
      "en": "1d6",
      "fr": "1d6"
    },
    "forageDc": "15",
    "weight": "0.1",
    "cost": "19"
  },
  {
    "id": "substances-10-naezan-salts",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Naezan Salts",
      "fr": "Sels de Naezan"
    },
    "substance": "aether",
    "rarity": "none",
    "location": {
      "en": "Bruxae",
      "fr": "Bruxae"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "0.1",
    "cost": "146"
  },
  {
    "id": "substances-11-pearl",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Pearl",
      "fr": "Perle"
    },
    "substance": "aether",
    "rarity": "R",
    "location": {
      "en": "Ocean floor and shore",
      "fr": "Fond océanique et rivages"
    },
    "quantity": {
      "en": "1d6/3",
      "fr": "1d6/3"
    },
    "forageDc": "20",
    "weight": "0.1",
    "cost": "100"
  },
  {
    "id": "substances-12-plumard-stomach",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Plumard Stomach",
      "fr": "Estomac de plumard"
    },
    "substance": "aether",
    "rarity": "none",
    "location": {
      "en": "Plumards",
      "fr": "Plumards"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "0.1",
    "cost": "30"
  },
  {
    "id": "substances-13-quicksilver-solution",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Quicksilver Solution",
      "fr": "Solution de mercure"
    },
    "substance": "aether",
    "rarity": "R",
    "location": {
      "en": "Mountains and underground",
      "fr": "Montagnes et souterrains"
    },
    "quantity": {
      "en": "1d6/2",
      "fr": "1d6/2"
    },
    "forageDc": "18",
    "weight": "0.1",
    "cost": "77"
  },
  {
    "id": "substances-14-scleroderm",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Scleroderm",
      "fr": "Sclérodermie"
    },
    "substance": "aether",
    "rarity": "E",
    "location": {
      "en": "Forests and caves",
      "fr": "Forêts et grottes"
    },
    "quantity": {
      "en": "2d6",
      "fr": "2d6"
    },
    "forageDc": "10",
    "weight": "0.1",
    "cost": "5"
  },
  {
    "id": "substances-15-troll-tongue",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Troll Tongue",
      "fr": "Langue de troll"
    },
    "substance": "aether",
    "rarity": "none",
    "location": {
      "en": "Trolls",
      "fr": "Trolls"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "0.1",
    "cost": "66"
  },
  {
    "id": "substances-16-vendigo-heart",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Vendigo Heart",
      "fr": "Cœur de Vendigo"
    },
    "substance": "aether",
    "rarity": "none",
    "location": {
      "en": "Vendigos",
      "fr": "Vendigos"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "1",
    "cost": "167"
  },
  {
    "id": "substances-17-aracha-venom",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Aracha Venom",
      "fr": "Venin d'Aracha"
    },
    "substance": "caelum",
    "rarity": "R",
    "location": {
      "en": "Found on arachasae",
      "fr": "Trouvé sur les arachasae"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "0.5",
    "cost": "76"
  },
  {
    "id": "substances-18-bothcling-brains",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Botchling Brains",
      "fr": "Cerveaux de Couvin (Botchling)"
    },
    "substance": "caelum",
    "rarity": "none",
    "location": {
      "en": "Botchlings",
      "fr": "Couvins (Botchlings)"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "0.1",
    "cost": "164"
  },
  {
    "id": "substances-19-bryonia",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Bryonia",
      "fr": "Bryone"
    },
    "substance": "caelum",
    "rarity": "C",
    "location": {
      "en": "Mountains & cities",
      "fr": "Montagnes et villes"
    },
    "quantity": {
      "en": "1d10",
      "fr": "1d10"
    },
    "forageDc": "12",
    "weight": "0.1",
    "cost": "8"
  },
  {
    "id": "substances-20-drowner-tongue",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Drowner Tongue",
      "fr": "Langue de Noyeur"
    },
    "substance": "caelum",
    "rarity": "R",
    "location": {
      "en": "Found on drowners",
      "fr": "Trouvé sur les noyeurs"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "0.5",
    "cost": "86"
  },
  {
    "id": "substances-21-fiend-dung",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Fiend Dung",
      "fr": "Excréments de Fiellon"
    },
    "substance": "caelum",
    "rarity": "R",
    "location": {
      "en": "Found in fiend territory or on fiends",
      "fr": "Territoire des fiellons ou sur eux"
    },
    "quantity": {
      "en": "1d6/2",
      "fr": "1d6/2"
    },
    "forageDc": "20",
    "weight": "1",
    "cost": "106"
  },
  {
    "id": "substances-22-giant-centipede-discharge",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Giant Centipede Discharge",
      "fr": "Décharge de mille-pattes géante"
    },
    "substance": "caelum",
    "rarity": "none",
    "location": {
      "en": "Giant centipedes",
      "fr": "Mille-pattes géants"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "0.1",
    "cost": "40"
  },
  {
    "id": "substances-23-grave-hag-tongue",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Grave Hag Tongue",
      "fr": "Langue de guenaude sépulcrale"
    },
    "substance": "caelum",
    "rarity": "R",
    "location": {
      "en": "Grave hags",
      "fr": "Guenaudes sépulcrales"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "0.5",
    "cost": "80"
  },
  {
    "id": "substances-24-green-mold",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Green Mold",
      "fr": "Moisissure verte"
    },
    "substance": "caelum",
    "rarity": "C",
    "location": {
      "en": "Caves",
      "fr": "Grottes"
    },
    "quantity": {
      "en": "1d10",
      "fr": "1d10"
    },
    "forageDc": "12",
    "weight": "0.1",
    "cost": "8"
  },
  {
    "id": "substances-25-harpy-talons",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Harpy Talons",
      "fr": "Serres de harpie"
    },
    "substance": "caelum",
    "rarity": "none",
    "location": {
      "en": "Harpies",
      "fr": "Harpies"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "0.1",
    "cost": "40"
  },
  {
    "id": "substances-26-rotfiend-liver",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Rotfiend Liver",
      "fr": "Foie Rotfiend"
    },
    "substance": "caelum",
    "rarity": "none",
    "location": {
      "en": "Rotfiends",
      "fr": "Putréfacteurs (Rotfiends)"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "0.5",
    "cost": "42"
  },
  {
    "id": "substances-27-shaelmaa-hair",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Shaelmaar Hair",
      "fr": "Poils de Shaelmaar"
    },
    "substance": "caelum",
    "rarity": "none",
    "location": {
      "en": "Shaelmaars",
      "fr": "Shaelmaars"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "0.1",
    "cost": "100"
  },
  {
    "id": "substances-28-slyzard-talons",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Slyzard Talons",
      "fr": "Serres de Slyzard"
    },
    "substance": "caelum",
    "rarity": "none",
    "location": {
      "en": "Slyzards",
      "fr": "Slyzards"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "0.5",
    "cost": "69"
  },
  {
    "id": "substances-29-succubus-horn",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Succubus Horn",
      "fr": "Corne de succube"
    },
    "substance": "caelum",
    "rarity": "none",
    "location": {
      "en": "Succubi",
      "fr": "Succubes"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "0.5",
    "cost": "87"
  },
  {
    "id": "substances-30-vampire-teeth",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Vampire Teeth",
      "fr": "Dents de vampire"
    },
    "substance": "caelum",
    "rarity": "R",
    "location": {
      "en": "Found on katakans",
      "fr": "Trouvé sur les katakans"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "0.1",
    "cost": "150"
  },
  {
    "id": "substances-31-venom-extract",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Venom Extract",
      "fr": "Extrait de venin"
    },
    "substance": "caelum",
    "rarity": "P",
    "location": {
      "en": "Found on ghouls, hags, endregas, arachasae, wyverns",
      "fr": "Goules, guenaudes, endriagues, arachasae, wyvernes"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "0.1",
    "cost": "38"
  },
  {
    "id": "substances-32-arachas-eyes",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Arachas Eyes",
      "fr": "Oeil d'Arachas"
    },
    "substance": "fulgur",
    "rarity": "R",
    "location": {
      "en": "Found on arachasae",
      "fr": "Trouvé sur les arachasae"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "0.5",
    "cost": "95"
  },
  {
    "id": "substances-33-botchling-ear",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Botchling Ear",
      "fr": "Oreille botchling"
    },
    "substance": "fulgur",
    "rarity": "none",
    "location": {
      "en": "Botchlings",
      "fr": "Couvins (Botchlings)"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "0.1",
    "cost": "100"
  },
  {
    "id": "substances-34-bullvore-brain",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Bullvore Brain",
      "fr": "Cerveau Bullvore"
    },
    "substance": "fulgur",
    "rarity": "none",
    "location": {
      "en": "Bullvores",
      "fr": "Bullvores"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "1",
    "cost": "150"
  },
  {
    "id": "substances-35-cyclops-tongue",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Cyclops' Tongue",
      "fr": "Langue de cyclope"
    },
    "substance": "fulgur",
    "rarity": "none",
    "location": {
      "en": "Cyclopes",
      "fr": "Cyclopes"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "1",
    "cost": "90"
  },
  {
    "id": "substances-36-dog-tallow",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Dog Tallow",
      "fr": "Suif de chien"
    },
    "substance": "fulgur",
    "rarity": "C",
    "location": {
      "en": "Found on dogs and wolves",
      "fr": "Trouvé sur les chiens et les loups"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "0.1",
    "cost": "10"
  },
  {
    "id": "substances-37-dragon-teeth",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Dragon Teeth",
      "fr": "Dents de dragon"
    },
    "substance": "fulgur",
    "rarity": "none",
    "location": {
      "en": "Found on true dragons",
      "fr": "Trouvé sur les vrais dragons"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "1",
    "cost": "192"
  },
  {
    "id": "substances-38-dwarven-immortelle",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Dwarven Immortelle",
      "fr": "Immortelle naine"
    },
    "substance": "fulgur",
    "rarity": "R",
    "location": {
      "en": "Underground",
      "fr": "Souterrains"
    },
    "quantity": {
      "en": "1d6/2",
      "fr": "1d6/2"
    },
    "forageDc": "18",
    "weight": "0.1",
    "cost": "75"
  },
  {
    "id": "substances-39-endrega-embryo",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Endrega Embryo",
      "fr": "Embryon d'endriagues"
    },
    "substance": "fulgur",
    "rarity": "R",
    "location": {
      "en": "Found in endrega nests",
      "fr": "Trouvé dans les nids d'endriagues"
    },
    "quantity": {
      "en": "1d6",
      "fr": "1d6"
    },
    "forageDc": "N/A",
    "weight": "1.5",
    "cost": "55"
  },
  {
    "id": "substances-40-frightener-claws",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Frightener Claws",
      "fr": "Griffes d'Épouvantail (Frightener)"
    },
    "substance": "fulgur",
    "rarity": "none",
    "location": {
      "en": "Frighteners",
      "fr": "Épouvantails (Frighteners)"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "5",
    "cost": "205"
  },
  {
    "id": "substances-41-golem-heart",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Golem Heart",
      "fr": "Coeur de Golem"
    },
    "substance": "fulgur",
    "rarity": "R",
    "location": {
      "en": "Found on golems",
      "fr": "Trouvé sur les golems"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "1",
    "cost": "167"
  },
  {
    "id": "substances-42-grave-hag-ear",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Grave Hag Ear",
      "fr": "Oreille de guenaude sépulcrale"
    },
    "substance": "fulgur",
    "rarity": "R",
    "location": {
      "en": "Found on grave hags",
      "fr": "Trouvé sur les guenaudes sépulcrales"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "0.1",
    "cost": "134"
  },
  {
    "id": "substances-43-higher-vampire-fangs",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Higher Vampire Fangs",
      "fr": "Crocs de vampire supérieurs"
    },
    "substance": "fulgur",
    "rarity": "none",
    "location": {
      "en": "Higher vampires",
      "fr": "Vampires supérieurs"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "0.1",
    "cost": "250"
  },
  {
    "id": "substances-44-phoenix-feathers",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Phoenix Feathers",
      "fr": "Plumes de phénix"
    },
    "substance": "fulgur",
    "rarity": "none",
    "location": {
      "en": "Phoenixes",
      "fr": "Phénix"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "0.1",
    "cost": "176"
  },
  {
    "id": "substances-45-slyzard-scales",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Slyzard Scales",
      "fr": "Écailles de Slyzard"
    },
    "substance": "fulgur",
    "rarity": "none",
    "location": {
      "en": "Slyzards",
      "fr": "Slyzards"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "3",
    "cost": "82"
  },
  {
    "id": "substances-46-specter-dust",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Specter Dust",
      "fr": "Poussière de spectre"
    },
    "substance": "fulgur",
    "rarity": "P",
    "location": {
      "en": "Found on specters",
      "fr": "Trouvé sur les spectres"
    },
    "quantity": {
      "en": "1d6",
      "fr": "1d6"
    },
    "forageDc": "N/A",
    "weight": "N/A",
    "cost": "30"
  },
  {
    "id": "substances-47-vendigo-fur",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Vendigo Fur",
      "fr": "Fourrure Vendigo"
    },
    "substance": "fulgur",
    "rarity": "none",
    "location": {
      "en": "Vendigos",
      "fr": "Vendigos"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "0.1",
    "cost": "76"
  },
  {
    "id": "substances-48-wyvern-egg",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Wyvern Egg",
      "fr": "Œuf de wyverne"
    },
    "substance": "fulgur",
    "rarity": "R",
    "location": {
      "en": "Found on wyverns",
      "fr": "Trouvé sur les wyvernes"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "2",
    "cost": "150"
  },
  {
    "id": "substances-49-barbegazi-fur",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Barbegazi Fur",
      "fr": "Fourrure Barbegazi"
    },
    "substance": "hydragenum",
    "rarity": "none",
    "location": {
      "en": "Barbegazi",
      "fr": "Barbegazis"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "0.1",
    "cost": "21"
  },
  {
    "id": "substances-50-botchling-bones",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Botchling Bones",
      "fr": "Os de Couvin (Botchling)"
    },
    "substance": "hydragenum",
    "rarity": "none",
    "location": {
      "en": "Botchlings",
      "fr": "Couvins (Botchlings)"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "0.1",
    "cost": "55"
  },
  {
    "id": "substances-51-cockatrice-carapace",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Cockatrice Carapace",
      "fr": "Cockatrice Carapace"
    },
    "substance": "hydragenum",
    "rarity": "none",
    "location": {
      "en": "Cockatrices",
      "fr": "Cockatrices"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "2",
    "cost": "75"
  },
  {
    "id": "substances-52-cortinarius",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Cortinarius",
      "fr": "Cortinaire"
    },
    "substance": "hydragenum",
    "rarity": "P",
    "location": {
      "en": "Forests",
      "fr": "Forêts"
    },
    "quantity": {
      "en": "1d6",
      "fr": "1d6"
    },
    "forageDc": "15",
    "weight": "0.1",
    "cost": "18"
  },
  {
    "id": "substances-53-crystallized-essence",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Crystallized Essence",
      "fr": "Essence cristallisée"
    },
    "substance": "hydragenum",
    "rarity": "none",
    "location": {
      "en": "Hyms, Pestae, Vendigos, Leshens, Cyclopes",
      "fr": "Hyms, Pestae, Vendigos, Leshens, Cyclopes"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "0.1",
    "cost": "292"
  },
  {
    "id": "substances-54-dragon-tail",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Dragon Tail",
      "fr": "Queue de dragon"
    },
    "substance": "hydragenum",
    "rarity": "none",
    "location": {
      "en": "Found on true dragons",
      "fr": "Trouvé sur les vrais dragons"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "4",
    "cost": "310"
  },
  {
    "id": "substances-55-essence-of-water",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Essence of Water",
      "fr": "Essence d'eau"
    },
    "substance": "hydragenum",
    "rarity": "R",
    "location": {
      "en": "Found on drowners and sirens",
      "fr": "Trouvé sur les noyeurs et les sirènes"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "0.1",
    "cost": "46"
  },
  {
    "id": "substances-56-infused-dust",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Infused Dust",
      "fr": "Poussière imprégnée"
    },
    "substance": "hydragenum",
    "rarity": "R",
    "location": {
      "en": "Found on ghosts, griffins, and golems",
      "fr": "Trouvé sur fantômes, griffons et golems"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "0.1",
    "cost": "146"
  },
  {
    "id": "substances-57-leshes-bone",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Leshes Bone",
      "fr": "Leshes os"
    },
    "substance": "hydragenum",
    "rarity": "none",
    "location": {
      "en": "Leshens",
      "fr": "Leshens"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "1",
    "cost": "92"
  },
  {
    "id": "substances-58-manticore-horn",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Manticore Horn",
      "fr": "Corne de Manticore"
    },
    "substance": "hydragenum",
    "rarity": "none",
    "location": {
      "en": "Manticores",
      "fr": "Manticores"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "1",
    "cost": "120"
  },
  {
    "id": "substances-59-mistletoe",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Mistletoe",
      "fr": "Gui"
    },
    "substance": "hydragenum",
    "rarity": "P",
    "location": {
      "en": "Fields and forests",
      "fr": "Champs et forêts"
    },
    "quantity": {
      "en": "1d6",
      "fr": "1d6"
    },
    "forageDc": "15",
    "weight": "0.1",
    "cost": "8"
  },
  {
    "id": "substances-60-nekker-claw",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Nekker Claw",
      "fr": "Griffe de Nekker"
    },
    "substance": "hydragenum",
    "rarity": "P",
    "location": {
      "en": "Found on nekkers",
      "fr": "Trouvé sur les nekkers"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "0.5",
    "cost": "40"
  },
  {
    "id": "substances-61-troll-liver",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Troll Liver",
      "fr": "Foie de troll"
    },
    "substance": "hydragenum",
    "rarity": "R",
    "location": {
      "en": "Found on rock trolls",
      "fr": "Trouvé sur les trolls de pierre"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "1",
    "cost": "87"
  },
  {
    "id": "substances-62-werewolf-saliva",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Werewolf Saliva",
      "fr": "Salive de loup-garou"
    },
    "substance": "hydragenum",
    "rarity": "R",
    "location": {
      "en": "Found on werewolves",
      "fr": "Trouvé sur les loups-garous"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "0.1",
    "cost": "60"
  },
  {
    "id": "substances-63-abomination-lymph",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Abomination Lymph",
      "fr": "Lymphe d'abomination"
    },
    "substance": "quebrith",
    "rarity": "none",
    "location": {
      "en": "Bruxae, Garkains",
      "fr": "Bruxae, Garkains"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "0.1",
    "cost": "152"
  },
  {
    "id": "substances-64-archespore-tendrils",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Archespore Tendrils",
      "fr": "Vrilles d'Archespore"
    },
    "substance": "quebrith",
    "rarity": "none",
    "location": {
      "en": "Archespores",
      "fr": "Archispores"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "0.5",
    "cost": "44"
  },
  {
    "id": "substances-65-balisse-leaves",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Balisse Leaves",
      "fr": "Feuilles de balisse"
    },
    "substance": "quebrith",
    "rarity": "C",
    "location": {
      "en": "Fields",
      "fr": "Champs"
    },
    "quantity": {
      "en": "1d10",
      "fr": "1d10"
    },
    "forageDc": "12",
    "weight": "0.1",
    "cost": "8"
  },
  {
    "id": "substances-66-ducal-water",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Ducal Water",
      "fr": "Eau Ducale"
    },
    "substance": "quebrith",
    "rarity": "C",
    "location": {
      "en": "Mountains and underground",
      "fr": "Montagnes et souterrains"
    },
    "quantity": {
      "en": "1d10",
      "fr": "1d10"
    },
    "forageDc": "12",
    "weight": "0.1",
    "cost": "20"
  },
  {
    "id": "substances-67-elemental-stone",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Elemental Stone",
      "fr": "Pierre élémentaire"
    },
    "substance": "quebrith",
    "rarity": "none",
    "location": {
      "en": "All elementals",
      "fr": "Tous les élémentaires"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "0.5",
    "cost": "134"
  },
  {
    "id": "substances-68-fool-s-parsley",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Fool's Parsley",
      "fr": "Petite ciguë"
    },
    "substance": "quebrith",
    "rarity": "E",
    "location": {
      "en": "Fields",
      "fr": "Champs"
    },
    "quantity": {
      "en": "2d6",
      "fr": "2d6"
    },
    "forageDc": "10",
    "weight": "0.1",
    "cost": "2"
  },
  {
    "id": "substances-69-garkain-saliva",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Garkain Saliva",
      "fr": "Garkain Salive"
    },
    "substance": "quebrith",
    "rarity": "none",
    "location": {
      "en": "Garkains",
      "fr": "Garkains"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "0.1",
    "cost": "70"
  },
  {
    "id": "substances-70-ghoul-marrow",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Ghoul Marrow",
      "fr": "Moelle de goule"
    },
    "substance": "quebrith",
    "rarity": "R",
    "location": {
      "en": "Found on ghouls",
      "fr": "Trouvé sur les goules"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "0.5",
    "cost": "80"
  },
  {
    "id": "substances-71-harpy-eggs",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Harpy Eggs",
      "fr": "Œufs de harpie"
    },
    "substance": "quebrith",
    "rarity": "none",
    "location": {
      "en": "Harpy nests",
      "fr": "Nids de harpies"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "0.5",
    "cost": "50"
  },
  {
    "id": "substances-72-honeysuckle",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Honeysuckle",
      "fr": "Chèvrefeuille"
    },
    "substance": "quebrith",
    "rarity": "C",
    "location": {
      "en": "Fields",
      "fr": "Champs"
    },
    "quantity": {
      "en": "1d10",
      "fr": "1d10"
    },
    "forageDc": "12",
    "weight": "0.1",
    "cost": "21"
  },
  {
    "id": "substances-73-knocker-hair",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Knocker Hair",
      "fr": "Cheveux de Knocker (Heurtoir)"
    },
    "substance": "quebrith",
    "rarity": "none",
    "location": {
      "en": "Knockers",
      "fr": "Knockers (Heurtoirs)"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "0.1",
    "cost": "33"
  },
  {
    "id": "substances-74-manticore-stomach",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Manticore Stomach",
      "fr": "Estomac de Manticore"
    },
    "substance": "quebrith",
    "rarity": "none",
    "location": {
      "en": "Manticores",
      "fr": "Manticores"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "2",
    "cost": "189"
  },
  {
    "id": "substances-75-optima-mater",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Optima Mater",
      "fr": "Optima Mater"
    },
    "substance": "quebrith",
    "rarity": "R",
    "location": {
      "en": "Mountains and underground",
      "fr": "Montagnes et souterrains"
    },
    "quantity": {
      "en": "1d6/2",
      "fr": "1d6/2"
    },
    "forageDc": "18",
    "weight": "0.1",
    "cost": "100"
  },
  {
    "id": "substances-76-sulfur",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Sulfur",
      "fr": "Soufre"
    },
    "substance": "quebrith",
    "rarity": "C",
    "location": {
      "en": "Mountains and underground",
      "fr": "Montagnes et souterrains"
    },
    "quantity": {
      "en": "1d10",
      "fr": "1d10"
    },
    "forageDc": "12",
    "weight": "0.1",
    "cost": "14"
  },
  {
    "id": "substances-77-bear-fat",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Bear Fat",
      "fr": "Graisse d'ours"
    },
    "substance": "rebis",
    "rarity": "none",
    "location": {
      "en": "Bears",
      "fr": "Ours"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "0.5",
    "cost": "90"
  },
  {
    "id": "substances-78-bullvore-blood",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Bullvore Blood",
      "fr": "Sang de Bullvore"
    },
    "substance": "rebis",
    "rarity": "none",
    "location": {
      "en": "Bullvores",
      "fr": "Bullvores"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "0.1",
    "cost": "85"
  },
  {
    "id": "substances-79-celandine",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Celandine",
      "fr": "Célandine"
    },
    "substance": "rebis",
    "rarity": "C",
    "location": {
      "en": "Fields and forests",
      "fr": "Champs et forêts"
    },
    "quantity": {
      "en": "1d10",
      "fr": "1d10"
    },
    "forageDc": "12",
    "weight": "0.1",
    "cost": "8"
  },
  {
    "id": "substances-80-cyclops-brains",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Cyclops' Brains",
      "fr": "Cerveaux de cyclopes"
    },
    "substance": "rebis",
    "rarity": "none",
    "location": {
      "en": "Cyclopes",
      "fr": "Cyclopes"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "2",
    "cost": "136"
  },
  {
    "id": "substances-81-dragon-blood",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Dragon Blood",
      "fr": "Sang de dragon"
    },
    "substance": "rebis",
    "rarity": "none",
    "location": {
      "en": "True dragons",
      "fr": "Vrais dragons"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "1",
    "cost": "250"
  },
  {
    "id": "substances-82-drowner-brains",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Drowner Brains",
      "fr": "Cerveaux de noyeur"
    },
    "substance": "rebis",
    "rarity": "P",
    "location": {
      "en": "Found on drowners",
      "fr": "Trouvé sur les noyeurs"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "0.1",
    "cost": "80"
  },
  {
    "id": "substances-83-foglet-teeth",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Foglet Teeth",
      "fr": "Dents de Brumelin"
    },
    "substance": "rebis",
    "rarity": "none",
    "location": {
      "en": "Foglets",
      "fr": "Brumelins"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "0.1",
    "cost": "40"
  },
  {
    "id": "substances-84-hag-teeth",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Hag Teeth",
      "fr": "Dent de guenaude"
    },
    "substance": "rebis",
    "rarity": "R",
    "location": {
      "en": "Found on grave hags",
      "fr": "Trouvé sur les guenaudes sépulcrales"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "0.1",
    "cost": "90"
  },
  {
    "id": "substances-85-han-fiber",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Han Fiber",
      "fr": "Fibre de Han"
    },
    "substance": "rebis",
    "rarity": "P",
    "location": {
      "en": "Fields",
      "fr": "Champs"
    },
    "quantity": {
      "en": "1d6",
      "fr": "1d6"
    },
    "forageDc": "15",
    "weight": "0.1",
    "cost": "17"
  },
  {
    "id": "substances-86-knocker-toes",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Knocker Toes",
      "fr": "Orteils de Knocker"
    },
    "substance": "rebis",
    "rarity": "none",
    "location": {
      "en": "Knockers",
      "fr": "Knockers (Heurtoirs)"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "0.1",
    "cost": "62"
  },
  {
    "id": "substances-87-lunar-shards",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Lunar Shards",
      "fr": "Éclats de lune"
    },
    "substance": "rebis",
    "rarity": "R",
    "location": {
      "en": "Mountains and underground",
      "fr": "Montagnes et souterrains"
    },
    "quantity": {
      "en": "1d6/2",
      "fr": "1d6/2"
    },
    "forageDc": "18",
    "weight": "0.1",
    "cost": "91"
  },
  {
    "id": "substances-88-nekker-heart",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Nekker Heart",
      "fr": "Coeur de Nekker"
    },
    "substance": "rebis",
    "rarity": "P",
    "location": {
      "en": "Found on nekkers",
      "fr": "Trouvé sur les nekkers"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "0.5",
    "cost": "30"
  },
  {
    "id": "substances-89-rotfiend-blood",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Rotfiend Blood",
      "fr": "Sang de Rotfiend"
    },
    "substance": "rebis",
    "rarity": "none",
    "location": {
      "en": "Rotfiends",
      "fr": "Putréfacteurs (Rotfiends)"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "0.1",
    "cost": "30"
  },
  {
    "id": "substances-90-shaelmaar-dust",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Shaelmaar Dust",
      "fr": "Poussière de Shaelmaar"
    },
    "substance": "rebis",
    "rarity": "none",
    "location": {
      "en": "Shaelmaars",
      "fr": "Shaelmaars"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "0.1",
    "cost": "79"
  },
  {
    "id": "substances-91-wine-stone",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Wine Stone",
      "fr": "Pierre de vin"
    },
    "substance": "rebis",
    "rarity": "R",
    "location": {
      "en": "Breweries",
      "fr": "Brasseries"
    },
    "quantity": {
      "en": "1d6/2",
      "fr": "1d6/2"
    },
    "forageDc": "18",
    "weight": "0.5",
    "cost": "88"
  },
  {
    "id": "substances-92-wing-membrane",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Wing Membrane",
      "fr": "Membrane d'aile"
    },
    "substance": "rebis",
    "rarity": "none",
    "location": {
      "en": "Garkains, Plumards",
      "fr": "Garkains, Plumards"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "0.5",
    "cost": "36"
  },
  {
    "id": "substances-93-dragon-tears",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Dragon Tears",
      "fr": "Larmes de dragon"
    },
    "substance": "sol",
    "rarity": "none",
    "location": {
      "en": "Found on true dragons",
      "fr": "Trouvé sur les vrais dragons"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "0.1",
    "cost": "276"
  },
  {
    "id": "substances-94-essence-of-fire",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Essence of Fire",
      "fr": "Essence de feu"
    },
    "substance": "sol",
    "rarity": "none",
    "location": {
      "en": "Phoenixes, fire elementals",
      "fr": "Phénix, élémentaires de feu"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "0.1",
    "cost": "46"
  },
  {
    "id": "substances-95-fiend-s-eye",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Fiend's Eye",
      "fr": "Oeil de Fiellon"
    },
    "substance": "sol",
    "rarity": "R",
    "location": {
      "en": "Found on fiends",
      "fr": "Trouvé sur les fiellons"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "0.5",
    "cost": "149"
  },
  {
    "id": "substances-96-frightener-eyes",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Frightener Eyes",
      "fr": "Yeux d'Épouvantail (Frightener)"
    },
    "substance": "sol",
    "rarity": "none",
    "location": {
      "en": "Frighteners",
      "fr": "Épouvantails (Frighteners)"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "0.1",
    "cost": "192"
  },
  {
    "id": "substances-97-light-essence",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Light Essence",
      "fr": "Essence de lumière"
    },
    "substance": "sol",
    "rarity": "P",
    "location": {
      "en": "Found on noonwraiths",
      "fr": "Trouvé sur les spectres de midi"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "0.1",
    "cost": "43"
  },
  {
    "id": "substances-98-manticore-wing-membranes",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Manticore Wing Membranes",
      "fr": "Membranes d'aile de Manticore"
    },
    "substance": "sol",
    "rarity": "none",
    "location": {
      "en": "Manticores",
      "fr": "Manticores"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "2",
    "cost": "145"
  },
  {
    "id": "substances-99-phoenix-ash",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Phoenix Ash",
      "fr": "Cendre de phoenix"
    },
    "substance": "sol",
    "rarity": "none",
    "location": {
      "en": "Phoenixes",
      "fr": "Phénix"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "0.1",
    "cost": "94"
  },
  {
    "id": "substances-100-siren-vocal-chords",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Siren Vocal Cords",
      "fr": "Cordes vocales de Sirène"
    },
    "substance": "sol",
    "rarity": "R",
    "location": {
      "en": "Found on sirens",
      "fr": "Trouvé sur les sirènes"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "0.1",
    "cost": "65"
  },
  {
    "id": "substances-101-vampire-saliva",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Vampire Saliva",
      "fr": "Salive de vampire"
    },
    "substance": "sol",
    "rarity": "R",
    "location": {
      "en": "Found on katakans",
      "fr": "Trouvé sur les katakans"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "0.5",
    "cost": "155"
  },
  {
    "id": "substances-102-verbena",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Verbena",
      "fr": "Verveine"
    },
    "substance": "sol",
    "rarity": "P",
    "location": {
      "en": "Fields",
      "fr": "Champs"
    },
    "quantity": {
      "en": "1d6",
      "fr": "1d6"
    },
    "forageDc": "15",
    "weight": "0.1",
    "cost": "18"
  },
  {
    "id": "substances-103-wolf-s-aloe-leaves",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Wolf’s Aloe Leaves",
      "fr": "Feuilles d'aloès de loup"
    },
    "substance": "sol",
    "rarity": "P",
    "location": {
      "en": "The Blue Mountains",
      "fr": "Les Montagnes Bleues"
    },
    "quantity": {
      "en": "1d6",
      "fr": "1d6"
    },
    "forageDc": "15",
    "weight": "0.1",
    "cost": "39"
  },
  {
    "id": "substances-104-wyvern-eyes",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Wyvern Eyes",
      "fr": "Oeil de Wyvern"
    },
    "substance": "sol",
    "rarity": "R",
    "location": {
      "en": "Found on wyverns",
      "fr": "Trouvé sur les wyvernes"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "0.1",
    "cost": "75"
  },
  {
    "id": "substances-105-barghest-essence",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Barghest Essence",
      "fr": "Essence de Barghest"
    },
    "substance": "vermilion",
    "rarity": "none",
    "location": {
      "en": "Barghests",
      "fr": "Barghests"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "0.1",
    "cost": "36"
  },
  {
    "id": "substances-106-bohun-upas-poisen",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Bohun Upas Poison",
      "fr": "Poison de Bohun Upas"
    },
    "substance": "vermilion",
    "rarity": "none",
    "location": {
      "en": "Manticores",
      "fr": "Manticores"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "0.1",
    "cost": "200"
  },
  {
    "id": "substances-107-burdok-root",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Burdok Root",
      "fr": "Racine Burdok"
    },
    "substance": "vermilion",
    "rarity": "none",
    "location": {
      "en": "Fields and forests",
      "fr": "Champs et forêts"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "0.1",
    "cost": "32"
  },
  {
    "id": "substances-108-chintin",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Chitin",
      "fr": "Chitine"
    },
    "substance": "vermilion",
    "rarity": "R",
    "location": {
      "en": "Found on arachasae and endregas",
      "fr": "Trouvé sur arachasae et endriagues"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "5",
    "cost": "106"
  },
  {
    "id": "substances-109-cockatrice-stomach",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Cockatrice Stomach",
      "fr": "Estomac de cockatrice"
    },
    "substance": "vermilion",
    "rarity": "none",
    "location": {
      "en": "Cockatrices",
      "fr": "Cockatrices"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "1",
    "cost": "92"
  },
  {
    "id": "substances-110-cyclops-eye",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Cyclops' Eye",
      "fr": "Oeil de cyclope"
    },
    "substance": "vermilion",
    "rarity": "none",
    "location": {
      "en": "Cyclopes",
      "fr": "Cyclopes"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "1",
    "cost": "159"
  },
  {
    "id": "substances-111-endrega-saliva",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Endrega Saliva",
      "fr": "Mucus d'endriague"
    },
    "substance": "vermilion",
    "rarity": "P",
    "location": {
      "en": "Found on endregas",
      "fr": "Trouvé sur les endriagues"
    },
    "quantity": {
      "en": "1d6",
      "fr": "1d6"
    },
    "forageDc": "15",
    "weight": "0.1",
    "cost": "38"
  },
  {
    "id": "substances-112-griffen-egg",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Griffin Egg",
      "fr": "Œuf de Griffon"
    },
    "substance": "vermilion",
    "rarity": "R",
    "location": {
      "en": "Found on griffins or in griffin nests",
      "fr": "Trouvé sur les griffons ou dans leurs nids"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "1",
    "cost": "150"
  },
  {
    "id": "substances-113-griffin-feathers",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Griffin Feathers",
      "fr": "Plumes de griffon"
    },
    "substance": "vermilion",
    "rarity": "R",
    "location": {
      "en": "Found on griffins",
      "fr": "Trouvé sur les griffons"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "0.1",
    "cost": "148"
  },
  {
    "id": "substances-114-harpy-feathers",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Harpy Feathers",
      "fr": "Plumes de harpie"
    },
    "substance": "vermilion",
    "rarity": "none",
    "location": {
      "en": "Harpies",
      "fr": "Harpies"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "0.1",
    "cost": "28"
  },
  {
    "id": "substances-115-knocker-teeth",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Knocker Teeth",
      "fr": "Dents de Knocker"
    },
    "substance": "vermilion",
    "rarity": "none",
    "location": {
      "en": "Knockers",
      "fr": "Knockers (Heurtoirs)"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "0.1",
    "cost": "46"
  },
  {
    "id": "substances-116-leshen-fiber",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Leshen Fiber",
      "fr": "Leshen Fibre"
    },
    "substance": "vermilion",
    "rarity": "none",
    "location": {
      "en": "Leshens",
      "fr": "Leshens"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "0.1",
    "cost": "106"
  },
  {
    "id": "substances-117-mandrake-root",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Mandrake Root",
      "fr": "Racine de mandragore"
    },
    "substance": "vermilion",
    "rarity": "R",
    "location": {
      "en": "Fields and forests",
      "fr": "Champs et forêts"
    },
    "quantity": {
      "en": "1d6/2",
      "fr": "1d6/2"
    },
    "forageDc": "18",
    "weight": "0.1",
    "cost": "65"
  },
  {
    "id": "substances-118-phosphorus",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Phosphorus",
      "fr": "Phosphore"
    },
    "substance": "vermilion",
    "rarity": "P",
    "location": {
      "en": "Mountains and underground",
      "fr": "Montagnes et souterrains"
    },
    "quantity": {
      "en": "1d6",
      "fr": "1d6"
    },
    "forageDc": "15",
    "weight": "0.5",
    "cost": "20"
  },
  {
    "id": "substances-119-succubus-heart",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Succubus Heart",
      "fr": "Coeur de succube"
    },
    "substance": "vermilion",
    "rarity": "none",
    "location": {
      "en": "Succubi",
      "fr": "Succubes"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "0.5",
    "cost": "95"
  },
  {
    "id": "substances-120-wolfsbane",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Wolfsbane",
      "fr": "Aconit"
    },
    "substance": "vermilion",
    "rarity": "P",
    "location": {
      "en": "Fields, forests, and mountains",
      "fr": "Champs, forêts et montagnes"
    },
    "quantity": {
      "en": "1d6",
      "fr": "1d6"
    },
    "forageDc": "15",
    "weight": "0.1",
    "cost": "9"
  },
  {
    "id": "substances-121-archespore-juice",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Archespore Juice",
      "fr": "Jus d'Archespore"
    },
    "substance": "vitriol",
    "rarity": "none",
    "location": {
      "en": "Archespores",
      "fr": "Archispores"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "0.1",
    "cost": "38"
  },
  {
    "id": "substances-122-balisse-fruit",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Balisse Fruit",
      "fr": "Fruit de Balisse"
    },
    "substance": "vitriol",
    "rarity": "C",
    "location": {
      "en": "Fields",
      "fr": "Champs"
    },
    "quantity": {
      "en": "1d10",
      "fr": "1d10"
    },
    "forageDc": "12",
    "weight": "0.1",
    "cost": "8"
  },
  {
    "id": "substances-123-barley",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Barley",
      "fr": "Orge"
    },
    "substance": "vitriol",
    "rarity": "C",
    "location": {
      "en": "Fields",
      "fr": "Champs"
    },
    "quantity": {
      "en": "1d10",
      "fr": "1d10"
    },
    "forageDc": "12",
    "weight": "0.1",
    "cost": "9"
  },
  {
    "id": "substances-124-boar-tusks",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Boar Tusks",
      "fr": "Défenses de sanglier"
    },
    "substance": "vitriol",
    "rarity": "none",
    "location": {
      "en": "Boars",
      "fr": "Sangliers"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "0.1",
    "cost": "82"
  },
  {
    "id": "substances-125-botchling-blood",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Botchling Blood",
      "fr": "Sang botchling"
    },
    "substance": "vitriol",
    "rarity": "none",
    "location": {
      "en": "Botchlings",
      "fr": "Couvins (Botchlings)"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "0.1",
    "cost": "66"
  },
  {
    "id": "substances-126-bruxa-blood",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Bruxa Blood",
      "fr": "Sang de Bruxa"
    },
    "substance": "vitriol",
    "rarity": "none",
    "location": {
      "en": "Bruxae",
      "fr": "Bruxae"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "0.1",
    "cost": "97"
  },
  {
    "id": "substances-127-bullvore-eyes",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Bullvore Eyes",
      "fr": "Oeil de Bullvore"
    },
    "substance": "vitriol",
    "rarity": "none",
    "location": {
      "en": "Bullvores",
      "fr": "Bullvores"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "0.5",
    "cost": "87"
  },
  {
    "id": "substances-128-calcium-equum",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Calcium Equum",
      "fr": "Calcium Equum"
    },
    "substance": "vitriol",
    "rarity": "C",
    "location": {
      "en": "Mountains and underground",
      "fr": "Montagnes et souterrains"
    },
    "quantity": {
      "en": "1d10",
      "fr": "1d10"
    },
    "forageDc": "12",
    "weight": "0.1",
    "cost": "12"
  },
  {
    "id": "substances-129-crow-s-eye",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Crow's Eye",
      "fr": "Oeil de corbeau"
    },
    "substance": "vitriol",
    "rarity": "P",
    "location": {
      "en": "Fields and forests",
      "fr": "Champs et forêts"
    },
    "quantity": {
      "en": "1d6",
      "fr": "1d6"
    },
    "forageDc": "15",
    "weight": "0.1",
    "cost": "17"
  },
  {
    "id": "substances-130-ghoul-claw",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Ghoul Claw",
      "fr": "Griffe de goule"
    },
    "substance": "vitriol",
    "rarity": "R",
    "location": {
      "en": "Found on ghouls",
      "fr": "Trouvé sur les goules"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "0.1",
    "cost": "60"
  },
  {
    "id": "substances-131-giant-centipede-mandibles",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Giant Centipede Mandibles",
      "fr": "Mandibules géantes de mille-pattes"
    },
    "substance": "vitriol",
    "rarity": "none",
    "location": {
      "en": "Giant centipedes",
      "fr": "Mille-pattes géants"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "0.5",
    "cost": "48"
  },
  {
    "id": "substances-132-leshen-resin",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Leshen Resin",
      "fr": "Résine Leshen"
    },
    "substance": "vitriol",
    "rarity": "none",
    "location": {
      "en": "Leshens",
      "fr": "Leshens"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "0.1",
    "cost": "140"
  },
  {
    "id": "substances-133-manticore-fangs",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Manticore Fangs",
      "fr": "Crocs de Manticore"
    },
    "substance": "vitriol",
    "rarity": "none",
    "location": {
      "en": "Manticores",
      "fr": "Manticores"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "0.1",
    "cost": "132"
  },
  {
    "id": "substances-134-nekker-teeth",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Nekker Teeth",
      "fr": "Dents de Nekker"
    },
    "substance": "vitriol",
    "rarity": "P",
    "location": {
      "en": "Found on nekkers",
      "fr": "Trouvé sur les nekkers"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "0.1",
    "cost": "30"
  },
  {
    "id": "substances-135-sewant-mushrooms",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Sewant Mushrooms",
      "fr": "Vitriocybe"
    },
    "substance": "vitriol",
    "rarity": "P",
    "location": {
      "en": "Caves",
      "fr": "Grottes"
    },
    "quantity": {
      "en": "1d6",
      "fr": "1d6"
    },
    "forageDc": "15",
    "weight": "0.1",
    "cost": "17"
  },
  {
    "id": "substances-136-slyzard-vocal-chords",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Slyzard Vocal Cords",
      "fr": "Accords vocaux Slyzard"
    },
    "substance": "vitriol",
    "rarity": "none",
    "location": {
      "en": "Slyzards",
      "fr": "Slyzards"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "0.1",
    "cost": "99"
  },
  {
    "id": "substances-137-troll-hide",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "Troll Hide",
      "fr": "Peau de troll"
    },
    "substance": "vitriol",
    "rarity": "R",
    "location": {
      "en": "Found on rock trolls",
      "fr": "Trouvé sur les trolls de pierre"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "4.5",
    "cost": "147"
  },
  {
    "id": "substances-138-white-myrtle-petals",
    "tabId": "substances",
    "rowKind": "material",
    "name": {
      "en": "White Myrtle Petals",
      "fr": "Pétales de myrte blanc"
    },
    "substance": "vitriol",
    "rarity": "C",
    "location": {
      "en": "Fields",
      "fr": "Champs"
    },
    "quantity": {
      "en": "1d10",
      "fr": "1d10"
    },
    "forageDc": "12",
    "weight": "0.1",
    "cost": "8"
  }
];

/**
 * Alchemical Formulae reference table (22 entries).
 */
export const FORMULAE_DATA: readonly FormulaLexiconEntry[] = [
  {
    "id": "formulae-1-adda-s-tomb",
    "tabId": "formulae",
    "rowKind": "formula",
    "name": {
      "en": "Adda’s Tomb",
      "fr": "Tombe d'Adda"
    },
    "level": "novice",
    "dc": "13",
    "time": {
      "en": "5 Rounds",
      "fr": "5 Tours"
    },
    "components": "Aether x2, Hydragenum, Vermilion",
    "cost": "27"
  },
  {
    "id": "formulae-2-base-powder",
    "tabId": "formulae",
    "rowKind": "formula",
    "name": {
      "en": "Base Powder",
      "fr": "Poudre basique"
    },
    "level": "novice",
    "dc": "12",
    "time": {
      "en": "5 Rounds",
      "fr": "5 Tours"
    },
    "components": "Vermilion, Quebrith",
    "cost": "27"
  },
  {
    "id": "formulae-3-clotting-powder",
    "tabId": "formulae",
    "rowKind": "formula",
    "name": {
      "en": "Clotting Powder",
      "fr": "Poudre de coagulation"
    },
    "level": "novice",
    "dc": "12",
    "time": {
      "en": "5 Rounds",
      "fr": "5 Tours"
    },
    "components": "Aether, Rebis",
    "cost": "30"
  },
  {
    "id": "formulae-4-hallucinogen",
    "tabId": "formulae",
    "rowKind": "formula",
    "name": {
      "en": "Hallucinogen",
      "fr": "Hallucinogène"
    },
    "level": "novice",
    "dc": "12",
    "time": {
      "en": "5 Rounds",
      "fr": "5 Tours"
    },
    "components": "Vitriol, Rebis",
    "cost": "47"
  },
  {
    "id": "formulae-5-invisible-ink",
    "tabId": "formulae",
    "rowKind": "formula",
    "name": {
      "en": "Invisible Ink",
      "fr": "Encre invisible"
    },
    "level": "novice",
    "dc": "11",
    "time": {
      "en": "5 Rounds",
      "fr": "5 Tours"
    },
    "components": "Quebrith, Aether",
    "cost": "22"
  },
  {
    "id": "formulae-6-numbing-herbs",
    "tabId": "formulae",
    "rowKind": "formula",
    "name": {
      "en": "Numbing Herbs",
      "fr": "Herbes engourdissantes"
    },
    "level": "novice",
    "dc": "12",
    "time": {
      "en": "5 Rounds",
      "fr": "5 Tours"
    },
    "components": "Quebrith, Vermilion",
    "cost": "18"
  },
  {
    "id": "formulae-7-poisoner-s-friend",
    "tabId": "formulae",
    "rowKind": "formula",
    "name": {
      "en": "Poisoner’s Friend",
      "fr": "Ami de l'empoisonneur"
    },
    "level": "novice",
    "dc": "14",
    "time": {
      "en": "10 Minutes",
      "fr": "10 Minutes"
    },
    "components": "Vermilion x2, Vitriol, Caelum",
    "cost": "24"
  },
  {
    "id": "formulae-8-smelling-salts",
    "tabId": "formulae",
    "rowKind": "formula",
    "name": {
      "en": "Smelling Salts",
      "fr": "Sels de pâmoison"
    },
    "level": "novice",
    "dc": "14",
    "time": {
      "en": "10 Minutes",
      "fr": "10 Minutes"
    },
    "components": "Quebrith, Rebis, Caelum x2",
    "cost": "37"
  },
  {
    "id": "formulae-9-sterilizing-fluid",
    "tabId": "formulae",
    "rowKind": "formula",
    "name": {
      "en": "Sterilizing Fluid",
      "fr": "Fluide stérilisant"
    },
    "level": "novice",
    "dc": "12",
    "time": {
      "en": "5 Rounds",
      "fr": "5 Tours"
    },
    "components": "Quebrith, Caelum",
    "cost": "33"
  },
  {
    "id": "formulae-10-succubus-breath",
    "tabId": "formulae",
    "rowKind": "formula",
    "name": {
      "en": "Succubus’ Breath",
      "fr": "Souffle de succube"
    },
    "level": "novice",
    "dc": "14",
    "time": {
      "en": "10 Minutes",
      "fr": "10 Minutes"
    },
    "components": "Sol, Aether x2, Caelum",
    "cost": "30"
  },
  {
    "id": "formulae-11-wives-tears-potion",
    "tabId": "formulae",
    "rowKind": "formula",
    "name": {
      "en": "Wives’ Tears Potion",
      "fr": "Potion de Larmes d'épouse"
    },
    "level": "novice",
    "dc": "14",
    "time": {
      "en": "10 Minutes",
      "fr": "10 Minutes"
    },
    "components": "Hydragenum, Aether x2, Vitriol",
    "cost": "28"
  },
  {
    "id": "formulae-12-acid-solution",
    "tabId": "formulae",
    "rowKind": "formula",
    "name": {
      "en": "Acid Solution",
      "fr": "Solution Acide"
    },
    "level": "journeyman",
    "dc": "16",
    "time": {
      "en": "15 Minutes",
      "fr": "15 Minutes"
    },
    "components": "Aether, Quebrith, Vermilion, Vitriol x3",
    "cost": "84"
  },
  {
    "id": "formulae-13-alchemical-adhesive",
    "tabId": "formulae",
    "rowKind": "formula",
    "name": {
      "en": "Alchemical Adhesive",
      "fr": "Adhésif alchimique"
    },
    "level": "journeyman",
    "dc": "15",
    "time": {
      "en": "10 Minutes",
      "fr": "10 Minutes"
    },
    "components": "Quebrith, Hydragenum, Caelum x2, Vitriol",
    "cost": "52"
  },
  {
    "id": "formulae-14-black-venom",
    "tabId": "formulae",
    "rowKind": "formula",
    "name": {
      "en": "Black Venom",
      "fr": "Venin noir"
    },
    "level": "journeyman",
    "dc": "15",
    "time": {
      "en": "10 Minutes",
      "fr": "10 Minutes"
    },
    "components": "Quebrith x2, Aether x2, Rebis",
    "cost": "67"
  },
  {
    "id": "formulae-15-chloroform",
    "tabId": "formulae",
    "rowKind": "formula",
    "name": {
      "en": "Chloroform",
      "fr": "Chloroforme"
    },
    "level": "journeyman",
    "dc": "16",
    "time": {
      "en": "15 Minutes",
      "fr": "15 Minutes"
    },
    "components": "Quebrith x2, Vermilion x2, Aether, Vitriol",
    "cost": "54"
  },
  {
    "id": "formulae-16-quick-fire",
    "tabId": "formulae",
    "rowKind": "formula",
    "name": {
      "en": "Quick Fire",
      "fr": "Feu rapide"
    },
    "level": "journeyman",
    "dc": "16",
    "time": {
      "en": "15 Minutes",
      "fr": "15 Minutes"
    },
    "components": "Quebrith, Rebis x2, Caelum, Vitriol, Vermilion",
    "cost": "67"
  },
  {
    "id": "formulae-17-bredan-s-fury",
    "tabId": "formulae",
    "rowKind": "formula",
    "name": {
      "en": "Bredan’s Fury",
      "fr": "Fureur de Bredan"
    },
    "level": "master",
    "dc": "22",
    "time": {
      "en": "30 Minutes",
      "fr": "30 Minutes"
    },
    "components": "Sol x3, Fulgur x3, Caelum, Vermilion",
    "cost": "142"
  },
  {
    "id": "formulae-18-fisstech",
    "tabId": "formulae",
    "rowKind": "formula",
    "name": {
      "en": "Fisstech",
      "fr": "Fisstech"
    },
    "level": "master",
    "dc": "18",
    "time": {
      "en": "30 Minutes",
      "fr": "30 Minutes"
    },
    "components": "Rebis x3, Hydragenum x2, Vitriol x2, Vermilion",
    "cost": "120"
  },
  {
    "id": "formulae-19-pantagran-s-elixir",
    "tabId": "formulae",
    "rowKind": "formula",
    "name": {
      "en": "Pantagran’s Elixir",
      "fr": "Élixir de Pantagran"
    },
    "level": "master",
    "dc": "17",
    "time": {
      "en": "15 Minutes",
      "fr": "15 Minutes"
    },
    "components": "Vermilion x2, Aether x2, Caelum, Sol, Fulgur",
    "cost": "100"
  },
  {
    "id": "formulae-20-perfume-potion",
    "tabId": "formulae",
    "rowKind": "formula",
    "name": {
      "en": "Perfume Potion",
      "fr": "Potion parfumée"
    },
    "level": "master",
    "dc": "18",
    "time": {
      "en": "30 Minutes",
      "fr": "30 Minutes"
    },
    "components": "Quebrith x2, Aether, Vitriol x2, Vermilion, Hydragenum x2",
    "cost": "114"
  },
  {
    "id": "formulae-21-talgar-s-tears",
    "tabId": "formulae",
    "rowKind": "formula",
    "name": {
      "en": "Talgar’s Tears",
      "fr": "Larmes de Talgar"
    },
    "level": "master",
    "dc": "20",
    "time": {
      "en": "30 Minutes",
      "fr": "30 Minutes"
    },
    "components": "Hydragenum x3, Aether x2, Vermilion, Vitriol x2",
    "cost": "118"
  },
  {
    "id": "formulae-22-zerrikanian-fire",
    "tabId": "formulae",
    "rowKind": "formula",
    "name": {
      "en": "Zerrikanian Fire",
      "fr": "Feu Zerrikanien"
    },
    "level": "master",
    "dc": "17",
    "time": {
      "en": "15 Minutes",
      "fr": "15 Minutes"
    },
    "components": "Sol x2, Rebis x3, Fulgur, Vitriol",
    "cost": "97"
  }
];
