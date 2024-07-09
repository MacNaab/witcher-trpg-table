"use client";

import { nanoid } from "nanoid";
import { rolledFightersInterface } from "@/components/tracker/utils";
import ReactPopover from "@/components/popover";
import { RollResult } from "@/components/tracker/dice";
import { Tab, Tabs } from "@/components/tabs";

import { Competence, Modificateurs, Combat, Armes } from "./modificateurs";

function LocalPopover({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <div className="inline-block text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800">
      <div className="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700">
        <h3 className="font-semibold text-center text-gray-900 dark:text-white">
          {title}
        </h3>
      </div>
      <div className="px-3 py-2">{children}</div>
    </div>
  );
}

export function LocalRollPopover({
  unit,
  addText,
}: {
  unit: rolledFightersInterface;
  addText: (text: any) => void;
}) {
  return (
    <ReactPopover
      trigger="click"
      placement="bottom"
      content={
        <LocalPopover title={unit.Nom}>
          <div className="min-w-[400px]">
            <Tabs>
              <Tab title="Compétence">
                <Competence unit={unit} addText={addText} />
              </Tab>
              <Tab title="Mods">
                <Modificateurs />
              </Tab>
              <Tab title="Combat">
                <Combat />
              </Tab>
              <Tab title="Arme">
                <Armes unit={unit} addText={addText} />
              </Tab>
            </Tabs>
          </div>
        </LocalPopover>
      }
    >
      <span className="font-bold cursor-pointer text-gray-900 whitespace-nowrap dark:text-white">
        {unit.Nom}
      </span>
    </ReactPopover>
  );
}
/*
<div className="grid grid-cols-2 my-2 gap-2">
                  <select ref={armeRef}>
                    {unit.Data.Arme.map((arme: any) => (
                      <option key={nanoid()}>{arme.Nom}</option>
                    ))}
                  </select>
                  <div className="relative min-w-28">
                    <input
                      type="number"
                      ref={armeModifRef}
                      id={armeModifId}
                      className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                    />
                    <label
                      htmlFor={armeModifId}
                      className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                    >
                      Modificateur
                    </label>
                  </div>
                  <div className="relative min-w-28">
                    <input
                      type="number"
                      ref={armeMultiRef}
                      id={armeMultiId}
                      className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                    />
                    <label
                      htmlFor={armeMultiId}
                      className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                    >
                      Multiplicateur
                    </label>
                  </div>
                  <button
                    type="button"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={rollArme}
                  >
                    Roll
                  </button>
                </div>
*/
export function RolledCompetencePopover({
  unit,
  rollData,
}: {
  unit: rolledFightersInterface;
  rollData: {
    roll: RollResult;
    compétence: string;
    caract: string;
    mods: {
      caract: number;
      compt: number;
      mod: number;
    };
  };
}) {
  return (
    <div className="mb-2" style={{ display: "ruby-text" }}>
      <div>{`${unit.Nom}`}</div>
      <ReactPopover
        trigger="hover"
        placement="bottom"
        content={
          <LocalPopover title="Jet de Compétence">
            <div>
              <div>{`Caractéristique (${rollData.caract}): ${rollData.mods.caract}`}</div>
              <div>{`Compétence (${rollData.compétence}): ${rollData.mods.compt}`}</div>
              <div>{`Modificateur: ${rollData.mods.mod}`}</div>
              <div>{`Jet de dé (explosif):`}</div>
              <div className="ml-2">
                <div>{` - Formule: ${rollData.roll.formula}`}</div>
                {rollData.roll.rolls.length > 1 ? (
                  <div className="font-semibold">{` - ${
                    rollData.roll.rolls[0] == 10 ? "Réussite" : "Échec"
                  } critique !`}</div>
                ) : null}
                <div>{` - Jet de dé${
                  rollData.roll.rolls.length > 1 ? "s" : ""
                }: ${JSON.stringify(rollData.roll.rolls)}`}</div>
                <div>{` - Total: ${rollData.roll.total}`}</div>
              </div>
            </div>
          </LocalPopover>
        }
      >
        <div className="cursor-pointer">
          <span>lance un jet:</span>
          <span className="font-bold italic p-2">{rollData.compétence}</span>
          <span>et obtient</span>
          <span className="font-bold">{` ${rollData.roll.total}.`}</span>
        </div>
      </ReactPopover>
    </div>
  );
}

