import { useState } from 'react';

import { QuestionIcon } from '@chakra-ui/icons';
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Text,
  HStack,
  VStack,
  Flex,
  Center,
  Badge,
} from '@chakra-ui/react';

import IconButton from '@/component/iconButton';

import Popover from './popover';

export default function Sample(props: any) {
  const { name, label, min, max } = props.data;
  return (
    <HStack>
      <Text fontSize="sm">{label} : </Text>
      <NumberInput
        w={125}
        min={min || 0}
        max={max || 100000}
        name={name}
        isRequired
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </HStack>
  );
}

function CustomPop(props: any) {
  const { head, body, footer } = props;
  return (
    <Popover head={head} body={body} footer={footer}>
      <IconButton>{props.children}</IconButton>
    </Popover>
  );
}

export function CtrlNumber(props: any) {
  const {
    name,
    label,
    desc,
    min = 0,
    max = 10000,
    require = true,
  } = props.data;
  const { setState } = props;
  const handleChange = (e: any) => {
    setState(e);
  };
  return (
    <HStack>
      <Flex>
        <Text fontSize="sm">{label}</Text>
        <CustomPop head={label} body={desc}>
          <QuestionIcon className="cursor-pointer" />
        </CustomPop>
      </Flex>
      <NumberInput
        w={125}
        min={min}
        max={max}
        name={name}
        onChange={handleChange}
        isRequired={require}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </HStack>
  );
}
/*
export function CaractNumber(props: any) {
  const { nom, label, desc, points, setP } = props.data;
  const min = 1;
  const max = 10;
  const inputRef = useRef(null);
  function inc() {
    const input: any = inputRef.current;
    if (Number(input.value) < max && points > 0) {
      input.value = Number(input.value) + 1;
      setP(points - 1);
    }
  }
  function dec() {
    const input: any = inputRef.current;
    if (Number(input.value) > min) {
      input.value = Number(input.value) - 1;
      setP(points + 1);
    }
  }

  return (
    <VStack spacing={-4}>
      <Flex>
        <Text>{label}</Text>
        <CustomPop head={label} body={desc}>
          <QuestionIcon className="cursor-pointer" />
        </CustomPop>
      </Flex>
      <HStack maxW="200px">
        <Button onPointerUp={dec}>-</Button>
        <Input
          className="text-center"
          name={nom}
          isReadOnly
          ref={inputRef}
          defaultValue={1}
        />
        <Button onPointerUp={inc}>+</Button>
      </HStack>
    </VStack>
  );
}
*/
export function CaractNumber(props: any) {
  const { nom, label, desc, update } = props.data;
  const handleChange = () => {
    if (update) {
      update();
    }
  };
  return (
    <VStack>
      <Flex>
        <Text>{label}</Text>
        <CustomPop head={label} body={desc}>
          <QuestionIcon className="cursor-pointer" />
        </CustomPop>
      </Flex>
      <HStack>
        <NumberInput
          onChange={handleChange}
          w={125}
          min={0}
          max={10}
          defaultValue={1}
          name={nom}
          isRequired
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </HStack>
    </VStack>
  );
}

export function ComptNumber(props: any) {
  const { nom, label, desc, min = 0, complexe = false, update } = props.data;
  const [myValue, setValue] = useState(0);
  const handleChange = (value: any) => {
    setValue(value);
    if (update) {
      update();
    }
  };
  return (
    <VStack>
      <Flex>
        <Text>
          {label}
          {complexe ? '*' : null}
        </Text>
        <CustomPop head={label} body={desc}>
          <QuestionIcon className="cursor-pointer" />
        </CustomPop>
      </Flex>
      <Flex>
        <Badge py={3} px={4} variant="outline">
          <Center>{complexe ? Math.floor(myValue / 2) : myValue}</Center>
        </Badge>
        <NumberInput
          onChange={handleChange}
          w={125}
          min={min}
          max={complexe ? 12 : 6}
          name={nom}
          isRequired={min !== 0}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </Flex>
    </VStack>
  );
}
