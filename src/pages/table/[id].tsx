import Card from '@/component/table/basic';
import data from '@/component/table/list.json';
import { Meta } from '@/layout/Meta';
import { Main } from '@/templates/Main';
import { myURL } from '@/utils/AppConfig';

const dataClone = data.splice(0);
const indexList = ['parcours_mage'];
indexList.forEach((e) => {
  const index = dataClone.findIndex((el) => el.id === e);
  dataClone.splice(index, 1);
});

export default function Post({ postData, table }: any) {
  return (
    <Main
      meta={
        <Meta
          title={postData.nom || 'Table Aléatoire'}
          description={
            postData.description ||
            'Une table aléatoire pour le JdR The Witcher.'
          }
        />
      }
    >
      <Card data={postData} table={table} />
    </Main>
  );
}
export async function getStaticPaths() {
  // Return a list of possible value for id
  const paths = dataClone.map((table: any, index: number) => {
    return {
      params: {
        id: table.id.toString(),
        index,
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
}
export async function getStaticProps({ params }: any) {
  // Fetch necessary data for the blog post using params.id
  const { id } = params;
  const postData = dataClone.find((e) => e.id === id) || null;
  try {
    const res = await fetch(`${myURL}assets/json/table/${id}.json`);
    const table = await res.json();
    return {
      props: {
        postData,
        table: table || ['null'],
      },
    };
  } catch (error) {
    return {
      props: {
        postData,
        table: null,
      },
    };
  }
}
