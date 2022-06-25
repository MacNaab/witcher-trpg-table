/* eslint-disable no-nested-ternary */
import { useState } from 'react';

import { VStack, Wrap, WrapItem, Heading } from '@chakra-ui/react';

import ButtonGroup from '@/component/fiche/buttons';
import MyForm, { FormObject } from '@/component/fiche/form';
import Select, { CtrlSelect } from '@/component/fiche/form/select';
import Event from '@/component/fiche/histoire/event';
import parcours from '@/public/assets/json/fiche/parcours.json';

export default function Sample(props: any) {
  const { stepslength, activeStep, prevStep, nextStep, myData, updateData } =
    props;
  const { race } = myData;
  const [region, setRegion] = useState('');
  let patrieList = [
    {
      nom: 'Royaumes du Nord',
      desc: 'Le personnage est originaire des Royaumes du Nord',
    },
    {
      nom: 'Nilfgaard',
      desc: 'Le personnage est originaire de Nilfgaard',
    },
    {
      nom: 'Terres Ancestrales',
      desc: 'Le personnage est originaire des Terres Ancestrales',
    },
  ];
  if (race === 'Elfe' || race === 'Nain') {
    patrieList = [
      {
        nom: 'Terres Ancestrales',
        desc: 'Le personnage est originaire des Terres Ancestrales',
      },
    ];
    // setRegion('Terres Ancestrales');
  }
  if (race === 'Humain') {
    patrieList = [
      {
        nom: 'Royaumes du Nord',
        desc: 'Le personnage est originaire des Royaumes du Nord',
      },
      {
        nom: 'Nilfgaard',
        desc: 'Le personnage est originaire de Nilfgaard',
      },
    ];
  }
  const optionsList: any = {
    patrie: null,
    destinF: null,
    destinP: null,
    situation: null,
    mentor: null,
  };
  const arr: any = parcours;
  const keyList = ['patrie', 'destinF', 'destinP', 'situation', 'mentor'];
  if (region === 'Royaumes du Nord') {
    // eslint-disable-next-line func-names
    keyList.forEach(function (e: any) {
      optionsList[e] = arr[e].nord;
    });
  }
  if (region === 'Nilfgaard') {
    // eslint-disable-next-line func-names
    keyList.forEach(function (e: any) {
      optionsList[e] = arr[e].nilfgaard;
    });
  }
  if (region === 'Terres Ancestrales') {
    // eslint-disable-next-line func-names
    keyList.forEach(function (e: any) {
      optionsList[e] = arr[e].ancien;
    });
  }

  const [fam, setFam] = useState('');
  const [parent, setPar] = useState('');

  function handleSubmit(event: any) {
    event.preventDefault();
    const form = FormObject(event.target);
    form.events = [];
    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < Math.floor(form.age / 10); index++) {
      form.events.push(Event());
    }
    updateData('etape2', form);
    nextStep();
  }
  return (
    <VStack py={4} spacing={2}>
      <form onSubmit={handleSubmit}>
        <Heading>Patrie :</Heading>
        <Wrap pt={4} pb={2} spacing="30px" justify="center">
          <WrapItem>
            <CtrlSelect
              data={{
                name: 'region',
                type: 'select',
                label: 'Région du personnage',
                options: patrieList,
              }}
              setState={setRegion}
            />
          </WrapItem>
          <WrapItem>
            <Select
              data={{
                name: 'origine',
                type: 'select',
                label: 'Royaume du personnage',
                options: optionsList.patrie,
              }}
            />
          </WrapItem>
        </Wrap>
        <Heading>Situation familiale :</Heading>
        <Wrap pt={2} pb={2} spacing="30px" justify="center">
          <WrapItem>
            <CtrlSelect
              data={{
                name: 'famille',
                type: 'select',
                label: 'Situation familial',
                options: [
                  {
                    nom: 'Certain sont encore en vie',
                    desc: '',
                  },
                  {
                    nom: 'Quelque chose est arrivé...',
                    desc: '',
                  },
                ],
              }}
              setState={setFam}
            />
          </WrapItem>
          {fam === 'Certain sont encore en vie' ? (
            <WrapItem>
              <CtrlSelect
                data={{
                  name: 'parent',
                  type: 'select',
                  label: 'Statut parental',
                  options: [
                    {
                      nom: 'Vivants',
                      desc: '',
                    },
                    {
                      nom: 'Morts',
                      desc: '',
                    },
                  ],
                }}
                setState={setPar}
              />
            </WrapItem>
          ) : (
            <WrapItem>
              <Select
                data={{
                  name: 'destin_familial',
                  type: 'select',
                  label: 'Destin familial',
                  options: optionsList.destinF,
                }}
              />
            </WrapItem>
          )}
          {fam === 'Certain sont encore en vie' ? (
            parent === 'Vivants' ? (
              <WrapItem>
                <Select
                  data={{
                    name: 'statut_familial',
                    type: 'select',
                    label: 'Statut familial',
                    options: optionsList.situation,
                  }}
                />
              </WrapItem>
            ) : (
              <WrapItem>
                <Select
                  data={{
                    name: 'destin_parental',
                    type: 'select',
                    label: 'Destin parental',
                    options: optionsList.destinP,
                  }}
                />
              </WrapItem>
            )
          ) : null}
          <WrapItem>
            <Select
              data={{
                name: 'mentor',
                type: 'select',
                label: 'Mentor',
                options: optionsList.mentor,
              }}
            />
          </WrapItem>
          <WrapItem>
            <MyForm
              data={{
                name: 'fratrie',
                type: 'number',
                label: 'Fratrie',
                min: 0,
                max: 8,
              }}
            />
          </WrapItem>
        </Wrap>
        <Heading>Evénements :</Heading>
        <Wrap pt={2} pb={4} spacing="30px" justify="center">
          <WrapItem>
            <MyForm
              data={{
                name: 'age',
                type: 'number',
                label: 'Âge du personnage',
                min: 20,
              }}
            />
          </WrapItem>
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
