import { Meta } from '@/layout/Meta';
import { Main } from '@/templates/Main';

export default function Index() {
  return (
    <Main meta={<Meta title="Parcours de Mage" description="Description." />}>
      <div>Ceci est du texte.</div>
    </Main>
  );
}
