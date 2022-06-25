import { useMemo } from 'react';

import { useRouter } from 'next/router';

export default function Sample(props: any) {
  const { pair = false, page, image } = props;
  const myImage = useMemo(() => image, [image]);
  const router = useRouter();
  const myStyle = pair
    ? {
        top: 15,
        left: 43,
      }
    : {
        top: 15,
        right: 43,
      };
  return (
    <div>
      <img
        alt="BG"
        style={{
          width: '100%',
          height: 'auto',
          position: 'absolute',
          transform: pair ? 'scaleX(-1)' : 'none',
          top: 0,
        }}
        src={`${router.basePath}/assets/images/editor/${myImage}.png`}
      />
      <div className="TWPage" style={myStyle}>
        <b>{page}</b>
      </div>
    </div>
  );
}
