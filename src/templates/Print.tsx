import { ReactNode } from 'react';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => (
  <div
    // className="antialiased"
    style={{
      minHeight: '29.7cm',
      maxWidth: '21cm',
    }}
  >
    {props.meta}
    <div>{props.children}</div>
  </div>
);

export { Main };
