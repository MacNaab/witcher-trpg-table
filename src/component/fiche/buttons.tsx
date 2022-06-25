import { Flex, Button } from '@chakra-ui/react';

export default function sample(props: any) {
  const { stepslength, activeStep, prevStep } = props;
  return (
    <Flex width="100%" justify="flex-end">
      <Button
        isDisabled={activeStep === 0}
        mr={4}
        onClick={prevStep}
        size="sm"
        variant="ghost"
      >
        Précédent
      </Button>
      {activeStep === stepslength ? null : (
        <Button size="sm" type="submit">
          {activeStep === stepslength - 1 ? 'Finir' : 'Suivant'}
        </Button>
      )}
    </Flex>
  );
}
