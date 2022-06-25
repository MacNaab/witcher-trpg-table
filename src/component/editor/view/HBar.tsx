import { useState, useEffect, useRef } from 'react';

import {
  Center,
  Editable,
  EditableInput,
  EditablePreview,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Flex,
  Spacer,
  Text,
  Tooltip,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import {
  AiOutlineFilePdf,
  AiOutlineDownload,
  AiOutlineCloudUpload,
  AiOutlineFolderOpen,
  AiOutlineSave,
} from 'react-icons/ai';

import IDB from '@/component/editor/indexedDB';
import FileInput from '@/component/fileInput';
import { debounce } from '@/utils/editor';

function DrawerExample(props: any) {
  const { Element, data, setLocal } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Tooltip label={Element.tooltip}>
        <Center>
          <Element.icon className="cursor-pointer" size={50} onClick={onOpen} />
        </Center>
      </Tooltip>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Sauvegardes locales</DrawerHeader>
          <DrawerBody>
            {data?.map((e: any) => (
              <div className="mb-2" key={e.title}>
                <Text>
                  <b className="cursor-pointer" onClick={() => setLocal(e)}>
                    {e.title}
                  </b>
                  , <i>dernière modification: {e.date}</i>
                </Text>
                <hr />
              </div>
            ))}
            {data ? null : <Text>Aucune sauvegarde locale...</Text>}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default function Sample({ data, loadData }: any) {
  const [myTitle, setTitle] = useState('Mon titre');
  const [myID, setID] = useState<any>();
  const [myIDB, setIDB] = useState<any>();
  const [mySaves, setSaves] = useState<any>();
  const [importData, setImport] = useState<any>();

  const myTitleRef: any = useRef();
  const router = useRouter();

  useEffect(() => {
    const IDBLoad = IDB();
    setIDB(IDBLoad);
  }, []);

  useEffect(() => {
    if (myIDB) {
      setTimeout(() => {
        // si IDB fonctionne : ne marche pas FIREFOX private MODE !
        if (myIDB.getLoad()) {
          myIDB.displayData(setSaves);
        }
      }, 5000);
    }
  }, [myIDB]);

  const setLocal = (données: any) => {
    setID(données.id);
    setTitle(données.title);
    loadData(données.body);
    myTitleRef.current.firstChild.innerHTML = données.title;
    myTitleRef.current.lastChild.value = données.title;
  };

  useEffect(() => {
    if (importData) {
      if (importData.type === 'WitcherEditor') {
        setLocal(importData);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [importData]);

  const optimisedHandleChange = debounce((e: any) => {
    setTitle(e);
  }, 500);
  const exportJSON = () => {
    const newData = {
      id: myID,
      title: myTitle,
      body: data,
      type: 'WitcherEditor',
    };
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(newData)
    )}`;
    const link = document.createElement('a');
    link.href = jsonString;
    link.download = `${myTitle}.json`;
    link.click();
  };
  const saveLocal = () => {
    if (myIDB.getLoad()) {
      if (myID) {
        // update
        myIDB.updateItem(myID, myTitle, data);
      } else {
        // ajout
        myIDB.addData(myTitle, data);
      }
    }
  };
  const toPDF = () => {
    localStorage.setItem('title', myTitle);
    localStorage.setItem('body', JSON.stringify(data));
    router.replace('/editor/print');
  };

  const IconListData = [
    {
      icon: AiOutlineFolderOpen,
      id: 'AiOutlineFolderOpen',
      tooltip: 'Ouvrir une sauvegarde.',
    },
    {
      icon: AiOutlineCloudUpload,
      id: 'AiOutlineCloudUpload',
      tooltip: 'Importer un fichier JSON',
    },
    {
      icon: AiOutlineSave,
      id: 'AiOutlineSave',
      tooltip: 'Sauvegarder',
      onClick: saveLocal,
    },
    {
      icon: AiOutlineDownload,
      id: 'AiOutlineDownload',
      tooltip: 'Télécharger le fichier au format JSON',
      onClick: exportJSON,
    },
    {
      icon: AiOutlineFilePdf,
      id: 'AiOutlineFilePdf',
      tooltip: 'Exporter en PDF',
      onClick: toPDF,
    },
  ];
  const IconList = IconListData.map((Element) => {
    switch (Element.id) {
      case 'AiOutlineFolderOpen':
        return (
          <DrawerExample
            key={Element.id}
            Element={Element}
            data={mySaves}
            setLocal={setLocal}
          />
        );
      case 'AiOutlineCloudUpload':
        return (
          <Tooltip key={Element.id} label={Element.tooltip}>
            <Center>
              <FileInput type="json" setState={setImport}>
                <Element.icon className="cursor-pointer" size={50} />
              </FileInput>
            </Center>
          </Tooltip>
        );
      default:
        return (
          <Tooltip label={Element.tooltip} key={Element.id}>
            <Center>
              <Element.icon
                className="cursor-pointer"
                size={50}
                onClick={Element.onClick}
              />
            </Center>
          </Tooltip>
        );
    }
  });

  return (
    <Flex className="px-20">
      <Center>
        <VStack className="cursor-pointer" spacing={-7}>
          <Text fontWeight="bold" fontSize={'3xl'}>
            Éditeur de Texte
          </Text>
          <Text fontStyle="italic" fontSize={'sm'}>
            Format JdR The Witcher
          </Text>
        </VStack>
      </Center>
      <Spacer />
      <Center>
        <Editable
          defaultValue={data.titre}
          placeholder="Mon titre"
          className="rounded-md border-2 border-dotted border-indigo-600 p-2 text-center"
          minWidth={250}
          onChange={optimisedHandleChange}
          ref={myTitleRef}
        >
          <EditablePreview />
          <EditableInput />
        </Editable>
      </Center>
      <Spacer />
      {IconList}
    </Flex>
  );
}
