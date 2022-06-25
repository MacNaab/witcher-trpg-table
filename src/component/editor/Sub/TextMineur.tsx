import { nameColor } from '@/utils/editor';

export default function Sample(props: any) {
  const { data, couleur } = props;
  const myColor: any = nameColor[couleur];
  return (
    <div
      style={{
        marginTop: `${data.marge}px`,
        marginBottom: `${data.marge}px`,
      }}
    >
      <div
        className="TWSousTitre"
        style={{
          color: myColor,
        }}
      >
        {data.titre}
      </div>
      <hr
        style={{
          borderColor: myColor,
          borderTopWidth: 2,
          marginTop: -6,
        }}
      />
      <div className="TWstText">{data.text}</div>
    </div>
  );
}
