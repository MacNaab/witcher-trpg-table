import { useEffect, useRef } from 'react';

import { PlusSquareIcon, DeleteIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Center,
  Checkbox,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  Textarea,
  useDisclosure,
} from '@chakra-ui/react';

import { debounce } from '@/utils/editor';

import Einput from './E/Input';
import EinputImage from './E/InputImage';
import ModalTable from './E/ModalTable';
import Enumber from './E/Number';
import Eselect from './E/Select';
// import Eswitch from './E/Switch';

function BasicUsage(props: any) {
  const { data, handleChange } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const optimisedHandleChange = debounce(handleChange, 500);
  return (
    <>
      <ExternalLinkIcon className="cursor-pointer" onClick={onOpen} />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent h={500} w={1000} maxWidth="75vw" maxHeight="75vw">
          <ModalHeader>Description</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea
              h={400}
              placeholder="Texte"
              name="text"
              defaultValue={data.data.text}
              onChange={optimisedHandleChange}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

function Paragraphe(props: any) {
  const { index, delData, updateData, data } = props;
  const myTextarea: any = useRef();
  useEffect(() => {
    if (myTextarea.current) {
      myTextarea.current.value = data.data.text;
    }
  }, [data.data.text]);

  const handleChange = (event: any) => {
    event.persist();
    data.data[event.target.name] = event.target.value;
    updateData(index, data);
  };
  const optimisedHandleChange = debounce(handleChange, 500);
  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            Paragraphe
          </Box>
          <Box flex="0" minWidth={50} textAlign="left">
            <DeleteIcon onClick={() => delData(index)} />
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <HStack spacing="24px">
          <Text>Texte: </Text>
          <Flex>
            <Textarea
              ref={myTextarea}
              placeholder="Texte"
              name="text"
              defaultValue={data.data.text}
              onChange={optimisedHandleChange}
            />
            {myTextarea.current ? (
              <BasicUsage
                {...props}
                handleChange={handleChange}
                myRef={myTextarea}
              />
            ) : null}
          </Flex>
        </HStack>
        <Checkbox
          colorScheme="green"
          mt={3}
          defaultChecked={data.data.columnSpan}
          onChange={(e) => {
            data.data.columnSpan = e.target.checked;
            updateData(index, data);
          }}
        >
          Column-span
        </Checkbox>
      </AccordionPanel>
    </AccordionItem>
  );
}

function SousTitre(props: any) {
  const { index, delData, updateData, data, aff } = props;
  const handleChange = (event: any) => {
    event.persist();
    data.data[event.target.name] = event.target.value;
    updateData(index, data);
  };
  const optimisedHandleChange = debounce(handleChange, 500);
  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            {aff}
          </Box>
          <Box flex="0" minWidth={50} textAlign="left">
            <DeleteIcon onClick={() => delData(index)} />
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <Einput
          placeholder="Texte"
          onChange={optimisedHandleChange}
          name="text"
          defaultValue={data.data.text}
        >
          Texte:
        </Einput>
        <Enumber
          defaultValue={data.data.fontSize}
          min={1}
          onChange={debounce((e: any) => {
            data.data.fontSize = e;
            updateData(index, data);
          }, 500)}
        >
          Taille
        </Enumber>
        {data.type === 'titre' ? (
          <Einput
            placeholder="Couleur"
            onChange={optimisedHandleChange}
            name="color"
            defaultValue={data.data.color}
          >
            Couleur:
          </Einput>
        ) : null}
        <Checkbox
          colorScheme="green"
          mt={3}
          defaultChecked={data.data.columnSpan}
          onChange={(e) => {
            data.data.columnSpan = e.target.checked;
            updateData(index, data);
          }}
        >
          Column-span
        </Checkbox>
        <Checkbox
          colorScheme="green"
          my={3}
          ml={10}
          defaultChecked={data.data.centrer}
          onChange={(e) => {
            data.data.centrer = e.target.checked;
            updateData(index, data);
          }}
        >
          Centrer
        </Checkbox>
        {data.type === 'titre' ? (
          <Checkbox
            colorScheme="black"
            my={3}
            // ml={10}
            defaultChecked={data.data.textStroke}
            onChange={(e) => {
              data.data.textStroke = e.target.checked;
              updateData(index, data);
            }}
          >
            Text Stroke
          </Checkbox>
        ) : null}
      </AccordionPanel>
    </AccordionItem>
  );
}

