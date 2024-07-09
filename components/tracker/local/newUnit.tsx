"use client";

import Autocomplete from "@/components/form/autocomplete";
import Hr from "@/components/typographie/hr";
import Heading from "@/components/typographie/heading";
import Input from "@/components/form/input";
import InputNumber from "@/components/form/inputnumber";
import ModalUnit from "./modalUnit";
import Select from "@/components/form/select";
import Table from "@/components/tracker/localTable";
import { useState } from "react";
import { db, UnitInterface } from "@/db/data";
import { caract_primaire, caract_secondaire, categories } from "../utils";
import { nanoid } from "nanoid";

import Bestiaire from "@/data/tracker/bestiaire.json";
import Competences from "@/data/tracker/competences.json";

function Modal({
  children,
  title,
  addUnit,
}: {
  children: React.ReactNode;
  title: string;
  addUnit: any;
}) {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const entries = Object.fromEntries(data.entries());
    entries.Nom = "Tartenpion le magnifique";
    addUnit(entries);
    e.currentTarget.reset();
    toggleModal();
  };

  return (
    <div>
      <button
        onClick={toggleModal}
        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        Ajouter
      </button>

      <form onSubmit={handleSubmit}>
        <ModalUnit
          showModal={showModal}
          title={title}
          toggleModal={toggleModal}
          submitLabel="Ajouter"
        >
          {children}
        </ModalUnit>
      </form>
    </div>
  );
}

function MyCompetence({ onValid }: { onValid: (value: any) => void }) {
  const [value, setValue] = useState("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  return (
    <div className="flex items-center justify-center my-1">
      <Autocomplete
        label="Compétence"
        options={Object.keys(Competences)}
        onChange={handleChange}
      />
      <button
        type="button"
        className="mx-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={() => onValid(value)}
      >
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
        <span className="sr-only">Ajouter</span>
      </button>
    </div>
  );
}

function ComptItem({
  onEdit,
  onDelete,
  competence,
}: {
  onEdit: any;
  onDelete: any;
  competence: { competence: string; caracteristique: string; value: number };
}) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    onEdit(competence, value);
  };
  return (
    <div className="flex items-center my-1">
      <div
        style={{ width: "-webkit-fill-available" }}
      >{`${competence.competence} (${competence.caracteristique})`}</div>
      <InputNumber
        label=""
        placeholder="valeur de la compétence"
        defaultValue={competence.value}
        onChange={handleChange}
      />
      <button
        type="button"
        className="mx-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={() => onDelete(competence)}
      >
        <svg
          className="w-6 h-6 text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="white"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
          />
        </svg>
        <span className="sr-only">Ajouter</span>
      </button>
    </div>
  );
}

function LocalInput({
  label,
  placeholder = "",
  onValid,
}: {
  label: string;
  placeholder?: string;
  onValid: (value: string) => void;
}) {
  const inputId = nanoid();

  return (
    <div className={`mb-6`}>
      <label
        htmlFor={inputId}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <input
        type="text"
        id={inputId}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
        onKeyDown={(e: any) => {
          if (e.key === "Enter") {
            e.preventDefault();
            onValid(e.target.value);
            e.target.value = "";
          }
        }}
      />
    </div>
  );
}

function StringItem({ onClick, label }: { onClick: any; label: string }) {
  return (
    <div className="flex items-center my-1">
      <div style={{ width: "-webkit-fill-available" }}>{label}</div>
      <button
        type="button"
        className="mx-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={() => onClick(label)}
      >
        <svg
          className="w-6 h-6 text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="white"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
          />
        </svg>
        <span className="sr-only">Ajouter</span>
      </button>
    </div>
  );
}

