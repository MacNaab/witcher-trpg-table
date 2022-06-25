import { Heading, VStack, Wrap, WrapItem } from '@chakra-ui/react';

import ButtonGroup from '@/component/fiche/buttons';
import { FormObject } from '@/component/fiche/form';

import MagicList from './magie';

function NoMagie() {
  return (
    <Wrap px={4} spacing="30px" justify="center">
      <WrapItem>
        Cette profession ne possède pas de compétence magique.
      </WrapItem>
    </Wrap>
  );
}

export default function Sample(props: any) {
  const { stepslength, activeStep, prevStep, nextStep, updateData, magie } =
    props;

  function handleSubmit(event: any) {
    event.preventDefault();
    const form = FormObject(event.target);
    updateData('etape6', form);
    nextStep();
  }
  return (
    <VStack py={4} spacing={2}>
      <Heading>Magie</Heading>
      <form onSubmit={handleSubmit}>
        <Wrap px={4} spacing="30px" justify="center">
          <WrapItem></WrapItem>
        </Wrap>
        {magie ? <MagicList magie={magie} /> : <NoMagie />}
        <ButtonGroup
          stepslength={stepslength}
          activeStep={activeStep}
          prevStep={prevStep}
        />
      </form>
    </VStack>
  );
}
