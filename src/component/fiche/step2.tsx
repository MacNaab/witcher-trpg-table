import Mage from './histoire/mage';
import Normal from './histoire/normal';
import Sorceleur from './histoire/sorceleur';

export default function Sample(props: any) {
  const { profession } = props.myData;
  switch (profession) {
    case 'Sorceleur':
      return <Sorceleur {...props} />;
    case 'Mage':
      return <Mage {...props} />;
    /*
    case 'Vampire':
      break;
    */
    default:
      return <Normal {...props} />;
  }
}
