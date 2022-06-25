export default function Sample(props: any) {
  const { data } = props;
  const myStyle: any = {
    position: data.position,
    height: data.h ? `${data.h}px` : 'auto',
    width: data.w ? `${data.w}px` : 'auto',
  };
  if (data.position === 'relative') {
    myStyle.columnSpan = data.columnSpan ? 'all' : 'initial';
    if (data.centrer) {
      myStyle.margin = 'auto';
    }
  } else if (data.centrer) {
    const pos = ['top', 'bottom', 'left', 'right'];
    pos.forEach((e) => {
      myStyle[e] = 0;
    });
    myStyle.margin = 'auto';
  } else {
    if (data.xn && data.xv) {
      myStyle[data.xn] = `${data.xv}px`;
    }
    if (data.yn && data.yv) {
      myStyle[data.yn] = `${data.yv}px`;
    }
  }
  return <img src={data.src} alt="image" style={myStyle} />;
}
