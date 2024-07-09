"use client";
import React, { useState } from "react";
import { db, db_units_reset } from "@/db/data";
import { useLiveQuery } from "dexie-react-hooks";

export function FriendList() {
  const friends = useLiveQuery(() => db.units.toArray());

  return (
    <div>
        <ul>
      {friends?.map((friend) => (
        <li key={friend.id}>
          {friend.Nom}, {friend.Categorie}
        </li>
      ))}
    </ul>
    <ul>
      {friends?.map((friend) => (
        <li key={friend.id+10598841}>
          {JSON.stringify(friend)}
        </li>
      ))}
    </ul>
    </div>
  );
}

export function AddFriendForm() {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");

  async function addFriend() {
    try {
      // Add the new friend!
      const id = await db.units.add({
        Nom: name,
        Menace: "string",
        Récompense: "string",
        Armure: "string",
        Taille: "string",
        Poids: "string",
        Environnement: "string",
        Intelligence: "string",
        Organisation: "string",
        Caract: "any",
        Compt: "any",
        Arme: [],
        Butins: [],
        Vulnérabilités: [],
        Capacités: [],
        Note: "string",
        Source: "string",
        Categorie: "string",
      });

      setStatus(`Friend ${name} successfully added. Got id ${id}`);
      setName("");
    } catch (error) {
      setStatus(`Failed to add ${name}: ${error}`);
    }
  }

  return (
    <>
      <p>{status}</p>
      Name:
      <input
        type="text"
        value={name}
        onChange={(ev) => setName(ev.target.value)}
      />
      <button onClick={addFriend}>Add</button>
    </>
  );
}

export default function Test() {
  return (
    <div style={{ maxWidth: "100vw", overflow: "auto" }} >
      <AddFriendForm />
      <FriendList />
      <button onClick={db_units_reset}>Reset</button>
    </div>
  );
}
