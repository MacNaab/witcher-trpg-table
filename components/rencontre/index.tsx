"use client";
import bestiaire from "@/data/tracker/bestiaire.json";
import { nanoid } from "nanoid";
import { CheckboxGroup } from "@/components/form/checkbox";
import { useState } from "react";
import { Tab, Tabs } from "../tabs";
import Tableau from "@/components/rencontre/tableau";
import Et from "@/components/rencontre/et";
import Ou from "@/components/rencontre/ou";

function zoningByBestiaire() {
  const isWordInString = (word: string, str: string) =>
    new RegExp(`${word}`, "i").test(str);

  const zoning: { [key: string]: any[] } = {
    Partout: [],
    Route: [],
    Ville: [],
    Urbain: [],
    Habitation: [],
    habité: [],
    "Champs de bataille": [],
    cadavre: [],
    Cimetière: [],
    Grotte: [],
    Rivière: [],
    Eau: [],
    Forêt: [],
    Plaine: [],
    Montagne: [],
    Mer: [],
    Ruine: [],
    Désert: [],
    Marécage: [],
  };
  bestiaire.forEach((element) => {
    if (element.Environnement) {
      Object.keys(zoning).forEach((key) => {
        if (isWordInString(key, element.Environnement)) {
          zoning[key].push(element);
        }
      });
    }
  });

  // Ville | Urbain | Habitation | habité
  // Champs de bataille | cadavre
  // Cimetière | cadavre
  // Rivière | Eau

  const final_zoning = { ...zoning };
  final_zoning.Urbain = [
    ...zoning.Urbain,
    ...zoning.Ville,
    ...zoning.Habitation,
    ...zoning.habité,
  ];
  final_zoning.Cimetière = [...zoning.Cimetière, ...zoning.cadavre];
  final_zoning.Rivière = [...zoning.Rivière, ...zoning.Eau];
  final_zoning["Champs de bataille"] = [
    ...zoning["Champs de bataille"],
    ...zoning.cadavre,
  ];
  ["Ville", "Habitation", "habité", "cadavre", "Eau"].forEach((e) => {
    delete final_zoning[e];
  });

  Object.keys(final_zoning).forEach((key) => {
    final_zoning[key].sort((a, b) => a.Nom.localeCompare(b.Nom));
  });

  return final_zoning;
}

export default function Home() {
  const zoning = zoningByBestiaire();
  const [zoneForm, setzoneForm]: any = useState(
    Object.keys(zoning).reduce((acc, key) => ({ ...acc, [key]: false }), {})
  );

  const sortedZoning = Object.entries(zoning)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .filter(([key]) => key !== "Partout");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setzoneForm({ ...zoneForm, [event.target.name]: event.target.checked });
  };

  return (
    <div>
      <div className="overflow-x-auto max-w-screen">
        <h1>Selectionnez une zone</h1>
        <CheckboxGroup
          items={sortedZoning.map(([key]) => ({
            label: key,
            name: key,
            checked: zoneForm[key],
          }))}
          onChange={handleChange}
        />
      </div>

      <Tabs>
        <Tab title="Tableau global des rencontres">
          <Tableau
            array={bestiaire.sort((a, b) => a.Nom.localeCompare(b.Nom))}
          />
        </Tab>
        <Tab title='Générateur de rencontre "ET"'>
          <Et zoning={zoning} zoneForm={zoneForm} />
        </Tab>
        <Tab title='Générateur de rencontre "OU"'>
          <Ou zoning={zoning} zoneForm={zoneForm} />
        </Tab>
      </Tabs>
      <div className="text-center text-sm italic mt-2">Nombre total de créatures dans le bestiaire : {bestiaire.length}</div>
    </div>
  );
}