export default function NewUnit() {
  const [competences, setcompetences] = useState<
    { competence: string; caracteristique: string; value: number }[]
  >([]);
  const [armes, setArmes] = useState<
    {
      Nom: string;
      DMG: string;
      Effet: string;
      "Att/tour": string;
      id: string;
    }[]
  >([]);
  const [butins, setButins] = useState<string[]>([]);
  const [vulnerabilites, setVulnerabilites] = useState<string[]>([]);
  const [capacites, setCapacites] = useState<string[]>([]);

  const addUnit = (entries: any) => {
    let aUnit = {
      ...entries,
      competences: competences,
      armes: armes,
      butins: butins,
      vulnerabilites: vulnerabilites,
      capacites: capacites,
    };
    const newUnit: any = {
      Nom: entries.Nom,
      Menace: entries.Menace,
      Récompense: entries.Récompense,
      Armure: entries.Armure,
      Taille: "",
      Poids: "",
      Environnement: "",
      Intelligence: "",
      Organisation: "",
      Caract: {},
      Compt: {},
      Arme: armes,
      Butins: butins,
      Vulnérabilités: vulnerabilites,
      Capacités: capacites,
      Note: "string",
      Source: entries.Source,
      Categorie: entries["Catégorie"],
    };
    competences.forEach((competence) => {
      newUnit.Compt[competence.competence] = competence.value;
    });
    caract_primaire.forEach((caract) => {
      newUnit.Caract[caract.id] = entries[caract.id];
    });
    caract_secondaire.forEach((caract) => {
      newUnit.Caract[caract.id] = entries[caract.id];
    });
    addFriend(newUnit);
    handleReinit();
  };

  async function addFriend(newUnit: UnitInterface) {
    try {
      // Add the new friend!
      const id = await db.units.add(newUnit);
      console.log(`Unit ${newUnit.Nom} successfully added. Got id ${id}`);
    } catch (error) {
      console.log(`Failed to add ${newUnit.Nom}: ${error}`);
    }
  }

  const handleReinit = () => {
    setcompetences([]);
    setArmes([]);
    setButins([]);
    setVulnerabilites([]);
    setCapacites([]);
  };

  return (
    <Modal title="Nouvelle Unité" addUnit={addUnit}>
      <div className="flex justify-around">
        <Autocomplete
          label="Search"
          options={Bestiaire.map((unit) => unit.Nom)}
        />
        <Input name="Nom" label="Nom" required={true} />
        <Input
          name="Récompense"
          label="Récompense"
          placeholder="300 couronnes"
          required={true}
        />
      </div>
      <div className="flex justify-around">
        <Select label="Catégorie" name="Catégorie" options={categories} />
        <Input
          name="Source"
          label="Source"
          placeholder="Locale"
          required={true}
        />
        <Input
          name="Menace"
          label="Menace"
          placeholder="Faible Complexe"
          required={true}
        />
        <Input name="Armure" label="Armure" placeholder="5" required={true} />
      </div>
      <Hr />
      <Heading level={3}>Caractéristiques</Heading>
      <div className="grid grid-cols-4 gap-4">
        {caract_primaire.map((compt) => (
          <InputNumber
            key={nanoid()}
            name={compt.id}
            label={compt.label}
            required={true}
          />
        ))}
      </div>
      <div className="grid grid-cols-4 gap-4">
        {caract_secondaire.map((compt) => (
          <InputNumber
            key={nanoid()}
            name={compt.id}
            label={compt.label}
            required={true}
          />
        ))}
      </div>
      <Hr />
      <Heading level={3}>Compétences</Heading>
      <MyCompetence
        onValid={(value: keyof typeof Competences) => {
          setcompetences([
            ...competences,
            {
              competence: value,
              caracteristique: Competences[value],
              value: 0,
            },
          ]);
        }}
      />
      <div className="grid grid-cols-3 gap-4">
        {competences?.map((e) => (
          <ComptItem
            key={nanoid()}
            competence={e}
            onEdit={(
              competence: {
                competence: string;
                caracteristique: string;
                value: number;
              },
              value: number
            ) => {
              setcompetences(
                competences.map((compt) =>
                  compt.competence === competence.competence
                    ? { ...competence, value }
                    : { ...compt }
                )
              );
            }}
            onDelete={(value: {
              competence: string;
              caracteristique: string;
              value: number;
            }) => {
              setcompetences(
                competences.filter((e) => e.competence !== value.competence)
              );
            }}
          />
        ))}
      </div>
      {JSON.stringify(competences)}
      <Hr />
      <Heading level={3}>Armes</Heading>
      <Table
        heads={["Nom", "DMG", "Effet", "Att/tour", "Supprimer"]}
        rows={armes.map((e) => ({
          ...e,
          Supprimer: () => setArmes(armes.filter((arme) => arme.id !== e.id)),
        }))}
        editable={true}
        editableChange={(newValue: string, key: string, data: any) => {
          setArmes(
            armes.map((e) => (e.id === data.id ? { ...e, [key]: newValue } : e))
          );
        }}
      />
      <div className="flex justify-end mr-5">
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Ajouter
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 256 256"
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 ml-2"
            onClick={() =>
              setArmes([
                ...armes,
                { Nom: "", DMG: "", Effet: "", "Att/tour": "", id: nanoid() },
              ])
            }
          >
            <path d="M216,32H152a8,8,0,0,0-6.34,3.12l-64,83.21L72,108.69a16,16,0,0,0-22.64,0l-12.69,12.7a16,16,0,0,0,0,22.63l20,20-28,28a16,16,0,0,0,0,22.63l12.69,12.68a16,16,0,0,0,22.62,0l28-28,20,20a16,16,0,0,0,22.64,0l12.69-12.7a16,16,0,0,0,0-22.63l-9.64-9.64,83.21-64A8,8,0,0,0,224,104V40A8,8,0,0,0,216,32ZM52.69,216,40,203.32l28-28L80.68,188Zm70.61-8L48,132.71,60.7,120,136,195.31ZM208,100.06l-81.74,62.88L115.32,152l50.34-50.34a8,8,0,0,0-11.32-11.31L104,140.68,93.07,129.74,155.94,48H208Z"></path>
          </svg>
        </button>
      </div>
      {JSON.stringify(armes)}

      <Hr />
      <div className="flex justify-around">
        <div>
          <LocalInput
            label="Butins"
            placeholder="Couronnes (1d10)"
            onValid={(value: string) => {
              setButins([...butins, value]);
            }}
          />
          {butins?.map((e) => (
            <StringItem
              key={nanoid()}
              onClick={(value: string) => {
                setButins(butins.filter((e) => e !== value));
              }}
              label={e}
            />
          ))}
        </div>
        <div>
          <LocalInput
            label="Vulnérabilités"
            placeholder="Venin du pendu"
            onValid={(value: string) => {
              setVulnerabilites([...vulnerabilites, value]);
            }}
          />
          {vulnerabilites?.map((e) => (
            <StringItem
              key={nanoid()}
              onClick={(value: string) => {
                setVulnerabilites(vulnerabilites.filter((e) => e !== value));
              }}
              label={e}
            />
          ))}
        </div>
        <div>
          <LocalInput
            label="Capacités"
            placeholder="Sang-froid"
            onValid={(value: string) => {
              setCapacites([...capacites, value]);
            }}
          />
          {capacites?.map((e) => (
            <StringItem
              key={nanoid()}
              onClick={(value: string) => {
                setCapacites(capacites.filter((e) => e !== value));
              }}
              label={e}
            />
          ))}
        </div>
      </div>
    </Modal>
  );
}