// Image => must have an alt prop...
function Icono(props: any) {
  const { index, delData, updateData, data } = props;
  const handleChange = (event: any) => {
    event.persist();
    data.data[event.target.name] = event.target.value;
    updateData(index, data);
  };
  const optimisedHandleChange = debounce(handleChange, 500);
  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            Image
          </Box>
          <Box flex="0" minWidth={50} textAlign="left">
            <DeleteIcon onClick={() => delData(index)} />
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <EinputImage
          placeholder="url"
          onChange={optimisedHandleChange}
          name="src"
          defaultValue={data.data.src}
        >
          Image:
        </EinputImage>
        <HStack spacing="10px">
          <Enumber
            defaultValue={data.data.h}
            min={1}
            onChange={debounce((e: any) => {
              data.data.h = e;
              updateData(index, data);
            }, 500)}
          >
            H:
          </Enumber>
          <Enumber
            defaultValue={data.data.w}
            min={1}
            onChange={debounce((e: any) => {
              data.data.w = e;
              updateData(index, data);
            }, 500)}
          >
            L:
          </Enumber>
        </HStack>
        <Text fontSize="xs" fontStyle={'italic'} style={{ marginTop: 0 }}>
          Laisser vierge pour adapter la taille automatiquement.
        </Text>
        <Eselect
          label="Position: "
          placeholder="Position"
          defaultValue={data.data.position}
          name="position"
          onChange={optimisedHandleChange}
        >
          <option className="text-black" value="relative">
            Relative
          </option>
          <option className="text-black" value="absolute">
            Absolute
          </option>
        </Eselect>
        {data.data.position === 'relative' ? (
          <Checkbox
            colorScheme="green"
            m={3}
            defaultChecked={data.data.columnSpan}
            onChange={(e) => {
              data.data.columnSpan = e.target.checked;
              updateData(index, data);
            }}
          >
            Column-span
          </Checkbox>
        ) : (
          <>
            <HStack spacing="24px">
              <Eselect
                placeholder="Axe Y"
                defaultValue={data.data.yn}
                name="yn"
                onChange={optimisedHandleChange}
              >
                <option className="text-black" value="top">
                  Haut
                </option>
                <option className="text-black" value="bottom">
                  Bas
                </option>
              </Eselect>
              <Enumber
                defaultValue={data.data.yv}
                onChange={debounce((e: any) => {
                  data.data.yv = e;
                  updateData(index, data);
                }, 500)}
              />
            </HStack>
            <HStack spacing="24px">
              <Eselect
                placeholder="Axe X"
                defaultValue={data.data.xn}
                name="xn"
                onChange={optimisedHandleChange}
              >
                <option className="text-black" value="left">
                  Gauche
                </option>
                <option className="text-black" value="right">
                  Droite
                </option>
              </Eselect>
              <Enumber
                defaultValue={data.data.xv}
                onChange={debounce((e: any) => {
                  data.data.xv = e;
                  updateData(index, data);
                }, 500)}
              />
            </HStack>
          </>
        )}
        <Checkbox
          colorScheme="green"
          my={3}
          defaultChecked={data.data.centrer}
          onChange={(e) => {
            data.data.centrer = e.target.checked;
            updateData(index, data);
          }}
        >
          Centrer
        </Checkbox>
      </AccordionPanel>
    </AccordionItem>
  );
}

