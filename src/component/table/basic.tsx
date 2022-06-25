/* eslint-disable consistent-return */
import { useState } from 'react';

import {
  Stack,
  Heading,
  Text,
  Divider,
  Center,
  Button,
} from '@chakra-ui/react';

function Erreur() {
  return (
    <Center>
      <Text>
        Une erreur est survenue lors du chargement de la table aléatoire.
      </Text>
    </Center>
  );
}

function Source({ table }: any) {
  return (
    <Text>
      Source:{' '}
      <a href={table.Auteur.lien} target="_blank" rel="noreferrer">
        {table.Auteur.nom}
      </a>
    </Text>
  );
}

function Vierge({ keys }: any) {
  return (
    <Stack>
      {keys.map((e: string) => (
        <Text key={`V_${e}`}>{e}</Text>
      ))}
    </Stack>
  );
}

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

function Valide(props: any) {
  const { table } = props;
  const keys = Object.keys(table).map((e) => e);
  keys.pop(); // supprime la dernière entrée = Auteur
  const [state, setState] = useState<any>({});
  const gen = () => {
    const o: any = {};
    keys.forEach((e) => {
      const t = table[e];
      const r = getRandomInt(t.length);
      o[e] = t[r];
    });
    setState(o);
  };
  function Aff() {
    if (keys.length > 1) {
      const list = keys.map((e) => (
        <Text className="text-justify" key={e}>
          <b>{e}:</b> {state[e]}
        </Text>
      ));
      return <Stack spacing={2}>{list}</Stack>;
    }
    if (keys[0]) {
      return <Text className="text-justify"> {state[keys[0]]} </Text>;
    }
    return null;
  }

  return (
    <Stack spacing={4}>
      <Center>
        <Button onClick={gen} colorScheme="teal" size="lg">
          Générer
        </Button>
      </Center>
      {state[keys[0] || 'test'] ? <Aff /> : <Vierge keys={keys} />}
    </Stack>
  );
}

export default function base(props: any) {
  const { data, table } = props;
  return (
    <Stack spacing={6}>
      <Heading>{data.nom}</Heading>
      <Text>{data.description}</Text>
      {table ? <Source table={table} /> : null}
      <Center>
        <Divider maxWidth="75%" />
      </Center>
      {!table ? <Erreur /> : <Valide table={table} />}
    </Stack>
  );
}
