/* eslint-disable tailwindcss/no-custom-classname */
import { useMemo } from 'react';

import { EditorProps } from '@/utils/editor';

import Impair from './impair';
import Pair from './pair';
import Vierge from './vierge';

export default function Sample(props: any) {
  const { data } = props;
  const myData: EditorProps = useMemo(() => data, [data]);

  switch (myData.type) {
    case 'pair':
      return <Pair data={myData} />;
    case 'impair':
      return <Impair data={myData} />;
    default:
      return <Vierge data={myData} />;
  }
}
