import { HStack, Text, Switch } from '@chakra-ui/react';

export default function Sample(props: any) {
  const { children, ...other } = props;
  return (
    <HStack spacing="24px">
      <Text>{children}</Text>
      <Switch {...other} />
    </HStack>
  );
}
