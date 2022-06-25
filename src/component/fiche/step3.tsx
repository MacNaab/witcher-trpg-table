import { useRef, useState } from 'react';

import {
  Heading,
  VStack,
  HStack,
  Select,
  Wrap,
  WrapItem,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Text,
  Center,
  Button,
  useToast,
} from '@chakra-ui/react';

import ButtonGroup from '@/component/fiche/buttons';
import { FormObject } from '@/component/fiche/form';
import { CaractNumber } from '@/component/fiche/form/number';
import { finalCheck } from '@/component/fiche/toast';
import caractList from '@/public/assets/json/fiche/caract.json';

function MySelect({ setState }: any) {
  const handleChange = (event: any) => {
    const { value } = event.target;
    setState(value);
  };
  return (
    <Select
      placeholder={'Niveau de jeu'}
      minWidth={210}
      onChange={handleChange}
    >
      <option value={60}>Moyen</option>
      <option value={70}>Expérimenté</option>
      <option value={75}>Héroïque</option>
      <option value={80}>Légendaire</option>
    </Select>
  );
}

function MyNumber({ setState, value }: any) {
  const handleChange = (e: any) => {
    setState(e);
  };
  return (
    <HStack>
      <Text fontSize="sm">Points à dépenser:</Text>
      <NumberInput w={125} value={value} onChange={handleChange}>
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </HStack>
  );
}

export default function Sample(props: any) {
  const { stepslength, activeStep, prevStep, nextStep, updateData } = props;
  const myForm = useRef(null);
  const [max, setM] = useState(70);
  const [points, setP] = useState(Number(70 - 9));
  const toast = useToast();

  const check = (n = 0) => {
    const form: any = myForm.current;
    const list = [
      'INT',
      'REF',
      'DEX',
      'COR',
      'VIT',
      'EMP',
      'TECH',
      'VOL',
      'CHA',
    ];
    let sum = 0;
    setTimeout(() => {
      // eslint-disable-next-line no-return-assign
      list.forEach((e: any) => (sum += Number(form[e].value)));
      setP(Number(n !== 0 ? n : max) - Number(sum));
    }, 1);
  };

  function updateMax(n: any) {
    setM(n);
    check(n);
  }

  function handleSubmit(event: any) {
    event.preventDefault();
    if (finalCheck(toast, points) === true) {
      const form = FormObject(event.target);
      updateData('etape3', form);
      nextStep();
    }
  }
  return (
    <VStack py={4} spacing={2}>
      <Heading>Caractéristiques</Heading>
      <HStack spacing={4}>
        <MyNumber setState={updateMax} value={max} />
        <MySelect setState={updateMax} />
      </HStack>
      <form ref={myForm} onSubmit={handleSubmit}>
        <Wrap px={4} spacing="30px" justify="center">
          {caractList.map((e) => (
            <WrapItem key={e.id}>
              <CaractNumber
                data={{ nom: e.id, label: e.nom, desc: e.desc, update: check }}
              />
            </WrapItem>
          ))}
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
          Niveau de maîtrise en fonction des points de Caractéristiques:
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
