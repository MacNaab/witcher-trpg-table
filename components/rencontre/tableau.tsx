"use client";
import Table from "@/components/tracker/localTable";
import Heading from "@/components/typographie/heading";
import React, { useState } from "react";

export default function Home({ array }: { array: any[] }) {
  const [query, setQuery] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };
  return (
    <div>
      <div className="my-2 mx-12">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Rechercher par environnement..."
          className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="my-2">
        <Table
          heads={["Nom", "Categorie", "Menace", "Environnement", "Source"]}
          rows={
            array.filter((option: any) =>
              option?.Environnement?.toLowerCase().includes(query.toLowerCase())
            ) || []
          }
        />
      </div>
    </div>
  );
}
