import { Box, Center } from '@chakra-ui/react';

import Editeur from '../editeur';

export default function Sample(props: any) {
  return (
    <Box flex="1" style={{ overflow: 'auto', maxHeight: '90vh' }}>
      <Center p={5} style={{ minWidth: '21cm' }}>
        <Editeur {...props} />
      </Center>
    </Box>
  );
}
