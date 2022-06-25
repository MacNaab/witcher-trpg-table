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
      <Baniere pair={true} page={data.numéro} image={data.bordure} />
      {data.style ? (
        <div className="TWPagePair">
          <div className="TWLateral">
            {data.annotation?.map((e: any) => (
              <TextMineur key={e.titre} data={e} couleur={data.bordure} />
            ))}
          </div>
          <div
            style={{
              paddingLeft: 30,
              columnCount: data.columnCount,
              width: '-webkit-fill-available',
            }}
          >
            {data.children?.map((e: any, n: number) => (
              <Switcher key={`switcher#${n}`} e={e} couleur={data.bordure} />
            ))}
          </div>
        </div>
      ) : (
        <div className="TWPagePair">
          <div
            style={{
              width: '-webkit-fill-available',
              columnCount: data.columnCount,
            }}
          >
            {data.children?.map((e: any, n: number) => (
              <Switcher key={`switcher#${n}`} e={e} couleur={data.bordure} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
