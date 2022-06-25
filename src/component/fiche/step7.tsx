import {
  Heading,
  Divider,
  Textarea,
  VStack,
  Wrap,
  WrapItem,
  CheckboxGroup,
  Checkbox,
  useToast,
} from '@chakra-ui/react';

import ButtonGroup from '@/component/fiche/buttons';
// import { FormObject } from '@/component/fiche/form';

function ToChose(props: any) {
  const { choix, equip } = props;
  return (
    <>
      <Heading as="h3" size="lg">
        {choix} équipements à choisir
      </Heading>
      <Wrap px={4} spacing="30px" justify="center">
        <CheckboxGroup>
          {equip?.map((e: any, n: number) => (
            <WrapItem key={`step7_chose_${n}`}>
              <Checkbox value={e.nom} name="equip">
                {e.nom}
              </Checkbox>
            </WrapItem>
          ))}
        </CheckboxGroup>
      </Wrap>
    </>
  );
}

function ToStatic(props: any) {
  const { choix } = props;
  return (
    <>
      <Heading as="h3" size="lg">
        Équipement obligatoire
      </Heading>
      <Wrap px={4} spacing="30px" justify="center">
        {choix?.map((e: any, n: number) => (
          <WrapItem key={`step7_static_${n}`}>
            <Checkbox name="static" isDisabled defaultChecked value={e.nom}>
              {e.nom}
            </Checkbox>
          </WrapItem>
        ))}
      </Wrap>
    </>
  );
}

function FormObject(form: any) {
  const myObject: any = {
    static: [],
    equip: [],
  };
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < form.length; i++) {
    const n = form[i].name;
    if (n === 'equip') {
      const v = form[i].value;
      const c = form[i].checked;
      if (c) {
        myObject.equip.push(v);
      }
    } else if (n === 'static') {
      const v = form[i].value;
      myObject.static.push(v);
    } else if (n) {
      const v = form[i].value;
      if (v) {
        myObject[n] = v;
      }
    }
  }
  return myObject;
}

export default function Sample(props: any) {
  const { stepslength, activeStep, prevStep, nextStep, updateData, myData } =
    props;

  const toast = useToast();

  function handleSubmit(event: any) {
    event.preventDefault();
    const form = FormObject(event.target);
    if (form.equip.length === myData.equiToChose) {
      updateData('etape7', form);
      nextStep();
    } else {
      let err = '';
      if (form.equip.length > myData.equiToChose) {
        err = `Vous avez choisi ${Number(
          form.equip.length - myData.equiToChose
        )} équipement(s) en trop.`;
      } else {
        err = `Vous devez choisir encore ${Number(
          myData.equiToChose - form.equip.length
        )} item(s).`;
      }
      toast({
        title: 'Erreur',
        description: err,
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  }
  return (
    <VStack py={4} spacing={2}>
      <Heading>Équipement</Heading>
      <form onSubmit={handleSubmit}>
        {myData.equipmentStatic ? (
          <ToStatic choix={myData.equipmentStatic} />
        ) : null}
        <Divider m={2} />
        {myData.equiToChose && myData.equipement ? (
          <ToChose choix={myData.equiToChose} equip={myData.equipement} />
        ) : null}
        <Divider m={2} />
        <Textarea
          name="desc"
          placeholder="Style personnel: vestimentaire, personnalité, aspirations, physique, valeurs etc (facultatif)"
          // className="w-full"
          my={4}
          minHeight={100}
        />
        <ButtonGroup
          stepslength={stepslength}
          activeStep={activeStep}
          prevStep={prevStep}
        />
      </form>
    </VStack>
  );
}
