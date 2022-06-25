import { Input } from '@chakra-ui/react';

export default function Sample(props: any) {
  const { name, label } = props.data;
  return <Input name={name} placeholder={label} required />;
}
