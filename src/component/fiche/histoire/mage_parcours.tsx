import { Text } from '@chakra-ui/react';

import parcours from '@/public/assets/json/fiche/parcours_mage.json';

function getAcademia(nom: string) {
  switch (nom) {
    case 'Académie mineure':
      return 'Minor';
    case 'Aretuza':
      return 'Aretuza';
    case 'Ban Ard':
      return 'Ban Ard';
    default:
      return 'Gweison Haul';
  }
}

export default function Parcours({ data }: any) {
  const discover = parcours.discover.find((f: any) => f.nom === data.discover);
  const academia = getAcademia(data.school);
  return (
    <div className="mx-3">
      <Text>
        <b>Lieu de naissance: </b>
        {data.region}. <b>Famille: </b>
        {`${data.familySize}, ${data.familyPersonality}, situation: ${data.familyStatus}`}
        .
      </Text>
      <Text>
        <b>Découverte de la magie: </b>
        {data.discover}
        <br />
        {`${discover?.desc} ${data.react}`}
      </Text>
      <Text>
        <b>École: </b>
        {data.school}
        {data.school === 'Académie mineure' ? `. ${parcours.school.minor}` : ''}
        <div className="mx-3">
          <b>{parcours.academia[academia].title}: </b>
          {parcours.academia[academia].desc}
        </div>
      </Text>
      <Text>
        <b>{data.life}: </b>
        {parcours.life[academia].find((f: any) => f.nom === data.life)?.desc}
      </Text>
      <Text>
        {data.apprenti ? 'Vous êtiez un apprenti.' : ''}
        <br />
        <b>Mentor: </b>
        {data.mentorPersonality}, aime: {data.mentorValue}, tenue vestimentaire:{' '}
        {data.mentorClothing}, déteste: {data.mentorHatred}, {data.mentorStyle}.
        {data.mentorMoment}. {data.mentorEnd}.
      </Text>
    </div>
  );
}
