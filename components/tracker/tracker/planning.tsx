import { useState } from "react";
import Autocomplete from "@/components/form/autocomplete";
import Table from "@/components/tracker/localTable";
import { EncounterInterface, UnitInterface } from "@/db/data";
import { nanoid } from "nanoid";
import { rollDice } from "@/components/tracker/dice";

import Bestiaire from "@/data/tracker/bestiaire.json";

export default function Planning({
  activeEncounter,
  updateEncounter,
}: {
  activeEncounter: EncounterInterface;
  updateEncounter: Function;
}) {
  const [combattants, setCombattants] = useState<any[]>(
    activeEncounter.Combattants || []
  );
  const [value, setValue] = useState<string>("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const findInBestiaire = (name: string): UnitInterface | null => {
    const unit: any = Bestiaire.find((unit) => unit.Nom === name);
    if (!unit) {
      return null;
    }
    return unit;
  };

  const handleAddClick = () => {
    /*
    setCombattants([
      ...combattants,
      {
        Nom: value,
        Groupe: "1",
        Data: findInBestiaire(value),
        Nombre: 1,
      },
    ]);
    */
    const newValue = {
      ...activeEncounter,
      Combattants: [
        ...combattants,
        {
          Nom: value,
          Groupe: "1",
          Data: findInBestiaire(value),
          Nombre: 1,
        },
      ],
    };
    updateEncounter(newValue);
  };

  const handleDeleteClick = (unit: UnitInterface) => {
    const newValue = {
      ...activeEncounter,
      Combattants: combattants.filter((u) => u.Nom !== unit.Nom),
    };
    updateEncounter(newValue);
  };

  const editableChange = (value: string, head: string, row: any) => {
    const newValue = {
      ...activeEncounter,
      Combattants: combattants.map((u) => {
        if (u.Nom === row.Nom) {
          return {
            ...u,
            [head]: value,
          };
        }
        return u;
      }),
    };
    updateEncounter(newValue);
  };

  function rollFighters(combattants: { Nom: string; Nombre: number, Data: any, Groupe: string }[]) {
    let result: any[] = [];
    combattants.forEach((unit) => {
      for (let i = 0; i < unit.Nombre; i++) {
        result.push({
          id: nanoid(),
          Nom: i > 0 ? `${unit.Nom} ${i+1}` : unit.Nom,
          Data: unit.Data,
          Groupe: unit.Groupe,
          Initiative: rollDice(`1d10+${unit.Data.Caract['RÉF']}`, true),
          END: unit.Data.Caract['END'],
          PS: unit.Data.Caract['PS'],
        })
      }
    });
    return result.sort((a, b) => b.Initiative.total - a.Initiative.total);
  }

  const rollInitiative = () => {
    const newValue = {
      ...activeEncounter,
      Rolled: true,
      rolledFighters: rollFighters(combattants),
    };
    updateEncounter(newValue);
  };

  return (
    <div>
      <h3>Phase de plannification</h3>
      <div className="flex gap-2">
        <div style={{ width: "-webkit-fill-available" }}>
          <Autocomplete
            label="Rechercher une unitée"
            options={Bestiaire.map((unit) => unit.Nom)}
            onChange={handleChange}
          />
        </div>
        <div className="my-auto">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded"
            type="button"
            onClick={handleAddClick}
          >
            Ajouter
          </button>
        </div>
      </div>
      <div className="py-2">
        <Table
          heads={["Groupe", "Nom", "Catégorie", "Nombre", "Supprimer"]}
          rows={combattants.map((unit) => ({
            ...unit,
            Supprimer: () => {
              handleDeleteClick(unit);
            },
          }))}
          // rows={[]}
          editable={true}
          editableChange={editableChange}
          escapeEditable={["Catégorie", "Nom"]}
        />
      </div>
      <div className="py-2 text-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded-md"
          type="button"
          onClick={rollInitiative}
        >
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 512 512"
            height="4em"
            width="4em"
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto my-2"
          >
            <path d="M248 20.3L72 132.6l176-3.8V20.3zm16 0v108.5l175.7 3.8L264 20.3zm43.1 49.97c2.8.06 5.8.75 9.2 2.08 2.3.91 4.1 1.91 5.6 3.07 1.5 1.15 2.8 2.5 3.7 3.79 1.5 2.06 2.2 4.04 2.6 6.25 2.4-1.77 5.2-2.98 8.2-3.84 3.4-.73 7.2-.35 11.1 1.23 4.6 1.82 8.1 4.19 10.3 7.11 2.2 2.93 3.5 5.97 4 9.13.3 1.71.3 3.41.1 5.01-.1 1.7-.6 3.3-1.2 4.7-.5 1.5-1.2 3-2.3 4.3-1 1.3-2.1 2.6-3.5 3.6-2.5 2-5.5 3.3-9.1 3.9-3.6.6-7.7 0-12.3-1.8-4-1.6-7-3.8-9-6.7-1.6-2.6-2.9-5.5-3.4-8.4-2 1.5-4.2 2.5-6.9 2.9-3 .6-6.5 0-10.7-1.6-2.4-1-4.5-2.1-6.2-3.3-1.8-1.3-3.2-2.61-4.3-4.08-2.1-2.58-3.2-5.37-3.5-8.35-.2-2.9.2-5.65 1.1-8.15.5-1.29 1.3-2.57 2.1-3.92 1-1.1 2-2.21 3.1-3.26 2.4-1.77 5.2-2.97 8.5-3.53.9-.12 1.8-.17 2.8-.14zM208 75.56c4.8.05 10.9 3.57 9 10.04-4 6.9-10.3 12.17-18 14.8-7.4 2.5-15 4.4-22 1.9-3-2.3-13-9.4-15-3.4-1.2 15.3 1 13-11 17.8V92.3c10-3.9 21-4.5 31 1.3 8 4.2 19 1.5 24-5.8 1-6.5-8-4.5-12-3.3-3-8.3 7.8-8.43 13-8.9.3-.03.6-.04 1-.04zm100.5 4.46c-.9.01-1.8.14-2.8.36-2.4.61-4.2 2.17-5.1 4.67-1 2.42-.8 4.74.6 6.88 1.4 2.22 3.3 3.73 6 4.78 2.9 1.15 5.4 1.41 8 .73 2.5-.56 4.3-2.12 5.2-4.54 1-2.5.8-4.82-.7-7.01-1.4-2.14-3.5-3.77-6.4-4.92-1.6-.66-3.2-.96-4.8-.95zm28.9 10.15c-1.1.05-2.2.27-3.2.65-2.7 1.17-4.5 2.96-5.4 5.39-1 2.5-.9 5.09.4 7.59 1.2 2.6 3.6 4.6 7.2 6.1 2.9 1.1 5.8 1.3 8.6.6 2.8-.8 4.7-2.7 5.8-5.6 1.1-2.9 1.1-5.53-.5-8.01-1.5-2.47-3.7-4.37-6.6-5.51-2.3-.9-4.4-1.29-6.3-1.21zM242 144.9L55 149l72 192.9 115-197zm28 0l115.4 197L456.6 149 270 144.9zm-14 7.5L139 352.6h234.1L256 152.4zm116.6 16.4l19.2 42.5 7.2-3.3 4.1 9.2-7.1 3.2 6.3 14-10.4 4.7-6.3-14-30.2 13.6-3.9-8.7c1.4-9.2 4.4-27.8 8.9-55.7l1.8-.8.8-.3 3.1-1.5 6.5-2.9zm-225.9 12.1h1.3c2.9 0 5.5.5 7.8 1.6 6.9 3.2 10.7 8.4 11.7 15.3.9 6.9-1 15.3-5.7 25.1-4.7 9.7-10 16.5-15.8 20.3-6 3.8-12.3 4.1-19.1 1-5.9-2.8-9.4-6.7-10.6-11.9-1.2-5.3-.9-9.7.9-13.5l9.6 4.4c-.9 1.7-1.1 3.8-.8 6.3.3 2.6 1.9 4.5 5 6 3.1 1.4 6.1 1.3 9.2-.2 3.1-1.4 6.3-5.2 9.7-11.3.5-1 1.1-2.1 1.7-3.3-1.8 1.2-3.6 2-5.5 2.6-3.2.9-6.6.5-10.3-1.2-4.3-2-7.5-5.5-9.5-10.6-2.1-5-1.5-10.7 1.6-17.2l.1-.1c1.1-2.3 2.4-4.4 4-6 1.4-1.7 3.1-3.1 4.8-4.2 3.1-1.9 6.4-3 9.9-3.1zM52 186v173.2l62-5.7L52 186zm408 0l-61.9 167.5 61.9 5.7V186zm-91.9.6c-1.6 9.7-3.6 22.5-6.2 38.2l19.6-8.8-8.2-17.9-5.2-11.5zm-219.7 4.1c-1.5.1-2.9.4-4.3 1.1-3 1.4-5.1 3.5-6.5 6.5-1.6 3.4-2.1 6.5-1.2 9.6.9 3 2.7 5.1 5.4 6.4 2.8 1.3 5.7 1.3 8.5 0s5.1-3.6 6.8-7c1.4-2.9 1.7-5.9 1-9-.8-3.1-2.6-5.3-5.4-6.6-1.4-.7-2.9-1-4.3-1zm103.2 47.7h15.6v84.2h-15.6v-70.2c-8.8 5.8-15.3 9.6-19.4 11.2l-6.3 2.8v-14l6.3-2.8c4.1-1.8 10.6-5.4 19.4-11.2zm201.7 6.2h.5c3.6.3 5.7 7 4.7 11.1-.1 18.6 1.1 39.2-9.7 55.3-.9 1.2-2.2 1.9-3.7 2.5-5.8-4.1-3-11.3 1.2-15.5 1 7.3 5.5-2.9 6.6-5.6 1.3-3.2 3.6-17.7-1-10.2.7 4-6.8 13.1-9.3 8.1-5-14.4 0-30.5 7-43.5 1.3-1.4 2.5-2.1 3.7-2.2zm-393.3.9c1 .1 1 1 2 3.6v61.1c-7-7-3-17.4-4-26.4-1-7.6 2-16.3-1-23.2-5-1.7-6-17-3-12.7 4 4.8 4-2.7 6-2.4zm390.9 10.6c-1 0-2 1-2.8 3.7-1.6 5.9-3.3 13.4-.7 19.3 5.1-2 5.4-9.6 6.6-14.5 1.2-3.3-.9-8.4-3.1-8.5zM75 268.2c4-.5 7 7.2 9 10.8 3.28 12.7 4.21 13.9 3 16.8-5-3.7-4.87-7.4-5.36-8.9-1-3-1.64-5.3-3.64-8.4-3.34 2.8-3 9.1-3 13.4 0-1.6 1-2.3 4-.7 7 12.6 12 29.1 7 43.5l-2 1.1c-11-5.8-12-19.4-14-30-1-12.3-1-24.7 2-36.7 1-.6 2-.9 3-.9zm358.2 4.8c4.5.3.8 35.2.8 55l-4.4 6.7v-42.3c-4.6 7.5-9.1 9.1-6.1-.9 4.9-13.4 7.9-18.6 9.7-18.5zM77 299.2c-4 4.7-2 12.8-1 18.4 2 5.5 7 10.2 6 1.6 0-5.7 1-11.8-3-16.4 0-.6-1-1.9-2-3.6zm66 69.4l113 123.1 112.8-123.1H143zm-21 .3l-54 4.9 64 41.1c-2-2.7-5-5.7-7-8.8-5-6.9-10-13.6-19-16.6-9-6.5-4-5.3 3-2.6-1-1.8-1-2.6 0-2.6 2-.2 9 4.2 10 6.3l25 31.6 65 41.7-87-95zm268.2 0l-42.4 46.3c6.4-3.1 11.3-8.5 17-12.4 2.4-1.4 3.7-1.9 4.3-1.9 2.1 0-5.4 7.1-7.7 10.3-9.4 9.8-16 23-28.6 29.1l18.9-24.5c-2.3 1.3-6 3.2-8.2 4.1l-40.3 44 74.5-47.6c5.4-6.7 1.9-5.6-5.7-.9l-11.4 6c11.4-13.7 26.8-23.6 40-35.6 3.2-1.5 9.5-5.6 11-5.7.8-.1.2 1-2.8 4.2l-12.6 16c10-7.6.9 3.9-4.5 5.5-.7 1-1.4 2-2.2 2.9l54.5-34.9-53.8-4.9zm-158.3 16.7c1.4 0 2.7.1 4.1.2v43.4h-13v-30c-5-1.4-11 1.7-16-.3-4-2.9 1-6.8 5-5.9 3-.1 7 .2 9-3.2 3.4-3.1 7-4.2 10.9-4.2zm33.1.7s1 .1 1 .2c4 .8 7 .3 10 .4h25.6c1.5 3 .8 7.8-3.3 7.9-3.9.5-7.8-.4-11.7.2-4.7.2-9.6-1.8-14.6.4-3 1.7-4 8.5 1 6.1 4-1.1 7.3-1.8 10.8-.9 7 1.1 15 2.9 19.1 9.2 2.1 3.1 2.7 7.3.7 10.7-3.6 6.5-11.6 8.4-18.3 9.7-2.4.4-4.7 1.4-7.3 1.2-7-.6-15-1.1-20-7.1-3-2.5-3-7.1 2-6.7 3-.1 8-.4 10 3.5 3 3.7 9 3 13 2 3.6-.5 7.5-2.6 7.6-6.7.6-4.2-3.1-7.2-6.9-7.8-5.7-2.3-11.7 1.4-17.7 1.8-3 1.1-9 .5-9-4.4 1-4.2 3-8.1 3-12.5 0-3 2-7 5-7.2zm133.5 5c-.2-.2-7 5.8-9.9 8.1l-15.8 13.1c8.6-4.4 16.5-9.6 22.3-17.4 2.6-2.6 3.5-3.7 3.4-3.8zM151 405.5c3 0 8 4.6 10 7l26 31.1c-8-2.1-13-7.1-18-13.7-6-7.3-11-16.6-21-19.6-9-5-5-6.4 2-2.2 0-1.9 0-2.6 1-2.6z"></path>
          </svg>
          Roll Initiative
        </button>
      </div>
    </div>
  );
}
