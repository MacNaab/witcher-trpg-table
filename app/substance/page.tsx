"use client";
import Substance from "@/data/substance.json";
import Form from "@/components/substance/form";
import Table from "@/components/table";
import { useState } from "react";
import Heading from "@/components/typographie/heading";

// Define an interface for Substance with an index signature
interface SubstanceData {
  BASE: {
    Nom: string;
    Rareté: string;
    Localisation: string;
    Quantité: string;
    "SD de recherche": number;
    Poids: string;
    Coût: number;
    Substance: string;
  }[];
  // Add other properties if needed
}

function translateSubstance() {
  var myArray: any[] = [];
  var keys = Object.keys(Substance);
  keys.forEach(function (key) {
    Substance[key as keyof SubstanceData].forEach(function (substance: any) {
      var mySubstance = substance;
      mySubstance.Source = key;
      myArray.push(mySubstance);
    });
  });
  return myArray;
}

export default function Home() {
  const translatedSubstance = translateSubstance();
  const [query, setQuery] = useState({
    text: "",
    type: "Nom",
  });
  return (
    <main className="flex flex-col items-center px-24 py-4">
      <div className="text-center">
        <Heading level={1}>Substances</Heading>
      </div>
      <div className="py-2">
        <Form setQuery={setQuery} />
      </div>
      <div className="py-2" style={{ width: "-webkit-fill-available" }}>
        <Table
          heads={Object.keys(translatedSubstance[0])}
          rows={translatedSubstance.filter((e) =>
            e[query.type].toLowerCase().includes(query.text.toLowerCase())
          )}
        />
      </div>
    </main>
  );
}
