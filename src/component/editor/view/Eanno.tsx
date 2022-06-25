import { useEffect, useRef } from 'react';

import { PlusSquareIcon, DeleteIcon } from '@chakra-ui/icons';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  IconButton,
  Box,
  Center,
  Input,
  HStack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Text,
  Textarea,
} from '@chakra-ui/react';

import { debounce } from '@/utils/editor';

function MyAccordion(props: any) {
  const { data, index, updateData, delData } = props;
  const myRef: any = useRef();
  const myTextarea: any = useRef();
  useEffect(() => {
    if (myRef.current) {
      myRef.current.value = data.titre;
    }
    if (myTextarea.current) {
      myTextarea.current.value = data.text;
    }
  }, [data]);

  const handleChange = (event: any) => {
    event.persist();
    data[event.target.name] = event.target.value;
    updateData(index, data);
  };
  const optimisedHandleChange = debounce(handleChange, 500);

  const oHCMarge = debounce((event: any) => {
    data.marge = event;
    updateData(index, data);
  }, 500);

  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            {data.titre}
          </Box>
          <Box flex="0" minWidth={50} textAlign="left">
            <DeleteIcon onClick={() => delData(index)} />
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <HStack spacing="24px">
          <Text>Titre: </Text>
          <Input
            ref={myRef}
            placeholder="Titre"
            name="titre"
            defaultValue={data.titre}
            onChange={optimisedHandleChange}
          />
        </HStack>
        <HStack spacing="24px">
          <Text>Texte: </Text>
          <Textarea
            ref={myTextarea}
            placeholder="Texte"
            name="text"
            defaultValue={data.text}
            onChange={optimisedHandleChange}
          />
        </HStack>
        <HStack spacing="24px">
          <Text>Marges: </Text>
          <NumberInput defaultValue={data.marge} onChange={oHCMarge}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </HStack>
      </AccordionPanel>
    </AccordionItem>
  );
}

export default function Sample(props: any) {
  const { updateData, index, data } = props;
  function Add() {
    data.annotation.push({
      titre: 'sous-titre',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      marge: 0,
    });
    updateData(index, data);
  }
  function Update(n: number, d: any) {
    data.annotation[n] = d;
    updateData(index, data);
  }
  function Del(myIndex: number) {
    const newArray: any = [];
    // eslint-disable-next-line no-plusplus
    for (let n = 0; n < data.annotation.length; n++) {
      const e = data.annotation[n];
      if (n !== myIndex) {
        newArray.push(e);
      }
    }
    data.annotation = newArray;
    updateData(index, data);
  }
  return (
    <>
      <Center>
        <IconButton
          variant="outline"
          aria-label="Ajout"
          fontSize="30px"
          size="lg"
          icon={<PlusSquareIcon />}
          onClick={Add}
        />
      </Center>
      <Accordion allowToggle my={4}>
        {data.annotation?.map((e: any, n: number) => (
          <MyAccordion
            key={`${n}`}
            data={e}
            index={n}
            updateData={Update}
            delData={Del}
          />
        ))}
      </Accordion>
    </>
  );
}
