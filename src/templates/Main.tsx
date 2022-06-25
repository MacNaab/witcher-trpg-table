import { ReactNode } from 'react';

import Footer from './Footer';
import NavBar from './NavBar';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => (
  <>
    <NavBar />
    <div className="w-full px-1 text-gray-700 antialiased">
      {props.meta}

      <div className="mx-8 max-w-screen-xl xl:mx-auto">
        <div className="content py-5 text-xl">{props.children}</div>
        <Footer />
      </div>
    </div>
  </>
);

const Second = (props: IMainProps) => (
  <>
    <NavBar />
    <div className="w-full px-1 text-gray-700 antialiased">
      {props.meta}
      <div className="content py-5 text-xl">{props.children}</div>
      <div className="mx-8 mt-2 max-w-screen-xl xl:mx-auto">
        <Footer />
      </div>
    </div>
  </>
);

export { Main, Second };
