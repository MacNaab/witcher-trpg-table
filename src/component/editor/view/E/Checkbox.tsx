import { Checkbox } from '@chakra-ui/react';

export default function Sample(props: any) {
  const { children, ...other } = props;
  return <Checkbox {...other}>{children}</Checkbox>;
}
