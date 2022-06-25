import { useMemo, useRef, useState } from 'react';

import {
  Button,
  Center,
  Editable,
  EditableInput,
  EditablePreview,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import {
  FcAddRow,
  FcDeleteRow,
  FcAddColumn,
  FcDeleteColumn,
} from 'react-icons/fc';

function Theader(props: any) {
  const myText = useMemo(() => props.text, [props.text]);
  const editRef: any = useRef();
  return (
    <th>
      <Editable ref={editRef} defaultValue={myText}>
        <EditablePreview />
        <EditableInput />
      </Editable>
    </th>
  );
}

function Tdata(props: any) {
  const myText = useMemo(() => props.text, [props.text]);
  const myRef: any = useRef();

  let t = false;
  const myProps = t
    ? {
        // placeholder: 'texte',
        value: 'Test',
      }
    : {
        placeholder: 'texte',
      };
  const test = () => {
    t = true;
  };
  return (
    <td>
      <Editable ref={myRef} {...myProps} defaultValue={myText}>
        <EditablePreview />
        <EditableInput />
      </Editable>
      <span onClick={test}>+</span>
    </td>
  );
}

function Tline(props: any) {
  const { line } = props;
  function DelLine() {
    props.setData((data: any) =>
      data.filter((_d: any, i: Number) => i !== props.n)
    );
  }
  return (
    <tr>
      {line?.map((e: any, n: number) => (
        <Tdata key={`table_data_key_${props.n}_${n}`} text={e} />
      ))}
      <td>
        <Center>
          <FcDeleteRow size={30} className="cursor-pointer" onClick={DelLine} />
        </Center>
      </td>
    </tr>
  );
}

export default function BasicUsage() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const heads = ['titre', 'description'];
  const [myHeader, setHead] = useState(heads);

  const bodys = [
    ['Album', 'Un titre cool !'],
    ['Livre', 'Le livre du sanglier.'],
  ];
  const [myBody, setBody] = useState(bodys);

  function AddRow() {
    const newArray: any = [];
    myHeader.forEach(() => newArray.push('Texte'));
    setBody((oldArray) => [...oldArray, newArray]);
  }

  // A SUPPRIMER:
  if (myHeader === ['false']) {
    setHead(heads);
  }

  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent h="29.7cm" w="21cm" maxWidth={`80vw`} maxHeight={`85vh`}>
          <ModalHeader>Table</ModalHeader>
          <ModalCloseButton />
          <ModalBody overflow="auto">
            <table className="TWtable">
              <tr>
                {myHeader?.map((e: any, n: number) => (
                  <Theader text={e} key={`header_key_${n}`} />
                ))}
                <th>
                  <Center>
                    <FcAddColumn size={30} className="cursor-pointer" />
                  </Center>
                </th>
              </tr>
              {myBody?.map((e: any, n: number) => (
                <Tline
                  n={n}
                  line={e}
                  key={`table_data_key_${n}`}
                  setData={setBody}
                />
              ))}
              <tr>
                <td>
                  <Center>
                    <FcAddRow
                      size={30}
                      className="cursor-pointer"
                      onClick={AddRow}
                    />
                  </Center>
                </td>
                <td>
                  <Center>
                    <FcDeleteColumn size={30} className="cursor-pointer" />
                  </Center>
                </td>
              </tr>
            </table>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Fermer
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
