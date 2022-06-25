/* eslint-disable tailwindcss/no-custom-classname */
import { useRouter } from 'next/router';

import Baniere from './Sub/Baniere';
import TextMineur from './Sub/TextMineur';
import Switcher from './switcheur';

export default function Sample(props: any) {
  const { data } = props;

  const router = useRouter();
  return (
    <div
      className="A4"
      style={{
        backgroundImage: `url("${router.basePath}/assets/images/editor/BG.jpg")`,
        paddingTop: 70,
      }}
    >
      <Baniere page={data.numéro} image={data.bordure} />
      <div className="TWPageImpair">
        <div style={{ paddingRight: 30, columnCount: data.columnCount }}>
          {data.children?.map((e: any, n: number) => (
            <Switcher key={`switcher#${n}`} e={e} couleur={data.bordure} />
          ))}
        </div>
        <div className="TWLateral">
          {data.annotation?.map((e: any) => (
            <TextMineur key={e.titre} data={e} couleur={data.bordure} />
          ))}
        </div>
      </div>
    </div>
  );
}
