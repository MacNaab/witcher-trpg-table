import T from '@/component/editor/view';
import { Meta } from '@/layout/Meta';
import { Second } from '@/templates/Main';

export default function Index() {
  return (
    <Second
      meta={
        <Meta
          title="Editeur de texte"
          description="Editeur de texte dans le même style que le JdR The Witcher."
        />
      }
    >
      <T />
    </Second>
  );
}
