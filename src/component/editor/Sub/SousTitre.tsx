import { nameColor } from '@/utils/editor';

export default function Sample(props: any) {
  const { data, couleur } = props;
  const myColor: any = nameColor[couleur];
  return (
    <div style={{ columnSpan: data.columnSpan ? 'all' : 'initial' }}>
      <div
        className="TWSousTitre"
        style={{
          color: myColor,
          textAlign: 'initial',
          fontSize: `${data.fontSize}px`,
        }}
      >
        {data.text}
      </div>
      <hr
        style={{
          borderColor: myColor,
          borderTopWidth: 2,
          marginTop: -6,
        }}
      />
    </div>
  );
}
