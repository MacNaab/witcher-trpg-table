export default function Sample(props: any) {
  const { text, columnSpan } = props.data;
  const myParagraphs = text.split('\n\n').map((e: any, n: number) => (
    <div key={`block#${n}`}>
      {e.split('\n').map((el: any, nu: number) => (
        <div key={`block#${n}_paragraph#${nu}`} style={{ marginBottom: 5 }}>
          {el}
        </div>
      ))}
    </div>
  ));
  return (
    <div
      className="TWText"
      style={{ columnSpan: columnSpan ? 'all' : 'initial' }}
    >
      {myParagraphs}
      <br />
    </div>
  );
}
