import { useMemo } from 'react';

import { Button, Center, Divider, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';

import Editeur from '../editeur';

function Miniature(props: any) {
  const { index, setActive, active } = props;
  const handleClick = () => {
    if (setActive) {
      setActive(index);
    }
  };
  return (
    <div
      style={
        active
          ? { border: 'solid red', borderRadius: 5, padding: 3 }
          : { border: 'none', padding: 0 }
      }
    >
      <div
        onClick={handleClick}
        style={{ height: '5.94cm', width: '4.2cm', cursor: 'pointer' }}
      >
        <div style={{ transform: `scale(0.2)`, transformOrigin: 'top left' }}>
          {props.children}
        </div>
      </div>
    </div>
  );
}

export default function Droite(props: any) {
  const { pages, active, setPage, addPage } = props;
  const myPages = useMemo(() => pages, [pages]);
  const isOpen = true;
  return (
    <>
      <motion.div
        animate={{ width: isOpen ? '5cm' : 0 }}
        transition={{ duration: 1 }}
        style={{
          backgroundColor: '#263238',
          position: 'relative',
          paddingTop: 5,
          paddingBottom: 5,
          overflow: 'auto',
        }}
      >
        <Center>
          <Button
            colorScheme="blue"
            size="sm"
            variant="outline"
            onClick={addPage}
          >
            Ajouter une page
          </Button>
        </Center>

        <Divider my={2} w="4cm" className="mx-auto" />
        <VStack spacing={4}>
          {myPages?.map((e: any, n: Number) => (
            <Miniature
              key={`min#${n}`}
              index={n}
              active={n === active}
              setActive={setPage}
            >
              <Editeur data={e} />
            </Miniature>
          ))}
        </VStack>
      </motion.div>
    </>
  );
}
