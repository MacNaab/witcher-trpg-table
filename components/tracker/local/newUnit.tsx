"use client";

import Autocomplete from "@/components/form/autocomplete";
import Hr from "@/components/typographie/hr";
import Heading from "@/components/typographie/heading";
import ModalUnit from "./modalUnit";
import Table from "@/components/tracker/localTable";
import { createRef, useEffect, useRef, useState } from "react";
import { db } from "@/db/data";
import { caract_primaire, caract_secondaire, categories } from "../utils";
import { nanoid } from "nanoid";
import { SvgArme, SvgDelete, SvgNext } from "@/components/svg";
import Alert from "@/components/alert";

import Bestiaire from "@/data/tracker/bestiaire.json";
import Competences from "@/data/tracker/competences.json";
import { createRoot } from "react-dom/client";

function Modal({
  children,
  title,
  showModal,
  toggleModal,
}: {
  children: React.ReactNode;
  title: string;
  showModal: boolean;
  toggleModal: () => void;
}) {
  return (
    <div>
      <div className="flex mx-2 justify-end">
        <button
          onClick={toggleModal}
          className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button"
        >
          Ajouter une nouvelle unité
        </button>
      </div>

      <ModalUnit
        showModal={showModal}
        title={title}
        toggleModal={toggleModal}
        submitLabel="Ajouter"
      >
        {children}
      </ModalUnit>
    </div>
  );
}

async function addFriend(newUnit: any) {
  try {
    // Add the new friend!
    const id = await db.units.add(newUnit);
    return {
      success: true,
      id: id,
    };
  } catch (error) {
    return {
      success: false,
      error: error,
    };
  }
}

