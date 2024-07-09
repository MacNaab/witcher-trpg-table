"use client";
import Table from "@/components/tracker/home/encTable";
import Heading from "@/components/typographie/heading";
import React, { useState } from "react";
import { db, EncounterInterface } from "@/db/data";
import { useLiveQuery } from "dexie-react-hooks";
import Alert from "@/components/alert";

export default function Home() {
  const active_encounter: any = useLiveQuery(() =>
    db.active_encounter.toArray()
  );

  const [query, setQuery] = useState("");
  const [encName, setEncName] = useState("");
  const encounters = useLiveQuery(() => db.encounters.toArray());

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleClick = () => {
    const newEncounter: any = {
      Nom: encName,
      Starred: false,
      Combattants: [],
      Groups: [],
      Rolled: false,
      activeIndex: 0,
      rolledFighters: [],
      logs: [],
    };
    addEncounter(newEncounter);
  };

  async function addEncounter(newEncounter: EncounterInterface) {
    try {
      // Add the new friend!
      await db.encounters.add(newEncounter);
    } catch (error) {
      console.log(`Failed to add ${newEncounter.Nom}: ${error}`);
    }
  }

  async function deleteEncounter(id: number) {
    try {
      // Add the new friend!
      await db.encounters.delete(id);
    } catch (error) {
      console.log(`Failed to add ${id}: ${error}`);
    }
  }

  async function editEncounter(id: number, new_value: boolean) {
    try {
      // Add the new friend!
      await db.encounters.update(id, { Starred: new_value });
    } catch (error) {
      console.log(`Failed to edit ${id}: ${error}`);
    }
  }

  async function newActiveEncounter(id: number) {
    if (active_encounter?.length > 0) {
      // s'il y a déjà un active_encounter, on le modifie
      try {
        await db.active_encounter.update(1, { activeEncounter: id });
      } catch (error) {
        console.log(`Failed to edit ${id}: ${error}`);
      }
    } else {
      // sinon on l'ajoute
      try {
        await db.active_encounter.add({ activeEncounter: id });
      } catch (error) {
        console.log(`Failed to add ${id}: ${error}`);
      }
    }
  }

  return (
    <div>
      {active_encounter?.length > 0 ? null : (
        <Alert
          type="warning"
          boldText="Attention !"
          normalText="Aucune rencontre selectionnée.."
        />
      )}
      <Heading level={2}>Liste des rencontres</Heading>
      <div className="my-8 mx-8 flex justify-center align-middle">
        <div
          className="relative min-w-56"
          style={{ width: "-webkit-fill-available" }}
        >
          <input
            type="text"
            id="floating_filled"
            className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            value={encName}
            onChange={(e) => setEncName(e.target.value)}
          />
          <label
            htmlFor="floating_filled"
            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >
            Nom de la rencontre
          </label>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-8 rounded"
          onClick={handleClick}
        >
          Ajouter
        </button>
      </div>
      <div className="my-2 mx-12">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Rechercher..."
          className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>

      <div className="my-2">
        <Table
          heads={["Nom", "Favoris", "id", "Activer", "Supprimer"]}
          // nom, starred, combattants, groups, rolled, active_index, rolledFighters
          rows={
            encounters
              ?.map((e) => ({
                ...e,
                Supprimer: () => deleteEncounter(e.id),
                Activer: () => newActiveEncounter(e.id),
                Favoris: () => editEncounter(e.id, !e.Starred),
              }))
              ?.filter((option: EncounterInterface) =>
                option.Nom.toLowerCase().includes(query.toLowerCase())
              ) || []
          }
          active_id={
            active_encounter?.length > 0
              ? active_encounter[0].activeEncounter
              : -1
          }
        />
      </div>
    </div>
  );
}
