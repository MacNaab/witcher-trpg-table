/* eslint-disable tailwindcss/no-custom-classname */
import { useRouter } from 'next/router';

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
      <div className="TWPageV">{JSON.stringify(data)}</div>
    </div>
  );
}
