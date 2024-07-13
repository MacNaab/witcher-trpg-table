"use client";
import Table from "@/components/tracker/localTable";
import Heading from "@/components/typographie/heading";
import NewUnit from "./newUnit";
import EditUnit from "./editUnit";
import React, { useState } from "react";
import { db, db_units_reset, UnitInterface } from "@/db/data";
import { useLiveQuery } from "dexie-react-hooks";

async function deleteEncounter(id: number) {
  try {
    // Add the new friend!
    await db.units.delete(id);
  } catch (error) {
    console.log(`Failed to add ${id}: ${error}`);
  }
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [editedUnit, setEditedUnit] = useState<UnitInterface>()
  const friends = useLiveQuery(() => db.units.toArray());

  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const editUnit = (unit: UnitInterface) => {
    setEditedUnit(unit);
    setShowModal(true);
  };
  return (
    <div>
      <Heading level={2}>Bestiaire local</Heading>
      <NewUnit />
      <EditUnit unit={editedUnit} toggleModal={toggleModal} showModal={showModal}  />
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
          heads={["Nom", "Categorie", "Menace", "Source", "Éditer", "Supprimer"]}
          rows={
            friends
              ?.map((e) => ({
                ...e,
                Supprimer: () => deleteEncounter(e.id),
                Éditer: () => editUnit(e),
              }))
              ?.filter((option: UnitInterface) =>
                option.Nom.toLowerCase().includes(query.toLowerCase())
              ) || []
          }
        />
      </div>
    </div>
  );
}