export function RolledArmePopover({
  unit,
  rollData,
}: {
  unit: rolledFightersInterface;
  rollData: {
    roll: RollResult;
    arme: {
      Nom: string;
      DMG: string;
      Effet: string;
      "Att/tour": string;
    };
    mods: {
      PA: number;
      FP: number;
      CRIT: number;
      localis: number;
      RV: number;
    };
  };
}) {
  function calculateDamage() {
    // formula = ((DMG * FP [2|1] - PA) + CRITIQUE) * LOCALISATION * RV
    let dmg =
      Number(rollData.roll.total) * Number(rollData.mods.FP) -
      Number(rollData.mods.PA);
    if (dmg < 0) {
      dmg = 0;
    }
    dmg =
      (Number(dmg) + Number(rollData.mods.CRIT)) *
      Number(rollData.mods.localis) *
      Number(rollData.mods.RV);
    return Math.floor(dmg);
  }
  const calculatedDamage = calculateDamage();
  return (
    <div className="mb-2" style={{ display: "ruby-text" }}>
      <div>{`${unit.Nom}`}</div>
      <ReactPopover
        trigger="hover"
        placement="bottom"
        content={
          <LocalPopover title="Jet d'Arme">
            <div>
              <div>{`${rollData.arme.Nom}: ${rollData.arme.DMG}`}</div>
              <div>{`Jet de dé (non explosif):`}</div>
              <div className="ml-2">
                <div>{` - Formule: ${rollData.roll.formula}`}</div>
                <div>{` - Jet de dé${
                  rollData.roll.rolls.length > 1 ? "s" : ""
                }: ${JSON.stringify(rollData.roll.rolls)}`}</div>
                <div>{` - Total: ${rollData.roll.total}`}</div>
              </div>
              <div>{`Armure: ${rollData.mods.PA}`}</div>
              {rollData.mods.FP == 2 && <div>Frappe puissance (x2)</div>}
              {rollData.mods.CRIT > 0 && (
                <div>{`Critique: +${rollData.mods.CRIT}`}</div>
              )}
              <div>{`Localisation: x${rollData.mods.localis}`}</div>
              {rollData.mods.RV != 1 && (
                <div>
                  {rollData.mods.RV == 2
                    ? "Vulnérabilité (x2)"
                    : "Résistance (x0.5)"}
                </div>
              )}
              <div>{`Jet de dégâts:`}</div>
              <div className="ml-2">
                <div>{` - Formule: ((${Number(rollData.roll.total)} [${
                  rollData.arme.DMG
                }] ${rollData.mods.FP == 2 ? "x2 [Frappe puissance]" : ""}  - ${
                  rollData.mods.PA
                } [Armure]) ${
                  rollData.mods.CRIT > 0 ? "+" + rollData.mods.CRIT : ""
                } ) x${rollData.mods.localis} [Localisation] ${rollData.mods.RV < 1 ? "x0.5 [Résistance]" : ""} ${rollData.mods.RV > 1 ? "x2 [Vulnérabilité]" : ""} `}</div>
                <div>{` - Total: ${calculatedDamage}`}</div>
              </div>
            </div>
          </LocalPopover>
        }
      >
        <div className="cursor-pointer">
          <span>lance un jet de dégâts:</span>
          <span className="font-bold italic p-2">{rollData.arme.Nom}</span>
          <span>et obtient</span>
          <span className="font-bold">{` ${calculatedDamage}.`}</span>
        </div>
      </ReactPopover>
    </div>
  );
}
