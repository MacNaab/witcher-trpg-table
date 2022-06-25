import Icono from './Sub/Icono';
import Marge from './Sub/Marge';
import SousTitre from './Sub/SousTitre';
import TextMajeur from './Sub/TextMajeur';
import Titre from './Sub/Titre';

export default function Sample(props: any) {
  const { e, couleur } = props;
  switch (e.type) {
    case 'paragraphe':
      return <TextMajeur data={e.data} />;
    case 'titre':
      return <Titre data={e.data} couleur={couleur} />;
    case 'soustitre':
      return <SousTitre data={e.data} couleur={couleur} />;
    case 'image':
      return <Icono data={e.data} />;
    case 'marge':
      return <Marge data={e.data} />;
    default:
      return null;
  }
}
