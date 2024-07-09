"use client";
import Table from "@/components/tracker/tracker/table";
import { EncounterInterface } from "@/db/data";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { RolledCompetencePopover, RolledArmePopover } from "./affpopover";
import Hr from "@/components/typographie/hr";

interface LootInterface {
  recompense: number;
  deads: number;
  butins: any;
}

function Loots({ log }: { log: LootInterface }) {
  if (log.deads == 0) {
    return (
      <div className="mt-2 ">
        <div className="h-1 mx-auto my-2 px-4 md:px-5 max-w-xl border-0 rounded bg-gray-50 dark:bg-gray-600" />
        <div className="font-bold text-center uppercase">Combat terminé sans morts !</div>
      </div>
    );
  }
  return (
    <div className="mt-2 ">
      <div className="h-1 mx-auto my-2 px-4 md:px-5 max-w-xl border-0 rounded bg-gray-50 dark:bg-gray-600" />
      <div className="font-bold text-center uppercase">Combat terminé !</div>
      <div className="mt-2">
        {log.deads > 1 ? "Morts :" : "Mort :"} {log.deads}
      </div>
      <div className="mt-2">
        Récompense : {log.recompense}{" "}
        {log.recompense > 1 ? "couronnes" : "couronne"}
      </div>
      <div className="mt-2">Butins :</div>
      {Object.keys(log.butins)
        .sort()
        .map((key) => {
          return (
            <div key={nanoid()} className="ml-2">
              {key} : {log.butins[key]}
            </div>
          );
        })}
    </div>
  );
}

/*
log = {
  text: "init" | "rollCompt" | "turn" | "rollArme" | end | basic | loots,
  type: string,
}
*/

function LogLogic({ log }: any) {
  switch (log.type) {
    case "init":
      // initialisation du combat
      return <div className="font-bold">Début du combat !</div>;
    case "rollCompt":
      // jet de competence
      return (
        <RolledCompetencePopover unit={log.unit} rollData={log.rollData} />
      );
    case "rollArme":
      // jet d'arme
      return <RolledArmePopover unit={log.unit} rollData={log.rollData} />;
    case "loots":
      return <Loots log={log.log} />;
    case "turn":
      return <div className="underline py-2">{log.text}</div>;
    default:
      return <div className="ml-2">{log.text}</div>;
  }
}

export default function Fight({
  activeEncounter,
  updateEncounter,
}: {
  activeEncounter: EncounterInterface;
  updateEncounter: Function;
}) {
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    if (activeEncounter.logs?.length > 0) {
      setLogs(activeEncounter.logs);
    } else {
      setLogs([
        {
          type: "init",
          text: "Début du combat !",
        },
        {
          type: "turn",
          text: `Début du tour de ${
            activeEncounter.rolledFighters[activeEncounter.activeIndex].Nom
          } (#${activeEncounter.activeIndex + 1})`,
        },
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onBlurChange = (value: number, head: string, row: any) => {
    let texte = "";
    if (value > row[head]) {
      // gain
      texte = `${row.Nom} a gagné ${value - row[head]} ${head}`;
    } else {
      // perte
      texte = `${row.Nom} a perdu ${row[head] - value} ${head}`;
    }
    // setLogs([...logs, texte]);
    const newValue = {
      ...activeEncounter,
      logs: [
        ...logs,
        {
          type: "basic",
          text: texte,
        },
      ],
      rolledFighters: activeEncounter.rolledFighters.map((u) => {
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

  function nextUnit() {
    let newIndex =
      (activeEncounter.activeIndex + 1) % activeEncounter.rolledFighters.length;
    let newUnit = activeEncounter.rolledFighters[newIndex];
    while (newUnit.PS <= 0) {
      newIndex = (newIndex + 1) % activeEncounter.rolledFighters.length;
      newUnit = activeEncounter.rolledFighters[newIndex];
    }
    let texte = `Début du tour de ${newUnit.Nom} (#${newIndex + 1})`;
    updateEncounter({
      ...activeEncounter,
      activeIndex: newIndex,
      logs: [
        ...logs,
        {
          type: "turn",
          text: texte,
        },
      ],
    });
  }

  function endFight() {
    var resultat: LootInterface = {
      recompense: 0,
      deads: 0,
      butins: {},
    };
    activeEncounter.rolledFighters.forEach((u) => {
      if (u.PS <= 0) {
        resultat.deads += 1;
        resultat.recompense += Number(
          u.Data["Récompense"].replace(" couronnes", "").replace(/ /g, "")
        );
        console.log(
          u.Data["Récompense"].replace(" couronnes", "").replace(/ /g, "")
        );
        u.Data.Butins.forEach((b: any) => {
          if (resultat.butins[b]) {
            resultat.butins[b] += 1;
          } else {
            resultat.butins[b] = 1;
          }
        });
      }
    });
    console.log(resultat);
    if (resultat.deads > 0) {
      console.log("Combat fini avec les morts :", resultat.deads);
      setLogs([...logs, { type: "loots", log: resultat }]);
    } else {
      setLogs([...logs, { type: "loots", log: resultat }]);
    }
  }

  return (
    <div>
      <h3>Phase de combat</h3>
      <div className="flex flex-1">
        <div className="p-6 w-2/3">
          <Table
            heads={["Active", "Initiative", "Groupe", "Nom", "PS", "END"]}
            rows={activeEncounter.rolledFighters}
            active_index={activeEncounter.activeIndex}
            onBlurChange={onBlurChange}
            addText={(u: any) => {
              setLogs([...logs, u]);
            }}
          />
        </div>
        <div className="inline-block h-auto min-h-[1em] w-0.5 self-stretch border border-solid rounded-md border-gray-400 bg-neutral-100 dark:bg-white/10"></div>
        <div className="p-6 w-1/3">
          <div className="text-xl underline italic font-bold">
            Rapport de bataille:
          </div>
          <div style={{ maxHeight: "80vh" }}>
            {logs.map((e) => (
              <LogLogic log={e} key={nanoid()} />
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-around m-2">
        <button
          type="button"
          className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          onClick={() => {
            nextUnit();
          }}
        >
          Fin du Tour
        </button>
        <button
          type="button"
          onClick={() => {
            endFight();
          }}
          className="text-gray-900 bg-gray-200 border border-gray-300 focus:outline-none hover:bg-gray-300 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          Fin du Combat
        </button>
      </div>
    </div>
  );
}
