export default function Sample(props: any) {
  const { data } = props;
  return (
    <div
      style={{
        height: `${data.h}px`,
        columnSpan: data.columnSpan ? 'all' : 'initial',
      }}
    />
  );
}
