import Form from '@/component/fiche/';
import { Meta } from '@/layout/Meta';
import { Main } from '@/templates/Main';

export default function Index() {
  return (
    <Main
      meta={
        <Meta
          title="Fiche Joueur Classique"
          description="Aide à la création de fiche PJ pour le JdR The Witcher."
        />
      }
    >
      <Form />
    </Main>
  );
}
