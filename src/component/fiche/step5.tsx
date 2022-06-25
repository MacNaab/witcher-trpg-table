import { useRef, useMemo, useState } from 'react';

import {
  Heading,
  Center,
  Button,
  Text,
  VStack,
  Wrap,
  WrapItem,
  Tooltip,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useToast,
} from '@chakra-ui/react';

import ButtonGroup from '@/component/fiche/buttons';
import { FormObject } from '@/component/fiche/form';
import { ComptNumber } from '@/component/fiche/form/number';
import { finalCheck } from '@/component/fiche/toast';
import competences from '@/public/assets/json/fiche/competence.json';
import { ComptFromCaract } from '@/utils/AppConfig';

const CopyCompt: any = competences;
/*
const ExempleCompt = [
  'DED',
  'ETI',
  'NEG',
  'SUR',
  'LAM',
  'CHA',
  'PSY',
  'ALC',
  'COU',
  'RCO',
];
*/
function MyCompt({ id, compts, check }: any) {
  if (compts.includes(id)) {
    return null;
  }
  if (CopyCompt[id]) {
    const e = CopyCompt[id];
    return (
      <ComptNumber
        data={{
          nom: id,
          label: e.nom,
          desc: e.desc,
          complexe: e.complexe,
          update: check,
        }}
      />
    );
  }
  return null;
}

function RenderMyCompt({ id, compts, check }: any) {
  const n: any = ComptFromCaract;
  if (n[id]) {
    return (
      <Wrap px={4} spacing="30px" justify="center">
        {n[id]?.map((e: any) => (
          <WrapItem key={`${id}_${e}`}>
            <MyCompt id={e} compts={compts} check={check} />
          </WrapItem>
        ))}
      </Wrap>
    );
  }
  return <></>;
}

const CaractList = [
  { id: 'INT', tooltip: 'Intelligence' },
  { id: 'REF', tooltip: 'Réflexes' },
  { id: 'DEX', tooltip: 'Dextérité' },
  { id: 'COR', tooltip: 'Corps' },
  { id: 'EMP', tooltip: 'Empathie' },
  { id: 'TEC', tooltip: 'Technique' },
  { id: 'VOL', tooltip: 'Volonté' },
];
const myTabList = CaractList.map((e) => (
  <Tooltip key={`myTabList_${e.id}`} aria-label="A tooltip" label={e.tooltip}>
    <Tab>{e.id}</Tab>
  </Tooltip>
));

export default function Sample(props: any) {
  const {
    stepslength,
    activeStep,
    prevStep,
    nextStep,
    updateData,
    compts,
    max = 10,
  } = props;

  const myForm = useRef(null);
  const [sums, setS] = useState(max);
  const points = useMemo(() => Number(sums), [sums]);
  const toast = useToast();

  const check = () => {
    const form: any = myForm.current;
    let sum = 0;
    setTimeout(() => {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < form.length; i++) {
        const n = form[i].name;
        if (n) {
          const v = form[i].value;
          if (v) {
            sum += Number(v);
          }
        }
      }
      setS(Number(max) - Number(sum));
    }, 1);
  };

  const myTabPanels = CaractList.map((e) => (
    <TabPanel key={`myTabPanels_${e.id}`}>
      <RenderMyCompt id={e.id} compts={compts} check={check} />
    </TabPanel>
  ));

  function handleSubmit(event: any) {
    event.preventDefault();
    if (finalCheck(toast, points) === true) {
      const form = FormObject(event.target);
      updateData('etape5', form);
      nextStep();
    }
  }
  return (
    <VStack py={4} spacing={2}>
      <Heading>Compétences acquises</Heading>
      <Text fontSize={'sm'}>
        * compétence complexe qui nécessite 2 points d&apos;expériences pour
        l&apos;augmenter de 1.
      </Text>
      <form onSubmit={handleSubmit} ref={myForm}>
        <Tabs py={2}>
          <TabList>{myTabList}</TabList>
          <TabPanels>{myTabPanels}</TabPanels>
        </Tabs>
        <Center>
          <Button
            colorScheme={points === 0 ? 'teal' : 'red'}
            size="lg"
            variant="outline"
          >
            <Heading>{points}</Heading>
          </Button>
        </Center>
        <Center>
          <Text fontSize={'sm'}>
            Le nombre de points dont vous disposez pour les compétences acquises
            est égal à votre valeur d’Intelligence + Réflexes.
          </Text>
        </Center>

        <Text fontSize={'xs'}>
          Niveau de maîtrise en fonction des points de Compétences:
          <br />
          1-2 Inapte ; 3-4 Commun ; 5-6 Compétent ; 7-8 Héroïque ; 9-10
          Incroyable ; 11-12 Légendaire ; 13 Mythique
        </Text>
        <ButtonGroup
          stepslength={stepslength}
          activeStep={activeStep}
          prevStep={prevStep}
        />
      </form>
    </VStack>
  );
}
