import { useRef, useMemo, useState } from 'react';

import {
  Heading,
  Center,
  Button,
  Text,
  VStack,
  Wrap,
  WrapItem,
  useToast,
} from '@chakra-ui/react';

import ButtonGroup from '@/component/fiche/buttons';
import { FormObject } from '@/component/fiche/form';
import { ComptNumber } from '@/component/fiche/form/number';
import { finalCheck } from '@/component/fiche/toast';
import competences from '@/public/assets/json/fiche/competence.json';

const CopyCompt: any = competences;

function MyCompt({ id, check }: any) {
  if (CopyCompt[id]) {
    const e = CopyCompt[id];
    return (
      <ComptNumber
        data={{
          min: e.complexe ? 2 : 1,
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
/*
const exempleCompt = [
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
export default function Sample(props: any) {
  const {
    stepslength,
    activeStep,
    prevStep,
    nextStep,
    updateData,
    max = 44,
    compt,
    exclusive,
  } = props;
  const myForm = useRef(null);
  const [sums, setS] = useState(max);
  const points = useMemo(() => Number(sums), [sums]);
  const toast = useToast();

  const check = () => {
    const form: any = myForm.current;
    let sum = 0;
    setTimeout(() => {
      // eslint-disable-next-line no-return-assign
      compt.forEach((e: any) => (sum += Number(form[e].value)));
      sum += Number(form.EXC.value);
      setS(Number(max) - Number(sum));
    }, 1);
  };

  const myCompts = compt.map((e: any) => (
    <WrapItem key={`step4_${e}`}>
      <MyCompt id={e} check={check} />
    </WrapItem>
  ));

  function handleSubmit(event: any) {
    event.preventDefault();
    if (finalCheck(toast, points) === true) {
      const form = FormObject(event.target);
      updateData('etape4', form);
      nextStep();
    }
  }
  return (
    <VStack py={4} spacing={2}>
      <Heading>Compétences Professionnelles</Heading>
      <Text fontSize={'sm'}>
        * compétence complexe qui nécessite 2 points d&apos;expériences pour
        l&apos;augmenter de 1.
      </Text>
      <form ref={myForm} onSubmit={handleSubmit}>
        <Wrap px={4} spacing="30px" justify="center">
          {myCompts}
          <WrapItem>
            <ComptNumber
              data={{
                min: 1,
                nom: 'EXC',
                label: exclusive.nom,
                desc: exclusive.desc,
                complexe: exclusive.complexe,
                update: check,
              }}
            />
          </WrapItem>
        </Wrap>
        <Center>
          <Button
            colorScheme={points === 0 ? 'teal' : 'red'}
            size="lg"
            variant="outline"
          >
            <Heading>{points}</Heading>
          </Button>
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
