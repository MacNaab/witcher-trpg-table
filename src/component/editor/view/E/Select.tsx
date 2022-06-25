import { HStack, Text, Select } from '@chakra-ui/react';

export default function Sample(props: any) {
  const { label, children, ...other } = props;
  return (
    <HStack spacing="24px">
      {label ? <Text>{label}</Text> : null}
      <Select {...other}>{children}</Select>
    </HStack>
  );
}
