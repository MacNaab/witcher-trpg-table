"use client";
import Heading from "@/components/typographie/heading";
import BottomNavigation from "@/components/tracker/bottomNavigation";
import { db } from "@/db/data";
import { useLiveQuery } from "dexie-react-hooks";
import Index from "@/components/tracker/tracker/index";

export default function Home() {
  const friends = useLiveQuery(() => db.active_encounter.toArray());
  function Logic() {
    if (friends && friends?.length > 0) {
      return <Index activeEncounterID={friends[0].activeEncounter} />;
    }
    return (
      <div>
        <Heading level={2}>Aucune rencontre selectionnée</Heading>
        <p className="mt-4 ml-2 italic">
          Veiller sélectionner une rencontre dans la barre de navigation &quot;Home&quot;.          
        </p>
      </div>
    );
  }
  return (
    <main className="flex flex-col pb-24 pt-1 px-8">
      <BottomNavigation active={1} />
      <Logic />
    </main>
  );
}
