import { useMemo } from 'react';

import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useBoolean,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';

import Anno from './Eanno';
import Corps from './Ecorps';
import Page from './Epage';

function MyTab(props: any) {
  const { isOpen, data } = props;
  return (
    <Tabs display={isOpen ? 'block' : 'none'}>
      <TabList>
        <Tab>Page</Tab>
        <Tab>Corps</Tab>
        <Tab isDisabled={!data.style}>Annotation</Tab>
        <Tab>JSON</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <Page {...props} />
        </TabPanel>
        <TabPanel>
          <Corps {...props} />
        </TabPanel>
        <TabPanel>
          <Anno {...props} />
        </TabPanel>
        <TabPanel>{JSON.stringify(data)}</TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default function Gauche(props: any) {
  const { data, index = 0, updateData, delData } = props;
  const myData = useMemo(() => data, [data]);
  const [isOpen, setOpen] = useBoolean(true);
  const [isFinish, setFinish] = useBoolean(false);
  function anim() {
    if (isOpen) {
      setFinish.on();
    } else {
      setFinish.off();
    }
  }
  return (
    <>
      <motion.div
        animate={{ width: isOpen ? '10cm' : 0 }}
        transition={{ duration: 1 }}
        onAnimationStart={() => setFinish.off()}
        onAnimationComplete={() => anim()}
        style={{
          backgroundColor: '#263238',
          position: 'relative',
          color: 'whitesmoke',
          paddingTop: 5,
          paddingBottom: 5,
          overflow: 'auto',
        }}
      >
        <MyTab
          isOpen={isFinish}
          data={myData}
          index={index}
          updateData={updateData}
          delData={delData}
        />
      </motion.div>
      <div className="concealer gche" onClick={setOpen.toggle}>
        {isOpen ? (
          <ArrowLeftIcon zIndex={1} color="white" />
        ) : (
          <ArrowRightIcon zIndex={1} color="white" />
        )}
      </div>
    </>
  );
}
