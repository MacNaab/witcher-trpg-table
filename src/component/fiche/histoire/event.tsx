import EventMage from './mage_event';
import ParcoursMage from './mage_parcours';
import EventNormal from './normal_event';
import ParcoursNormal from './normal_parcours';
import EventSorceleur from './sorceleur_event';
import ParcoursSorceleur from './sorceleur_parcours';

export default function Event(type = '', Time = '') {
  switch (type) {
    case 'Mage':
      return EventMage(Time);
    case 'Sorceleur':
      return EventSorceleur(Time);
    default:
      return EventNormal();
  }
}

export function Parcours(props: any) {
  const { data, profession } = props;
  switch (profession) {
    case 'Sorceleur':
      return <ParcoursSorceleur data={data} />;
    case 'Mage':
      return <ParcoursMage data={data} />;
    default:
      return <ParcoursNormal data={data} />;
  }
}
