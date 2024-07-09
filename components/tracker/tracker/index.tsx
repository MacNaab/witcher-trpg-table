"use client";
import Heading from "@/components/typographie/heading";
import { db, EncounterInterface } from "@/db/data";
import { useLiveQuery } from "dexie-react-hooks";
import Fight from "./fight";
import Planning from "./planning";
import { useEffect, useState } from "react";

export default function Home({
  activeEncounterID,
}: {
  activeEncounterID: number;
}) {
  const activeEncounter : any = useLiveQuery(async () => {
    const encounters = await db.encounters
      .where("id")
      .equals(activeEncounterID)
      .toArray();
    // Return result
    return encounters[0];
  });
  const [encounter, setEncounter] = useState<EncounterInterface>()
  useEffect(() => {
    setEncounter(activeEncounter)
  }, [activeEncounter])

  function Logic(){
    if(encounter){
      if(encounter.Rolled){
        return <Fight activeEncounter={encounter} updateEncounter={editEncounter} />
      }else{
        return <Planning activeEncounter={encounter} updateEncounter={editEncounter} />
      }
    }
    return (<></>)
  }
  
  async function editEncounter(new_value: EncounterInterface) {
    try {
      // Add the new friend!
      await db.encounters.update(activeEncounter.id, { ...new_value });
    } catch (error) {
      console.log(`Failed to edit ${activeEncounter.id}: ${error}`);
    }
  }

  return (
    <div>
      <Heading level={2}>{activeEncounter?.Nom}</Heading>
      <Logic />
    </div>
  );
}
