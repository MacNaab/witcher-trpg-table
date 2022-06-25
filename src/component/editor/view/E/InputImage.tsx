import { useRef } from 'react';

import {
  HStack,
  Text,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { MdImageSearch } from 'react-icons/md';

import FileInput from '@/component/fileInput';

export default function Sample(props: any) {
  const { children, ...other } = props;
  const inputRef: any = useRef();
  const setImage = (src: any) => {
    if (inputRef.current) {
      inputRef.current.value = src;
    }
  };
  return (
    <HStack spacing="24px">
      <Text>{children}</Text>
      <InputGroup>
        <Input {...other} ref={inputRef} />
        <InputRightElement>
          <FileInput type="image" setState={setImage}>
            <MdImageSearch className="cursor-pointer" />
          </FileInput>
        </InputRightElement>
      </InputGroup>
    </HStack>
  );
}
