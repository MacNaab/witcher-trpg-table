import {
  Heading,
  Box,
  Center,
  Text,
  Stack,
  Button,
  Badge,
  useColorModeValue,
} from '@chakra-ui/react';
import NextLink from 'next/link';

function MyBadge(props: any) {
  const { text } = props;
  return (
    <Badge
      px={2}
      py={1}
      bg={useColorModeValue('gray.50', 'gray.800')}
      fontWeight={'400'}
      className="cursor-pointer"
    >
      {text}
    </Badge>
  );
}

export default function SocialProfileSimple(props: any) {
  const { data } = props;
  return (
    <Center py={6}>
      <Box
        maxW={'320px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'lg'}
        p={6}
        textAlign={'center'}
      >
        <Heading fontSize={'2xl'} fontFamily={'body'}>
          {data.nom}
        </Heading>
        <Text
          textAlign={'center'}
          color={useColorModeValue('gray.700', 'gray.400')}
          px={3}
        >
          {data.description}
        </Text>
        <Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
          {data.tag.map((e: string) => (
            <MyBadge key={e} text={e} />
          ))}
        </Stack>

        <Stack mt={8} direction={'row'} spacing={4}>
          <NextLink href={`/table/${data.id}`} passHref>
            <Button
              flex={1}
              fontSize={'sm'}
              rounded={'full'}
              bg={'blue.400'}
              color={'white'}
              boxShadow={
                '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
              }
              _hover={{
                bg: 'blue.500',
              }}
              _focus={{
                bg: 'blue.500',
              }}
            >
              Follow
            </Button>
          </NextLink>
        </Stack>
      </Box>
    </Center>
  );
}
