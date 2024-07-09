"use client";

import { nanoid } from "nanoid";
import { useRef, useState } from "react";
import Select from "@/components/form/select";
import {
  modificateursAttaque,
  modificateursLumiere,
  modificateursPortee,
  modificateursTaille,
  rolledFightersInterface,
} from "../utils";
import { rollDice, RollResult } from "../dice";

import Compétences from "@/data/tracker/competences.json";

function CustomSelect({
  options,
  label,
}: {
  options: { label: string; mod: number; exemple?: string; sdCible?: number }[];
  label: string;
}) {
  const [index, setIndex] = useState(0);
  const id = nanoid();
  return (
    <div>
      <div>
        <label
          htmlFor={id}
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {label}
        </label>
        <select
          id={id}
          onChange={(e) => setIndex(Number(e.target.value))}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          {options.map((option, n) => (
            <option key={nanoid()} value={n}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className="italic text-sm">{options[index].exemple || ""}</div>
      <div className="text-sm text-center">{`Modificateur : ${options[index].mod}`}</div>
    </div>
  );
}

export function Competence({
  unit,
  addText,
}: {
  unit: rolledFightersInterface;
  addText: (text: any) => void;
}) {
  const comptRef: any = useRef(null);
  const comptModifRef: any = useRef(null);
  const comptModifId = nanoid();

  const rollComptence = () => {
    const competence: string = comptRef.current.value;
    const modificateur = comptModifRef.current.value;
    const mods: any = {
      caract: Number(
        unit.Data.Caract[Compétences[competence as keyof typeof Compétences]]
      ),
      compt: Number(unit.Data.Compt[competence]),
      mod: Number(modificateur),
    };
    let mod = 0;
    Object.keys(mods).forEach((e) => {
      if (!isNaN(mods[e])) {
        mod += mods[e];
      }
    });
    let formula = "1d10";
    if (mod > 0) {
      formula += `+${mod}`;
    } else if (mod < 0) {
      formula += mod;
    }
    const roll: RollResult = rollDice(formula, true);
    const rollData = {
      roll: roll,
      compétence: competence,
      caract: Compétences[competence as keyof typeof Compétences],
      mods: mods,
    };
    addText({
      type: "rollCompt",
      unit: unit,
      rollData: rollData,
    });
  };
  return (
    <div className="flex justify-center gap-2">
      <select ref={comptRef}>
        {Object.keys(Compétences)
          .sort()
          .map((key) => (
            <option key={nanoid()}>{key}</option>
          ))}
      </select>
      <div className="relative min-w-28">
        <input
          type="number"
          ref={comptModifRef}
          id={comptModifId}
          className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
        />
        <label
          htmlFor={comptModifId}
          className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
        >
          Modificateur
        </label>
      </div>
      <button
        type="button"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={rollComptence}
      >
        Roll
      </button>
    </div>
  );
}

export function Modificateurs() {
  const [distance, setDistance] = useState(false);
  return (
    <div className="my-2">
      <label className="flex items-center justify-center cursor-pointer">
        <span className="mr-3 text-sm font-medium text-gray-900 dark:text-gray-300">
          Mêlée
        </span>
        <input
          type="checkbox"
          value=""
          className="sr-only peer"
          onChange={() => setDistance(!distance)}
        />
        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
          Distance
        </span>
      </label>
      <div className="my-2 grid gap-x-2 gap-y-4 grid-cols-2">
        {distance && (
          <CustomSelect
            options={modificateursPortee}
            label="Modificateurs de portée"
          />
        )}
        <CustomSelect
          options={modificateursAttaque}
          label="Modificateurs d'attaque"
        />
        <CustomSelect
          options={modificateursTaille}
          label="Modificateurs d'éperonnage"
        />{" "}
        <CustomSelect
          options={modificateursLumiere}
          label="Niveau de luminosité"
        />
      </div>
    </div>
  );
}

export function Combat() {
  const [monstre, setMonstre] = useState(false);

  const atkRef: any = useRef(null);
  const atkRefId = nanoid();
  const defRef: any = useRef(null);
  const defRefId = nanoid();
  // localisation lors du jet ATK vs DEF
  const [loc, setLoc] = useState("");
  const [rollAtkText, setRollAtkText] = useState("");
  const [rollLocText, setRollLocText] = useState("");

  const rollAtk = () => {
    const rolls = {
      atk: Number(atkRef.current.value),
      def: Number(defRef.current.value),
      loc: 0,
    };
    switch (loc) {
      case "Tête":
        rolls.loc = -6;
        break;
      case "Torse":
        rolls.loc = -1;
      case "Bras":
        rolls.loc = -3;
      case "Jambe":
        rolls.loc = -2;
      case "Membre":
        rolls.loc = -3;
      case "Queue ou aile":
        rolls.loc = -2;
      default:
        rolls.loc = 0;
        break;
    }
    let calcul = rolls.atk - rolls.def + rolls.loc;
    if (calcul <= 0) {
      setRollAtkText("Echec de l'attaque.");
    } else {
      if (calcul >= 15) {
        setRollAtkText("Critique Mortel ! 10 dégâts supplémentaires");
      } else if (calcul >= 13) {
        setRollAtkText("Critique Difficile ! 8 dégâts supplémentaires");
      } else if (calcul >= 10) {
        setRollAtkText("Critique Complexe ! 5 dégâts supplémentaires");
      } else if (calcul >= 7) {
        setRollAtkText("Critique Simple ! 3 dégâts supplémentaires");
      } else {
        setRollAtkText("Réussite de l'attaque.");
      }
    }
  };

  const rollLocalisation = () => {
    const roll: RollResult = rollDice("1d10");
    let localisations = [];
    if (monstre) {
      localisations = [
        { localisation: "Tête", jet: [1], malus: -6, deg: "x3" },
        { localisation: "Torse", jet: [2, 3, 4, 5], malus: -1, deg: "x1" },
        { localisation: "Membre droit", jet: [6, 7], malus: -3, deg: "x½" },
        { localisation: "Membre gauche", jet: [8, 9], malus: -3, deg: "x½" },
        { localisation: "Queue ou aile", jet: [10], malus: -2, deg: "x½" },
      ];
    } else {
      localisations = [
        { localisation: "Tête", jet: [1], malus: -6, deg: "x3" },
        { localisation: "Torse", jet: [2, 3, 4], malus: -1, deg: "x1" },
        { localisation: "Bras droit", jet: [5], malus: -3, deg: "x½" },
        { localisation: "Bras gauche", jet: [6], malus: -3, deg: "x½" },
        { localisation: "Jambe droite", jet: [7, 8], malus: -2, deg: "x½" },
        { localisation: "Jambe gauche", jet: [9, 10], malus: -2, deg: "x½" },
      ];
    }
    for (const loc of localisations) {
      if (loc.jet.includes(roll.total)) {
        return setRollLocText(
          `Localisation: ${loc.localisation} ~ dégâts ${loc.deg}`
        );
      }
    }
  };

  return (
    <div className="my-2">
      <h1 className="text-lg underline font-medium text-gray-900 dark:text-gray-300">
        Combat contre:
      </h1>
      <label className="flex items-center justify-center cursor-pointer">
        <span className="mr-3 text-sm font-medium text-gray-900 dark:text-gray-300">
          Humain
        </span>
        <input
          type="checkbox"
          value=""
          className="sr-only peer"
          onChange={() => setMonstre(!monstre)}
        />
        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
          Monstre
        </span>
      </label>
      <div className="grid gap-x-2 gap-y-4 grid-cols-2 my-2">
        <div className="relative min-w-28">
          <input
            type="number"
            ref={atkRef}
            id={atkRefId}
            className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor={atkRefId}
            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >
            Jet d&apos;attaque
          </label>
        </div>
        <div className="relative min-w-28">
          <input
            type="number"
            ref={defRef}
            id={defRefId}
            className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor={defRefId}
            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >
            Jet de défense
          </label>
        </div>
        <Select
          options={
            monstre
              ? ["Aucune", "Tête", "Torse", "Membre", "Queue ou aile"]
              : ["Aucune", "Tête", "Torse", "Bras", "Jambe"]
          }
          label="Localisation"
          onChange={(event) => setLoc(event.target.value)}
        />
        <button
          type="button"
          className="m-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={rollAtk}
        >
          Roll
        </button>
        <div className="italic ">{rollAtkText}</div>
      </div>
      <h3 className="text-lg underline font-medium text-gray-900 dark:text-gray-300">
        Localisation
      </h3>
      <div className="flex justify-center">
        <button
          type="button"
          className="m-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={rollLocalisation}
        >
          Roll
        </button>
      </div>
      <div className="italic">{rollLocText}</div>
    </div>
  );
}

export function Armes({
  unit,
  addText,
}: {
  unit: rolledFightersInterface;
  addText: (text: any) => void;
}) {
  const armeRef: any = useRef(null);
  const PARef: any = useRef(null);
  const PAId = nanoid();
  const [FP, setFP] = useState(false);
  const locRef: any = useRef(null);
  const critRef: any = useRef(null);
  const RVRef: any = useRef(null);

  function getLocalisation() {
    switch (locRef.current.value) {
      case "Tête":
        return 3;
      case "Torse":
        return 1;
      default:
        return 0.5;
    }
  }

  function getCritique() {
    switch (critRef.current.value) {
      case "Simple":
        return 3;
      case "Complexe":
        return 5;
      case "Difficile":
        return 8;
      case "Mortel":
        return 10;
      default:
        return 0;
    }
  }

  function getRV() {
    switch (RVRef.current.value) {
      case "Résistance":
        return 0.5;
      case "Vulnérabilité":
        return 2;
      default:
        return 1;
    }
  }

  const rollArme = () => {
    const arme = armeRef.current.value;
    const finded = unit.Data.Arme.find((e) => e.Nom === arme);
    const PA = PARef.current.value;
    const roll = rollDice(finded.DMG);
    const rollData = {
      roll: roll,
      arme: finded,
      mods: {
        PA: Number(PA),
        FP: FP ? 2 : 1,
        CRIT: getCritique(),
        localis: getLocalisation(),
        RV: getRV(),
      },
    };
    addText({
      type: "rollArme",
      unit: unit,
      rollData: rollData,
    });
  };
  return (
    <div className="grid grid-cols-2 my-2 gap-2">
      <select ref={armeRef}>
        {unit.Data.Arme.map((arme: any) => (
          <option key={nanoid()}>{arme.Nom}</option>
        ))}
      </select>
      <div className="relative min-w-28">
        <input
          type="number"
          ref={PARef}
          id={PAId}
          className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
        />
        <label
          htmlFor={PAId}
          className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
        >
          Armure
        </label>
      </div>
      <label className="flex items-center justify-center cursor-pointer">
        <input
          type="checkbox"
          value=""
          className="sr-only peer"
          onChange={() => setFP(!FP)}
        />
        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
          Frappe Puissante
        </span>
      </label>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Localisation
        </label>
        <select
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          ref={locRef}
        >
          {["Tête", "Torse", "Bras", "Jambe", "Membre", "Queue ou aile"].map(
            (e) => (
              <option key={nanoid()}>{e}</option>
            )
          )}
        </select>
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Critique
        </label>
        <select
          ref={critRef}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          {["Aucun", "Simple", "Complexe", "Difficile", "Mortel"].map((e) => (
            <option key={nanoid()}>{e}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Résistance/Vulnérabilité
        </label>
        <select
          ref={RVRef}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          {["Aucune", "Résistance", "Vulnérabilité"].map((e) => (
            <option key={nanoid()}>{e}</option>
          ))}
        </select>
      </div>
      <button
        type="button"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={rollArme}
      >
        Roll
      </button>
    </div>
  );
}
