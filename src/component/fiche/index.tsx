/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react';

import {
  Flex,
  VStack,
  Button,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from '@chakra-ui/react';
import { Step, Steps, useSteps } from 'chakra-ui-steps';

import ButtonGroup from '@/component/fiche/buttons';

import Final from './finalstep';
import Step1 from './step1';
import Step2 from './step2';
import Step3 from './step3';
import Step4 from './step4';
import Step5 from './step5';
import Step6 from './step6';
import Step7 from './step7';

const steps = [
  'Info',
  'Parcours',
  'Caract',
  'Comp.Pro',
  'Comp.acquises',
  'Magie',
  'Équipement',
];

export default function Sample() {
  // + setStep
  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });
  const [myData, setData] = useState<any>({});
  function updateData(etape: any, valeur: any) {
    const updatedValue: any = {};
    updatedValue[etape] = valeur;
    setData((data: any) => ({
      ...data,
      ...updatedValue,
    }));
  }

  return (
    <Flex flexDir="column" width="100%">
      <Steps activeStep={activeStep} pb={8}>
        {steps.map((label) => (
          <Step label={label} key={label} />
        ))}
      </Steps>

      <div style={{ display: activeStep === 0 ? 'block' : 'none' }}>
        <Step1
          stepslength={steps.length}
          activeStep={activeStep}
          prevStep={prevStep}
          nextStep={nextStep}
          updateData={updateData}
        />
      </div>
      <div style={{ display: activeStep === 1 ? 'block' : 'none' }}>
        {myData.etape1 ? (
          <Step2
            stepslength={steps.length}
            activeStep={activeStep}
            prevStep={prevStep}
            nextStep={nextStep}
            updateData={updateData}
            myData={{
              profession: myData.etape1.profession,
              race: myData.etape1.race,
            }}
          />
        ) : null}
      </div>
      <div style={{ display: activeStep === 2 ? 'block' : 'none' }}>
        <Step3
          stepslength={steps.length}
          activeStep={activeStep}
          prevStep={prevStep}
          nextStep={nextStep}
          updateData={updateData}
        />
      </div>
      <div style={{ display: activeStep === 3 ? 'block' : 'none' }}>
        {myData.etape2 ? (
          <Step4
            stepslength={steps.length}
            activeStep={activeStep}
            prevStep={prevStep}
            nextStep={nextStep}
            updateData={updateData}
            compt={myData.etape1.data.compts}
            exclusive={myData.etape1.data.exclusive}
          />
        ) : null}
      </div>
      <div style={{ display: activeStep === 4 ? 'block' : 'none' }}>
        {myData.etape3 ? (
          <Step5
            stepslength={steps.length}
            activeStep={activeStep}
            prevStep={prevStep}
            nextStep={nextStep}
            updateData={updateData}
            compts={myData.etape1.data.compts}
            max={Number(Number(myData.etape3.INT) + Number(myData.etape3.REF))}
          />
        ) : null}
      </div>
      <div style={{ display: activeStep === 5 ? 'block' : 'none' }}>
        {myData.etape3 ? (
          <Step6
            stepslength={steps.length}
            activeStep={activeStep}
            prevStep={prevStep}
            nextStep={nextStep}
            updateData={updateData}
            myData={{
              profession: myData.etape1.profession,
              race: myData.etape1.race,
            }}
            magie={myData.etape1.data.magie}
          />
        ) : null}
      </div>
      <div style={{ display: activeStep === 6 ? 'block' : 'none' }}>
        {myData.etape5 ? (
          <Step7
            stepslength={steps.length}
            activeStep={activeStep}
            prevStep={prevStep}
            nextStep={nextStep}
            updateData={updateData}
            myData={{
              equiToChose: myData.etape1.data.equiToChose,
              equipement: myData.etape1.data.equipement,
              equipmentStatic: myData.etape1.data.equipmentStatic
                ? myData.etape1.data.equipmentStatic
                : false,
            }}
          />
        ) : null}
      </div>

      {activeStep === steps.length ? (
        <VStack p={4} spacing={2}>
          <Final myData={myData} />
          <ButtonGroup
            stepslength={steps.length}
            activeStep={activeStep}
            prevStep={prevStep}
          />
          <Button mx="auto" size="sm" onClick={reset}>
            Reset
          </Button>
        </VStack>
      ) : null}

      <Accordion allowToggle>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                JSON data
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <div>{JSON.stringify(myData)}</div>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Flex>
  );
}
