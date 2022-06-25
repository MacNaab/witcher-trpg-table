import { Text } from '@chakra-ui/react';

import parcours from '@/public/assets/json/fiche/parcours_sorceleur.json';

function getData(type: any, value: any) {
  const clone: any = parcours;
  const find = clone[type].find((e: any) => e.nom === value);
  return find;
}

export default function Parcours({ data }: any) {
  const age = getData('age', data.ageSorceleur);
  const ecole = getData('ecole', data.ecole);
  const formation = getData('event', data.formation);
  const déroulement = getData('deroulement', data.déroulement);
  const important = getData('important', data.important);
  const present = getData('present', data.present);
  return (
    <div className="mx-3">
      <Text>
        <b>{age.nom}: </b>
        {age.desc}
        <br />
        <b>{ecole.nom}: </b>
        {ecole.desc}
        <br />
        <b>{formation.nom}: </b>
        {formation.desc}
        <br />
        <b>{déroulement.nom}: </b>
        {déroulement.desc}
        <br />
        <b>{important.nom}: </b>
        {important.desc}
        <br />
        <b>{present.nom}: </b>
        {present.desc}
      </Text>
    </div>
  );
}
