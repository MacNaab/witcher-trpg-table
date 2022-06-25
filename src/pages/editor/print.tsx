import { useState, useEffect } from 'react';

import Page from '@/component/editor/editeur';
import { Meta } from '@/layout/Meta';
import { Main } from '@/templates/Print';

export default function Index() {
  const [data, setData] = useState<any>();
  const [myTitle, setTitle] = useState('PDF');
  useEffect(() => {
    const myT = localStorage.getItem('title');
    if (myT) {
      setTitle(myT);
      const myBody: any = localStorage.getItem('body');
      setData(JSON.parse(myBody));
    }
  }, []);

  return (
    <Main
      meta={
        <Meta
          title={myTitle}
          description="Editeur de texte dans le même style que le JdR The Witcher."
        />
      }
    >
      {data ? (
        <>
          {data?.map((e: any, n: number) => (
            <Page key={`page#${n + 1}`} data={e} />
          ))}
        </>
      ) : (
        <>Chargement des données...</>
      )}
    </Main>
  );
}
