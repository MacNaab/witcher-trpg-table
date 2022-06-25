import { Meta } from '@/layout/Meta';
import { Main } from '@/templates/Main';

export default function Index() {
  return (
    <Main
      meta={
        <Meta
          title="Editeur de texte"
          description="Editeur de texte dans le même style que le JdR The Witcher."
        />
      }
    >
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione fuga
        recusandae quidem. Quaerat molestiae blanditiis doloremque possimus
        labore voluptatibus distinctio recusandae autem esse explicabo molestias
        officia placeat, accusamus aut saepe.
      </p>
    </Main>
  );
}
