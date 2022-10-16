/* eslint-disable @typescript-eslint/naming-convention */
import { Text } from '@chakra-ui/react';

import parcours from '@/public/assets/json/fiche/parcours.json';

function getID(region: any) {
  if (region === 'Royaumes du Nord') {
    return 'nord';
  }
  if (region === 'Nilfgaard') {
    return 'nilfgaard';
  }
  return 'ancien';
}

function getData(type: any, id: any, value: any) {
  const clone: any = parcours;
  const find = clone[type][id].find((e: any) => e.nom === value);
  return find;
}

export default function Sample({ data }: any) {
  const myID = getID(data.region);
  let destin_familial: any = '';
  if (data.destin_familial) {
    destin_familial = getData('destinF', myID, data.destin_familial);
  }
  let statut_familial: any = '';
  if (data.statut_familial) {
    statut_familial = getData('situation', myID, data.statut_familial);
  }
  let destin_parental: any = '';
  if (data.destin_parental) {
    destin_parental = getData('destinP', myID, data.destin_parental);
  }
  const mentor = getData('mentor', myID, data.mentor);
  return (
    <div className="mx-3">
      <Text>
        <b>Origine: </b>
        {data.origine} ({data.region})
      </Text>
      <Text as="div">
        <b>Famille: </b>
        <div className="mx-3">
          {data.famille}
          <br />
          {destin_familial ? (
            <Text>
              <b>{destin_familial.nom}</b> {destin_familial.desc}
            </Text>
          ) : null}
          {statut_familial ? (
            <Text>
              <b>{statut_familial.nom}</b> {statut_familial.desc} Objet:{' '}
              {statut_familial.objet}
            </Text>
          ) : null}
          {destin_parental ? (
            <Text>
              <b>{destin_parental.nom}</b> {destin_parental.desc}
            </Text>
          ) : null}
          Fratrie: {data.fratrie}
        </div>
      </Text>
      <Text>
        <b>Mentor: </b>
        {mentor.nom}
        <div className="mx-3">
          {mentor.desc}
          <br />
          Objet: {mentor.objet}
        </div>
      </Text>
    </div>
  );
}
