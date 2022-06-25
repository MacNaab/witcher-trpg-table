import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Button,
  Badge,
  Stack,
  HStack,
} from '@chakra-ui/react';
import { BsSearch } from 'react-icons/bs';

function SearchInput() {
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const form = e.target;
    console.log(form.query); // recherche
  };
  return (
    <form onSubmit={handleSubmit}>
      <InputGroup size="md">
        <InputLeftElement pointerEvents="none">
          <BsSearch color="gray.300" />
        </InputLeftElement>
        <Input
          pr="4.5rem"
          type={'text'}
          name="query"
          placeholder="Enter password"
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" type="submit">
            Rechercher
          </Button>
        </InputRightElement>
      </InputGroup>
    </form>
  );
}

function BadgeList(props: any) {
  const { data } = props;
  return (
    <HStack className="overflow-auto">
      {data?.map((e: any) => (
        <Badge key={e}>{e}</Badge>
      ))}
    </HStack>
  );
}

export default function simple(props: any) {
  const { data } = props;
  return (
    <Stack>
      <SearchInput />
      <BadgeList data={data} />
    </Stack>
  );
}
