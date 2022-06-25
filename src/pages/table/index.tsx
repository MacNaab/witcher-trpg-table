import { SimpleGrid } from '@chakra-ui/react';

import Card from '@/component/table/card';
import data from '@/component/table/list.json';
import { Meta } from '@/layout/Meta';
import { Main } from '@/templates/Main';

export default function Index() {
  return (
    <Main
      meta={
        <Meta
          title="Tables aléatoires"
          description="Liste de tables aléatoires pour le JdR The Witcher."
        />
      }
    >
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
        {data.map((e) => (
          <Card key={JSON.stringify(e)} data={e} />
        ))}
      </SimpleGrid>
    </Main>
  );
}
