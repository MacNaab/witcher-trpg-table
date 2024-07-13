"use client";
import Table from "@/components/tracker/localTable";
import Heading from "@/components/typographie/heading";
import React, { useState } from "react";
import { db } from "@/db/data";
import { useLiveQuery } from "dexie-react-hooks";
import Toast from "@/components/toast";


import bestiaire from "@/data/tracker/bestiaire.json"
import { createRoot } from "react-dom/client";

function transformObject(input: any): any {
    const output: any = {};

    // Transform simple properties
    output['name'] = input.Nom;
    output['foqdrouf'] = input.Categorie;
    output['zytvvjhq'] = input.Menace;
    output['pzvylxol'] = input.Récompense;
    output['rxjdksqo'] = input.Armure;
    output['snkkkbnn'] = input.Taille;
    output['eeksoauq'] = input.Poids;
    output['gxmabnzt'] = input.Intelligence;
    output['aowvmmdv'] = input.Environnement;
    output['rydujzum'] = input.Organisation;
    output['ps_max'] = input.Caract.PS;
    output['end_max'] = input.Caract.END;
    output['ps_value'] = input.Caract.PS;
    output['end_value'] = input.Caract.END;

    // Transform Caract properties
    for (const [key, value] of Object.entries(input.Caract)) {
        output[`${key}_1`] = value;
    }

    // Transform Compt properties
    for (const [key, value] of Object.entries(input.Compt)) {
        output[`${key.substr(0, 3).toUpperCase()}_1`] = value;
    }

    // Transform Arme array
    output['arme_repeater'] = {};
    input.Arme.forEach((arme: any, index: any) => {
        const armeKey = `arme_${index}`;
        output['arme_repeater'][armeKey] = {
            pnj_arme_1: arme.Nom,
            pnj_arme_2: arme.DMG,
            pnj_arme_3: arme.Effet,
            pnj_arme_4: arme['Att/tour'],
            pnj_arme_5: 'MEL', // Assuming default value "MEL" here
            pnj_arme_6: 0      // Assuming default value 0 here
        };
    });

    // Transform Butins array to a single string
    output['Butin'] = input.Butins.join(' ');

    // Transform Vulnérabilités array to a single string
    output['mpzipanj'] = input.Vulnérabilités.join(' ');

    // Transform Capacités array to a single string with descriptions
    output['boiatjmu'] = input.Capacités.map((capacite: any) => `${capacite} Description for ${capacite}`).join(' ');

    // Transform Capacités array to a single string
    output['rcxyutxt'] = input.Capacités.join(' ');

    return output;
}

function copyBoard(inputObject: any){
  const result = transformObject(inputObject);
  navigator.clipboard.writeText(JSON.stringify(result, null, 2));
}


export default function Index() {
  const [query, setQuery] = useState("");
  const friends = useLiveQuery(() => db.units.toArray());

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  function copyUnit(unit: any) {
    copyBoard(unit)
    createRoot(document.getElementById("toast_container")!).render(<Toast>
        <>
            <span className="font-bold mr-2">{unit.Nom}</span>
            <span className="block sm:inline">a été copié dans le presse-papier.</span>
        </>
    </Toast>)
  }

  return (
    <div>
        <div id="toast_container" className="flex flex-row justify-end" />
      <Heading level={2}>Importer des fiches pour
        <a target="_blank" href="https://lets-role.com/system/the-witcher-8794" className="ml-2 underline hover:text-blue-500">Lets Role</a>
      </Heading>
      <div className="my-2 mx-12">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Rechercher..."
          className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      {
        friends && <div className="my-2">
        <Table
          heads={["Nom", "Categorie", "Menace", "Source", "Copier"]}
          rows={
            [...bestiaire, ...friends]
              ?.map((e) => ({
                ...e,
                Copier: () => copyUnit(e),
              }))
              ?.filter((option: any) =>
                option.Nom.toLowerCase().includes(query.toLowerCase())
              ) || []
          }
        />
      </div>
      }
      
    </div>
  );
}