export default function NewUnit() {
  const [formState, setFormState] = useState<any>(initialState);
  const [load, setLoad] = useState(false);
  const [comptAutoload, setComptAutoload] = useState("");
  const inputRefs = useRef<{
    [key: string]: any;
  }>({});

  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  // Initialize refs for each form field
  useEffect(() => {
    inputRefs.current.form = createRef<HTMLFormElement>();
    formFields.forEach((field) => {
      if (field.type === "select") {
        inputRefs.current[field.key] = createRef<HTMLSelectElement>();
      }
      if (field.type === "text") {
        inputRefs.current[field.key] = createRef<HTMLInputElement>();
      }
      if (field.type === "object") {
        inputRefs.current[field.key] = {};
        if (field.key === "Caract") {
          [...caract_primaire, ...caract_secondaire].map((key) => {
            inputRefs.current[field.key][key.id] =
              createRef<HTMLInputElement>();
          });
        } else {
          Object.keys(Competences).forEach((key) => {
            // creat input number ref
            inputRefs.current[field.key][key] = createRef<HTMLInputElement>();
          });
        }
        inputRefs.current[field.key] = {};
      }
    });
    setLoad(true);
  }, []);
  /**
   * Updates the form state with new values and assigns the values to corresponding input fields.
   *
   * @param {any} newValues - The new form data values to update the form state with.
   * @return {void} This function does not return anything.
   */
  const new_values = (newValues: any) => {
    newValues.Arme.forEach((arme: any, index: number) => {
      if (!arme.id) {
        arme.id = nanoid();
      }
    });
    setFormState(newValues);
    formFields.forEach((field) => {
      const ref: any = inputRefs.current[field.key];
      if (ref && ref.current) {
        ref.current.value = newValues[field.key];
      }
    });
  };

  /**
   * Initialize the accumulator, gather form data, and add a new friend.
   *
   * @param {React.FormEvent} event - The form event triggering the submission
   * @return {void} No return value
   */

  function getFormData() {
    const form = inputRefs.current.form.current;
    const formData = new FormData(form);
    const entries = Object.fromEntries(formData.entries());

    // Initialize the accumulator
    const data: { [key: string]: any } = {};

    formFields.forEach((field) => {
      if (field.type === "object") {
        if (field.key === "Caract") {
          data[field.key] = {};
          [...caract_primaire, ...caract_secondaire].map((key) => {
            data[field.key][key.id] = entries[key.id];
          });
        } else {
          // Compétences
          data[field.key] = {};
          Object.keys(Competences).forEach((key) => {
            if (entries[key]) {
              data[field.key][key] = entries[key];
            }
          });
        }
      } else if (field.type === "array") {
        data[field.key] = formState[field.key];
      } else {
        let value = entries[field.key];
        data[field.key] = value;
      }
    });
    return data;
  }

  const handleUpdate = (key: string, value: any) => {
    let formData = getFormData();
    setFormState({
      ...formData,
      [key]: value,
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const data = getFormData();
    // Edit friend
    toggleModal();
    const add = await addFriend(data);
    new_values(initialState);

    const alertContainer = document.getElementById("alert-container");
    if (alertContainer) {
      if (add.success) {
        createRoot(alertContainer).render(
          <Alert
            type="success"
            boldText="Ajout réussite !"
            normalText={`${formState.Nom} a éte ajouté avec pour id ${add.id}/9007199254740992.`}
          />
        );
      } else {
        createRoot(alertContainer).render(
          <Alert
            type="danger"
            boldText="Erreur !"
            normalText={JSON.stringify(add.error)}
          />
        );
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} ref={inputRefs.current.form}>
      <div id="alert-container" />
      <Modal
        title="Nouvelle Unité"
        showModal={showModal}
        toggleModal={toggleModal}
      >
        <div>
          {load && (
            <div>
              <div className="grid gap-6 mb-6 md:grid-cols-3 sm:grid-cols-2 items-center align-middle">
                <Autocomplete
                  label="Prétiré"
                  options={Bestiaire.map((unit) => unit.Nom)}
                  onChange={(event) => {
                    let value = event.target.value;
                    let finded = Bestiaire.find((unit) => unit.Nom === value);
                    if (finded) {
                      new_values(finded);
                    }
                  }}
                />
                {[
                  {
                    key: "Nom",
                    type: "text",
                  },
                  {
                    key: "Récompense",
                    type: "text",
                  },
                  {
                    key: "Categorie",
                    type: "select",
                  },
                  {
                    key: "Source",
                    type: "text",
                  },
                  {
                    key: "Menace",
                    type: "text",
                  },
                  {
                    key: "Armure",
                    type: "text",
                  },
                  {
                    key: "Taille",
                    type: "text",
                  },
                  {
                    key: "Poids",
                    type: "text",
                  },
                  {
                    key: "Environnement",
                    type: "text",
                  },
                  {
                    key: "Intelligence",
                    type: "text",
                  },
                  {
                    key: "Organisation",
                    type: "text",
                  },
                ].map((field) => {
                  if (field.type == "text") {
                    const myID = nanoid();
                    return (
                      <div key={nanoid()} className="relative">
                        <input
                          type="text"
                          id={myID}
                          name={field.key}
                          defaultValue={
                            formState[
                              field.key as keyof typeof formState
                            ] as string
                          }
                          ref={inputRefs.current[field.key]}
                          className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                        />
                        <label
                          htmlFor={myID}
                          className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                        >
                          {field.key}
                        </label>
                      </div>
                    );
                  } else if (field.type == "select") {
                    if (field.key == "Categorie") {
                      return (
                        <div key={nanoid()}>
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Catégorie
                          </label>
                          <select
                            name={field.key}
                            defaultValue={formState[field.key] as string}
                            ref={inputRefs.current[field.key]}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          >
                            {categories.map((option) => (
                              <option key={nanoid()} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </div>
                      );
                    }
                  }
                })}
              </div>
              <Hr />
              <Heading level={3}>Caractéristiques</Heading>
              <div className="grid gap-6 mb-6 md:grid-cols-4 sm:grid-cols-3">
                {caract_primaire.map((key) => {
                  let initValue: any = (
                    formState["Caract"] as Record<string, any>
                  )[key.id];
                  const myID = nanoid();
                  return (
                    <div key={nanoid()} className="relative">
                      <input
                        id={myID}
                        type="number"
                        min="0"
                        name={key.id}
                        defaultValue={initValue}
                        ref={inputRefs.current["Caract"][key.id]}
                        className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      />
                      <label
                        htmlFor={myID}
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                      >
                        {key.label}
                      </label>
                    </div>
                  );
                })}
              </div>
              <div className="grid gap-6 mb-6 md:grid-cols-4 sm:grid-cols-3">
                {caract_secondaire.map((key) => {
                  let initValue: any = (
                    formState["Caract"] as Record<string, any>
                  )[key.id];
                  const myID = nanoid();
                  return (
                    <div key={nanoid()} className="relative">
                      <input
                        id={myID}
                        type="number"
                        min="0"
                        name={key.id}
                        defaultValue={initValue}
                        ref={inputRefs.current["Caract"][key.id]}
                        className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      />
                      <label
                        htmlFor={myID}
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                      >
                        {key.label}
                      </label>
                    </div>
                  );
                })}
              </div>
              <Hr />
              <Heading level={3}>Compétences</Heading>
              <div className="flex items-center justify-center my-1">
                <Autocomplete
                  label="Compétence"
                  options={Object.keys(Competences)}
                  onChange={(e) => {
                    handleUpdate("update", null);
                    setComptAutoload(e.target.value);
                  }}
                />
                <button
                  type="button"
                  className="mx-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={() => {
                    // vérifier d'abord si le champs n'existe pas déjà sur formState
                    if (!formState["Compt"][comptAutoload]) {
                      handleUpdate("Compt", {
                        ...formState["Compt"],
                        [comptAutoload]: "0",
                      });
                    }
                  }}
                >
                  <SvgNext />
                  <span className="sr-only">Ajouter</span>
                </button>
              </div>
              <div className="grid gap-6 mb-6 md:grid-cols-4 sm:grid-cols-3">
                {Object.keys(Competences).map((key: string) => {
                  let initValue: any = (
                    formState["Compt"] as Record<string, any>
                  )[key];
                  const myID = nanoid();
                  return (
                    initValue && (
                      <div key={nanoid()} className="relative">
                        <input
                          id={myID}
                          type="number"
                          min="0"
                          name={key}
                          defaultValue={initValue}
                          ref={inputRefs.current["Compt"][key]}
                          className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                        />
                        <label
                          htmlFor={myID}
                          className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                        >
                          {`${key} (${
                            (Competences as { [key: string]: string })[key]
                          })`}
                        </label>
                      </div>
                    )
                  );
                })}
              </div>
              <Hr />
              <Heading level={3}>Armes</Heading>
              <Table
                heads={["Nom", "DMG", "Effet", "Att/tour", "Supprimer"]}
                rows={formState.Arme?.map((e: any, i: number) => ({
                  ...e,
                  Supprimer: () => {
                    // supprimer une arme
                    handleUpdate(
                      "Arme",
                      formState.Arme.filter((f: any) => f.id !== e.id)
                    );
                  },
                }))}
                editable={true}
                editableChange={(newValue: string, key: string, data: any) => {
                  // modifier une arme
                  handleUpdate(
                    "Arme",
                    formState.Arme.map((e: any) =>
                      e.id === data.id ? { ...e, [key]: newValue } : e
                    )
                  );
                }}
              />
              <div className="flex justify-end mr-5">
                <button
                  type="button"
                  onClick={() => {
                    // ajouter une nouvelle arme dans le state formState
                    handleUpdate("Arme", [
                      ...formState.Arme,
                      {
                        Nom: "",
                        DMG: "",
                        Effet: "",
                        "Att/tour": "",
                        id: nanoid(),
                      },
                    ]);
                  }}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Ajouter
                  <SvgArme />
                </button>
              </div>
              <Hr />
              <div className="grid gap-6 mb-6 md:grid-cols-3 sm:grid-cols-2">
                {[
                  {
                    key: "Butins",
                    type: "array",
                  },
                  {
                    key: "Vulnérabilités",
                    type: "array",
                  },
                  {
                    key: "Capacités",
                    type: "array",
                  },
                ].map((field) => {
                  var n = formState[field.key] as string[];
                  const myID = nanoid();
                  return (
                    <div key={nanoid()}>
                      <div className="relative">
                        <input
                          type="text"
                          id={myID}
                          className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          onKeyDown={(e: any) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              handleUpdate(field.key, [
                                ...formState[field.key],
                                e.target.value,
                              ]);
                              e.target.value = "";
                            }
                          }}
                        />
                        <label
                          htmlFor={myID}
                          className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                        >
                          {field.key}
                        </label>
                      </div>
                      <div className="grid gap-6 mb-6 md:grid-cols-2 p-2">
                        {n.map((key, i) => {
                          let initValue: any = formState[field.key][i];
                          return (
                            <div
                              key={nanoid()}
                              className="flex align-middle items-center justify-center"
                            >
                              <div className="text-base text-center text-gray-900 dark:text-white">
                                {initValue}
                              </div>
                              <button
                                type="button"
                                className="mx-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                onClick={() => {
                                  // supprimer l'élément dans la liste formState
                                  handleUpdate(field.key, [
                                    ...formState[field.key].slice(0, i),
                                    ...formState[field.key].slice(i + 1),
                                  ]);
                                }}
                              >
                                <SvgDelete />
                                <span className="sr-only">Supprimer</span>
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
              <Hr />
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Notes
                </label>
                <textarea
                  name="Note"
                  defaultValue={formState["Note"] as string}
                  ref={inputRefs.current["Note"]}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Notes..."
                />
              </div>
            </div>
          )}
        </div>
      </Modal>
    </form>
  );
}

interface FormData {
  Nom: string;
  Menace: string;
  Récompense: string;
  Armure: string;
  Taille: string;
  Poids: string;
  Environnement: string;
  Intelligence: string;
  Organisation: string;
  Caract: {};
  Compt: {};
  Arme: any[];
  Butins: string[];
  Vulnérabilités: string[];
  Capacités: string[];
  Note: string;
  Source: string;
  Categorie: string;
}

const initialState: FormData = {
  Nom: "",
  Menace: "",
  Récompense: "",
  Armure: "",
  Taille: "",
  Poids: "",
  Environnement: "",
  Intelligence: "",
  Organisation: "",
  Caract: {
    INT: "1",
    RÉF: "1",
    DEX: "1",
    COR: "1",
    VIT: "1",
    EMP: "1",
    TECH: "1",
    VOL: "1",
    CHA: "1",
    ÉTOU: "1",
    COU: "1",
    SAUT: "1",
    END: "1",
    ENC: "1",
    RÉC: "1",
    PS: "1",
    VIG: "1",
  },
  Compt: {},
  Arme: [],
  Butins: [],
  Vulnérabilités: [],
  Capacités: [],
  Note: "",
  Source: "",
  Categorie: "",
};

const formFields: { key: keyof FormData; type: string }[] = [
  {
    key: "Nom",
    type: "text",
  },
  {
    key: "Récompense",
    type: "text",
  },
  {
    key: "Categorie",
    type: "select",
  },
  {
    key: "Source",
    type: "text",
  },
  {
    key: "Menace",
    type: "text",
  },
  {
    key: "Armure",
    type: "text",
  },
  {
    key: "Taille",
    type: "text",
  },
  {
    key: "Poids",
    type: "text",
  },
  {
    key: "Environnement",
    type: "text",
  },
  {
    key: "Intelligence",
    type: "text",
  },
  {
    key: "Organisation",
    type: "text",
  },
  {
    key: "Caract",
    type: "object",
  },
  {
    key: "Compt",
    type: "object",
  },
  {
    key: "Arme",
    type: "array",
  },
  {
    key: "Butins",
    type: "array",
  },
  {
    key: "Vulnérabilités",
    type: "array",
  },
  {
    key: "Capacités",
    type: "array",
  },
  {
    key: "Note",
    type: "text",
  },
];
