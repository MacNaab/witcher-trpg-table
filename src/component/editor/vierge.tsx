/* eslint-disable tailwindcss/no-custom-classname */
import { useRouter } from 'next/router';

import Switcher from './switcheur';

export default function Sample(props: any) {
  const { data } = props;

  const router = useRouter();
  return (
    <div
      className="A4"
      style={{
        background: data.BG
          ? data.BG
          : `url("${router.basePath}/assets/images/editor/BG.jpg")`,
        paddingTop: 70,
        backgroundSize: 'cover',
      }}
    >
      <div className="TWPageV">
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
    </div>
  );
}
