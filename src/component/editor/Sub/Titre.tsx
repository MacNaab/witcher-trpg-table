import { nameColor } from '@/utils/editor';

export default function Sample(props: any) {
  const { data, couleur } = props;
  const myColor: any = nameColor[couleur];
  return (
    <div
      className={data.textStroke ? 'TWTitre textStroke' : 'TWTitre'}
      style={{
        color: data.color ? data.color : myColor,
        textAlign: data.centrer ? 'center' : 'initial',
        fontSize: `${data.fontSize}px`,
        columnSpan: data.columnSpan ? 'all' : 'initial',
      }}
    >
      {data.text}
    </div>
  );
}
