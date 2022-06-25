/* eslint-disable tailwindcss/no-custom-classname */
import { useState } from 'react';

import { Flex } from '@chakra-ui/react';

import Centre from './C';
import Droite from './D';
import Gauche from './G';
import HBar from './HBar';

/*
const baseData = {
  type: 'vierge',
  bordure: 'Aventure',
  numéro: 0,
  style: false,
  annotation: [],
  children: [],
};
*/

export default function Sample() {
  const [data, setData] = useState([
    {
      type: 'vierge',
      bordure: 'Aventure',
      numéro: 0,
      style: false,
      columnCount: 1,
      annotation: [],
      children: [],
    },
  ]);
  const [page, setPage] = useState(0);

  const addData = () => {
    setData((oldArray) => [
      ...oldArray,
      {
        type: 'vierge',
        bordure: 'Aventure',
        numéro: 0,
        columnCount: 1,
        style: false,
        annotation: [],
        children: [],
      },
    ]);
  };
  const delData = (index: number) => {
    const newArray: any = [];
    // eslint-disable-next-line no-plusplus
    for (let n = 0; n < data.length; n++) {
      const e = data[n];
      if (n !== index) {
        newArray.push(e);
      }
    }
    if (newArray.length > 0) {
      if (newArray.length >= page) {
        setPage(0);
      }
      setData(newArray);
    } else {
      if (page !== 0) {
        setPage(0);
      }
      setData([
        {
          type: 'vierge',
          bordure: 'Aventure',
          numéro: 0,
          style: false,
          columnCount: 1,
          annotation: [],
          children: [],
        },
      ]);
    }
  };
  const updateData = (index: Number, donnees: any) => {
    setData(
      data.map((e: any, n: Number) => (n === index ? donnees : { ...e }))
    );
  };
  const loadData = (donnees: any) => {
    setData(donnees);
    if (page !== 0) {
      setPage(0);
    }
  };
  return (
    <div
      style={{
        maxHeight: '100vh',
      }}
    >
      <HBar data={data} loadData={loadData} />
      <Flex style={{ maxHeight: '90vh', backgroundColor: 'rgba(0,0,255,0.3)' }}>
        <Gauche
          data={data[page]}
          index={page}
          updateData={updateData}
          delData={delData}
        />
        <Centre page={page} updateData={updateData} data={data[page]} />
        <Droite
          setPage={setPage}
          addPage={addData}
          pages={data}
          active={page}
        />
      </Flex>
    </div>
  );
}
