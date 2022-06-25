/* eslint-disable no-nested-ternary */
import { useState } from 'react';

import { VStack, Wrap, WrapItem, Heading } from '@chakra-ui/react';

import ButtonGroup from '@/component/fiche/buttons';
import MyForm, { FormObject } from '@/component/fiche/form';
import { CtrlNumber } from '@/component/fiche/form/number';
import Select from '@/component/fiche/form/select';
import Event from '@/component/fiche/histoire/event';
import parcours from '@/public/assets/json/fiche/parcours_sorceleur.json';

function Decade(props: any) {
  const { age = 20 } = props;
  // décade
  const d = Math.floor((age - 11) / 10);
  return (
    <Wrap pt={2} pb={4} spacing="30px" justify="center">
      {[...Array(d > 0 ? d : 1)].map((elem, index) => (
        <WrapItem key={`WrapItem_decade#${index}`}>
          <MyForm
            data={{
              name: `decade_${index}`,
              type: 'select',
              label:
                'Comment avez-vous choisi de passer la majorité de cette décennie ?',
              options: [
                {
                  nom: 'Prudent',
                  desc: '10% Danger ; 10% Bénéfices ; 10% Allié ; 10% Chasse',
                },
                {
                  nom: 'Normal',
                  desc: '25% Danger ; 10% Bénéfices ; 10% Allié ; 10% Chasse',
                },
                {
                  nom: 'Non-neutre',
                  desc: '50% Danger ; 10% Bénéfices ; 10% Allié ; 30% Chasse',
                },
                {
                  nom: 'Risqué',
                  desc: '75% Danger ; 50% Bénéfices ; 20% Allié ; 20% Chasse',
                },
              ],
            }}
          />
        </WrapItem>
      ))}
    </Wrap>
  );
}

export default function Sample(props: any) {
  const { stepslength, activeStep, prevStep, nextStep, updateData } = props;

  const [age, setAge] = useState(20);

  function handleSubmit(event: any) {
    event.preventDefault();
    const form = FormObject(event.target);
    form.events = [];
    Object.keys(form).forEach((e) => {
      if (e.includes('decade')) {
        const ev = Event('Sorceleur', form[e]);
        form.events.push(ev);
      }
    });
    updateData('etape2', form);
    nextStep();
  }
  return (
    <VStack py={4} spacing={2}>
      <form onSubmit={handleSubmit}>
        <Heading>Parcours d&apos;un sorceleur:</Heading>
        <Wrap pt={4} pb={2} spacing="30px" justify="center">
          <WrapItem>
            <Select
              data={{
                name: 'ageSorceleur',
                type: 'select',
                label: 'Quand êtes-vous devenu un sorceleur?',
                options: parcours.age,
              }}
            />
          </WrapItem>
          <WrapItem>
            <Select
              data={{
                name: 'ecole',
                type: 'select',
                label: 'Dans quelle école avez-vous été formé?',
                options: parcours.ecole,
              }}
            />
          </WrapItem>
        </Wrap>
        <Heading>Formation :</Heading>
        <Wrap pt={2} pb={2} spacing="30px" justify="center">
          <WrapItem>
            <Select
              data={{
                name: 'formation',
                type: 'select',
                label: "Comment s'est passée votre formation?",
                options: parcours.event,
              }}
            />
          </WrapItem>
          <WrapItem>
            <Select
              data={{
                name: 'déroulement',
                type: 'select',
                label: 'Comment se sont déroulées vos épreuves?',
                options: parcours.deroulement,
              }}
            />
          </WrapItem>
        </Wrap>
        <Heading>Evénements :</Heading>
        <Wrap pt={2} pb={2} spacing="30px" justify="center">
          <WrapItem>
            <Select
              data={{
                name: 'important',
                type: 'select',
                label: 'Quel a été l’événement le plus important pour vous?',
                options: parcours.important,
              }}
            />
          </WrapItem>
          <WrapItem>
            <Select
              data={{
                name: 'present',
                type: 'select',
                label: 'Où êtes-vous à présent?',
                options: parcours.present,
              }}
            />
          </WrapItem>
        </Wrap>
        <Heading>Décennies :</Heading>
        <Wrap pt={2} pb={4} spacing="30px" justify="center">
          <WrapItem>
            <CtrlNumber
              data={{
                name: 'age',
                type: 'number',
                label: 'Âge du personnage',
                min: 20,
              }}
              setState={setAge}
            />
          </WrapItem>
        </Wrap>

        <Decade age={age} />

        <ButtonGroup
          stepslength={stepslength}
          activeStep={activeStep}
          prevStep={prevStep}
        />
      </form>
    </VStack>
  );
}
