// informations
import { useState } from 'react';

import { VStack, Wrap, WrapItem, Heading } from '@chakra-ui/react';

import ButtonGroup from '@/component/fiche/buttons';
import MyForm, { FormObject } from '@/component/fiche/form';
import Select, { CtrlSelect } from '@/component/fiche/form/select';
import proList from '@/public/assets/json/fiche/profession.json';
import raceList from '@/public/assets/json/fiche/race.json';

const cpnts = [
  {
    name: 'joueur',
    type: 'input',
    label: 'Prénom du joueur',
  },
  {
    name: 'personnage',
    type: 'input',
    label: 'Prénom, nom ou surnom du personnage',
  },
  {
    name: 'sexe',
    type: 'select',
    label: 'Sexe du personnage',
    options: [
      {
        nom: 'Homme',
        desc: 'Personnage de sexe masculin',
      },
      {
        nom: 'Femme',
        desc: 'Personnage de sexe féminin',
      },
    ],
  },
  {
    name: 'race',
    type: 'select',
    label: 'Race du personnage',
    options: raceList,
  },
  {
    name: 'profession',
    type: 'select',
    label: 'Profession du personnage',
  },
];

export default function Sample(props: any) {
  const { stepslength, activeStep, prevStep, nextStep, updateData } = props;
  const [race, setRace] = useState('');
  const [isPro, setPro] = useState(true);

  function pro() {
    if (race === 'Sorceleur' || race === 'Vampire') {
      if (isPro) {
        setPro(false);
      }
    } else if (!isPro) {
      setPro(true);
    }
    if (race === 'Halfelin') {
      const invalide = ['Mage', 'Prêtre'];
      const newList = proList.filter((e) => !invalide.includes(e.nom));
      return newList;
    }
    return proList;
  }
  const proCpnt = {
    name: 'profession',
    type: 'select',
    label: 'Profession du personnage',
    options: pro(),
  };

  function handleSubmit(event: any) {
    event.preventDefault();
    const form = FormObject(event.target);
    if (!form.profession) {
      form.profession = form.race;
      form.data = raceList.find((e) => e.nom === form.race);
    } else {
      form.data = proList.find((e) => e.nom === form.profession);
    }
    updateData('etape1', form);
    nextStep();
  }

  return (
    <VStack py={4} spacing={2}>
      <Heading>Personnage</Heading>
      <form onSubmit={handleSubmit}>
        <Wrap px={4} spacing="30px" justify="center">
          {cpnts.map((e) => {
            if (e.name === 'race' || e.name === 'profession') {
              return null;
            }
            return (
              <WrapItem key={e.name}>
                <MyForm data={e} />
              </WrapItem>
            );
          })}
          <WrapItem>
            <CtrlSelect data={cpnts[3]} setState={setRace} />
          </WrapItem>
          {isPro ? (
            <WrapItem>
              <Select data={proCpnt} />
            </WrapItem>
          ) : null}
        </Wrap>
        <ButtonGroup
          stepslength={stepslength}
          activeStep={activeStep}
          prevStep={prevStep}
        />
      </form>
    </VStack>
  );
}
