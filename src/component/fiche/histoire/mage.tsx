import { useState } from 'react';

import { VStack, Wrap, WrapItem, Heading } from '@chakra-ui/react';

import ButtonGroup from '@/component/fiche/buttons';
import MyForm, { FormObject } from '@/component/fiche/form';
import { CtrlNumber } from '@/component/fiche/form/number';
import Select, { CtrlSelect } from '@/component/fiche/form/select';
import Event from '@/component/fiche/histoire/event';
import parcours from '@/public/assets/json/fiche/parcours_mage.json';

function Decade(props: any) {
  const { age = 20 } = props;
  // décade
  const d = Math.floor((age - 11) / 10);
  return (
    <Wrap pt={2} pb={4} spacing="30px" justify="center">
      {[...Array(d > 0 ? d : 1)].map((_elem, index) => (
        <WrapItem key={`WrapItem_decade#${index}`}>
          <MyForm
            data={{
              name: `decade_${index}`,
              type: 'select',
              label:
                'Comment avez-vous choisi de passer la majorité de cette décennie ?',
              options: [
                {
                  nom: 'Prudent',
                  desc: '20% Danger ; 10% Bénéfices ; 10% Allié ; 10% Connaissance',
                },
                {
                  nom: 'Politique',
                  desc: '50% Danger ; 20% Bénéfices ; 50% Allié ; 10% Connaissance',
                },
                {
                  nom: 'Expérimentation',
                  desc: '70% Danger ; 30% Bénéfices ; 10% Allié ; 60% Connaissance',
                },
                {
                  nom: 'Étude magique',
                  desc: '50% Danger ; 50% Bénéfices ; 20% Allié ; 10% Connaissance',
                },
              ],
            }}
          />
        </WrapItem>
      ))}
    </Wrap>
  );
}