function Marge(props: any) {
  const { index, delData, updateData, data } = props;
  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            Marge
          </Box>
          <Box flex="0" minWidth={50} textAlign="left">
            <DeleteIcon onClick={() => delData(index)} />
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <Enumber
          defaultValue={data.data.h}
          min={1}
          onChange={debounce((e: any) => {
            data.data.h = e;
            updateData(index, data);
          }, 500)}
        >
          Taille
        </Enumber>
        <Checkbox
          colorScheme="green"
          mt={3}
          defaultChecked={data.data.columnSpan}
          onChange={(e) => {
            data.data.columnSpan = e.target.checked;
            updateData(index, data);
          }}
        >
          Column-span
        </Checkbox>
      </AccordionPanel>
    </AccordionItem>
  );
}

function Matcher(props: any) {
  const { data } = props;
  switch (data.type) {
    case 'paragraphe':
      return <Paragraphe {...props} />;
    case 'soustitre':
      return <SousTitre {...props} aff="Sous-titre" />;
    case 'titre':
      return <SousTitre {...props} aff="Titre" />;
    case 'image':
      return <Icono {...props} />;
    case 'marge':
      return <Marge {...props} />;
    /* case 'table':
      return <>Table</>; */
    default:
      return null;
  }
}

export default function Sample(props: any) {
  const { updateData, index, data } = props;
  function Add(key: any) {
    switch (key) {
      case 'paragraphe':
        data.children.push({
          type: key,
          data: {
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras nulla urna, eleifend at enim ac, faucibus malesuada leo. Fusce viverra augue erat, eget mollis mi scelerisque ac. Cras cursus leo elit, at consectetur velit fringilla nec.',
          },
        });
        break;
      case 'soustitre':
        data.children.push({
          type: key,
          data: {
            text: 'sous-titre',
            fontSize: 20,
          },
        });
        break;
      case 'titre':
        data.children.push({
          type: key,
          data: {
            text: 'titre',
            fontSize: 40,
          },
        });
        break;
      case 'image':
        data.children.push({
          type: key,
          data: {
            src: '',
            // w: 100,
            h: 100,
            position: 'relative',
          },
        });
        break;
      case 'marge':
        data.children.push({
          type: key,
          data: {
            h: 15,
          },
        });
        break;
      default:
        break;
    }
    updateData(index, data);
  }
  function Update(n: number, d: any) {
    data.children[n] = d;
    updateData(index, data);
  }
  function updateColomn(n: string) {
    data.columnCount = Number(n);
    updateData(index, data);
  }
  function Del(myIndex: number) {
    const newArray: any = [];
    // eslint-disable-next-line no-plusplus
    for (let n = 0; n < data.children.length; n++) {
      const e = data.children[n];
      if (n !== myIndex) {
        newArray.push(e);
      }
    }
    data.children = newArray;
    updateData(index, data);
  }
  return (
    <>
      <Menu>
        <Center>
          <MenuButton>
            <IconButton
              variant="outline"
              aria-label="Ajout"
              fontSize="30px"
              size="lg"
              icon={<PlusSquareIcon />}
            />
          </MenuButton>
        </Center>
        <MenuList bg="blue.800">
          <MenuItem onClick={() => Add('titre')} className="hover:text-black">
            Titre
          </MenuItem>
          <MenuItem
            onClick={() => Add('soustitre')}
            className="hover:text-black"
          >
            Sous-titre
          </MenuItem>
          <MenuItem
            onClick={() => Add('paragraphe')}
            className="hover:text-black"
          >
            Paragraphe
          </MenuItem>
          <MenuItem onClick={() => Add('image')} className="hover:text-black">
            Image
          </MenuItem>
          <MenuItem className="hover:text-black">Table</MenuItem>
          <MenuItem onClick={() => Add('marge')} className="hover:text-black">
            Marge
          </MenuItem>
        </MenuList>
      </Menu>
      <Center>
        <Enumber
          maxWidth={100}
          defaultValue={data.columnCount}
          onChange={updateColomn}
        >
          Colonne:
        </Enumber>
      </Center>
      <ModalTable />
      <Accordion allowToggle my={4}>
        {data.children?.map((e: any, n: number) => (
          <Matcher
            key={`children_${n}`}
            data={e}
            index={n}
            updateData={Update}
            delData={Del}
          />
        ))}
      </Accordion>
    </>
  );
}
