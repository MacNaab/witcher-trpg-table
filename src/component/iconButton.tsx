/* eslint-disable @typescript-eslint/no-use-before-define */
import type { ReactNode } from 'react';

import { Button, useColorModeValue } from '@chakra-ui/react';

export default function SocialButton({ children }: { children: ReactNode }) {
  return (
    <Button
      bg={useColorModeValue('redAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={1}
      cursor={'pointer'}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}
    >
      {children}
    </Button>
  );
}