export default function Sample(props: any) {
  const { stepslength, activeStep, prevStep, nextStep, myData, updateData } =
    props;
  const { race, sexe } = myData;
  const [age, setAge] = useState(20);

  const [region, setRegion] = useState('');
  // An Elven, Gnomish, Vran, or Werebbub
  const spécialRace = ['Elfe', 'Gnome', 'Vran', 'Marmotin'];
  const régionArray = spécialRace.includes(race)
    ? parcours.location_Elderfolk
    : parcours.location;
  const régionList = régionArray.map((e) => {
    return {
      nom: e,
      desc: '',
    };
  });

  function returnRégion(e: any) {
    const index = parcours.location.findIndex((f) => f === e);
    if (index <= 4) {
      return 'north';
    }
    return 'nilfgaard';
  }
  const régionIndex = spécialRace.includes(race)
    ? 'elderlands'
    : returnRégion(region);

  const [ecole, setEcole] = useState('Académie mineure');
  function returnSchool(r: any) {
    if (r === 'north') {
      const s = sexe === 'Homme' ? 'male' : 'female';
      return parcours.school[s].north.map((e) => {
        return {
          nom: e,
          desc: '',
        };
      });
    }
    return parcours.school.male.nilfgaard.map((e) => {
      return {
        nom: e,
        desc: '',
      };
    });
  }
  const school = spécialRace.includes(race)
    ? [
        {
          nom: 'Académie mineure',
          desc: parcours.school.minor,
        },
      ]
    : returnSchool(régionIndex);

  const life = (e: any) => {
    switch (e) {
      case 'Aretuza':
        return parcours.life.Aretuza;
      case 'Ban Ard':
        return parcours.life['Ban Ard'];
      case 'Académie impériale de magie':
      case 'Gweison Haul':
        return parcours.life['Gweison Haul'];
      default:
        return parcours.life.Minor;
    }
  };

  function handleSubmit(event: any) {
    event.preventDefault();
    const form = FormObject(event.target);
    form.events = [];
    Object.keys(form).forEach((e) => {
      if (e.includes('decade')) {
        const ev = Event('Mage', form[e]);
        form.events.push(ev);
      }
    });
    updateData('etape2', form);
    nextStep();
  }

  return (
    <VStack py={4} spacing={2}>
      <form onSubmit={handleSubmit}>
        <Heading>Patrie :</Heading>
        <Wrap pt={4} pb={2} spacing="30px" justify="center">
          <WrapItem>
            <CtrlSelect
              data={{
                name: 'region',
                type: 'select',
                label: 'Où êtes-vous né?',
                options: régionList,
              }}
              setState={setRegion}
            />
          </WrapItem>
        </Wrap>
        <Heading>Famille :</Heading>
        <Wrap pt={4} pb={2} spacing="30px" justify="center">
          <WrapItem>
            <Select
              data={{
                name: 'familySize',
                type: 'select',
                label: 'Taille de la famille',
                options: parcours.family.size.map((e) => {
                  return {
                    nom: e,
                    desc: '',
                  };
                }),
              }}
            />
          </WrapItem>
          <WrapItem>
            <Select
              data={{
                name: 'familyPersonality',
                type: 'select',
                label: 'Personnalité familiale',
                options: parcours.family.personality.map((e) => {
                  return {
                    nom: e,
                    desc: '',
                  };
                }),
              }}
            />
          </WrapItem>
          <WrapItem>
            <Select
              data={{
                name: 'familyStatus',
                type: 'select',
                label: 'Situation familiale',
                options: parcours.family.status.map((e) => {
                  return {
                    nom: e,
                    desc: '',
                  };
                }),
              }}
            />
          </WrapItem>
        </Wrap>
        <Heading>Magie :</Heading>
        <Wrap pt={4} pb={2} spacing="30px" justify="center">
          <WrapItem>
            <Select
              data={{
                name: 'discover',
                type: 'select',
                label: 'Comment avez-vous découvert votre magie ?',
                options: parcours.discover,
              }}
            />
          </WrapItem>
          <WrapItem>
            <Select
              data={{
                name: 'react',
                type: 'select',
                label: 'Comment les gens ont-ils réagi à votre magie ?',
                options: parcours.react[régionIndex].map((e) => {
                  return {
                    nom: e,
                    desc: '',
                  };
                }),
              }}
            />
          </WrapItem>
          <WrapItem>
            <CtrlSelect
              data={{
                name: 'school',
                type: 'select',
                label: 'Quelle école avez-vous fréquentée ?',
                options: school,
              }}
              setState={setEcole}
            />
          </WrapItem>
        </Wrap>
        <Heading>Académie :</Heading>
        <Wrap pt={4} pb={2} spacing="30px" justify="center">
          <WrapItem>
            <Select
              data={{
                name: 'life',
                type: 'select',
                label: "La vie à l'académie",
                options: life(ecole),
              }}
            />
          </WrapItem>
          <WrapItem>
            <Select
              data={{
                name: 'apprenti',
                type: 'select',
                label: 'Étiez-vous un apprenti ?',
                options: [
                  {
                    nom: 'Oui',
                    desc: '',
                  },
                  {
                    nom: 'Non',
                    desc: '',
                  },
                ],
              }}
            />
          </WrapItem>
        </Wrap>
        <Heading>Mentor :</Heading>
        <Wrap pt={4} pb={2} spacing="30px" justify="center">
          <WrapItem>
            <Select
              data={{
                name: 'mentorPersonality',
                type: 'select',
                label: 'Personnalité',
                options: parcours.mentor.like.Personality.map((e) => {
                  return {
                    nom: e,
                    desc: '',
                  };
                }),
              }}
            />
          </WrapItem>
          <WrapItem>
            <Select
              data={{
                name: 'mentorValue',
                type: 'select',
                label: 'Valeur',
                options: parcours.mentor.like.Value.map((e) => {
                  return {
                    nom: e,
                    desc: '',
                  };
                }),
              }}
            />
          </WrapItem>
          <WrapItem>
            <Select
              data={{
                name: 'mentorClothing',
                type: 'select',
                label: 'Vêtements',
                options: parcours.mentor.like.Clothing.map((e) => {
                  return {
                    nom: e,
                    desc: '',
                  };
                }),
              }}
            />
          </WrapItem>
          <WrapItem>
            <Select
              data={{
                name: 'mentorHatred',
                type: 'select',
                label: 'Haine',
                options: parcours.mentor.like.Hatred.map((e) => {
                  return {
                    nom: e,
                    desc: '',
                  };
                }),
              }}
            />
          </WrapItem>
          <WrapItem>
            <Select
              data={{
                name: 'mentorStyle',
                type: 'select',
                label: "Quel était le style d'enseignement de votre mentor ?",
                options: parcours.mentor.style.map((e) => {
                  return {
                    nom: e,
                    desc: '',
                  };
                }),
              }}
            />
          </WrapItem>
          <WrapItem>
            <Select
              data={{
                name: 'mentorMoment',
                type: 'select',
                label:
                  'Quel a été votre moment le plus mémorable avec votre mentor ?',
                options: parcours.mentor.moment.map((e) => {
                  return {
                    nom: e,
                    desc: '',
                  };
                }),
              }}
            />
          </WrapItem>
          <WrapItem>
            <Select
              data={{
                name: 'mentorEnd',
                type: 'select',
                label:
                  'Comment avez-vous terminé les choses avec votre mentor ?',
                options: parcours.mentor.end.map((e) => {
                  return {
                    nom: e,
                    desc: '',
                  };
                }),
              }}
            />
          </WrapItem>
        </Wrap>

        <Heading>La vie d&apos;un mage :</Heading>
        <Wrap pt={2} pb={4} spacing="30px" justify="center">
          <WrapItem>
            <CtrlNumber
              data={{
                name: 'age',
                type: 'number',
                label: 'Âge du personnage',
                min: 20,
              }}
              setState={setAge}
            />
          </WrapItem>
        </Wrap>

        <Decade age={age} />

        <ButtonGroup
          stepslength={stepslength}
          activeStep={activeStep}
          prevStep={prevStep}
        />
      </form>
    </VStack>
  );
}
