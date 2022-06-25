import { Wrap, WrapItem, Heading } from '@chakra-ui/react';

import MyForm from '@/component/fiche/form';
import dtb from '@/public/assets/json/fiche/magie.json';

const sorts: any = [];
const invocations: any = [];
const rituels: any = [];
const envoûtements: any = [];
const vampires = dtb.Vampire.filter((e) => e.Niveau === 'Novice');

/*
Les sorts de magicien 101
Les invocations des prêtres 109
Les signes des sorceleurs 114
Les rituels 116
Les envoûtements
*/

function logic(arr: any, origine: string) {
  arr.forEach((e: any) => {
    switch (e.Type) {
      case 'Éléments mixtes':
      case 'Terre':
      case 'Air':
      case 'Feu':
      case 'Eau':
        if (e.Niveau === 'Novice') {
          sorts.push({
            nom: e.Nom,
            desc: e.Effet,
            source: origine,
          });
        }
        break;

      case 'Druide':
      case 'Prêcheur':
        if (e.Niveau === 'Novice') {
          invocations.push({
            nom: e.Nom,
            desc: e.Effet,
            source: origine,
          });
        }
        break;

      case 'Rituel':
        if (e.Niveau === 'Novice') {
          rituels.push({
            nom: e.Nom,
            desc: e.Effet,
            source: origine,
          });
        }
        break;

      case 'Envoûtement':
        if (e.Danger === 'Faible') {
          envoûtements.push({
            nom: e.Nom,
            desc: e.Effet,
            source: origine,
          });
        }
        break;

      default:
        break;
    }
  });
}
logic(dtb.Base, 'Livre de Base');
logic(dtb.Unofficial, 'Unofficial');
logic(dtb.Tome, 'Tome of Chaos');

function Affichage(props: any) {
  const { n, label } = props;
  let options: any = [];
  switch (label) {
    case 'Sort':
      options = sorts;
      break;
    case 'Invocation':
      options = invocations;
      break;
    case 'Rituel':
      options = rituels;
      break;
    case 'Envoûtement':
      options = envoûtements;
      break;
    default:
      break;
  }
  return (
    <WrapItem>
      <MyForm
        data={{
          name: `${label}_${n}`,
          type: 'select',
          label,
          options,
        }}
      />
    </WrapItem>
  );
}

function GigaList(props: any) {
  const { magie } = props;
  const conversion: any = {
    sort: 'Sort',
    invocation: 'Invocation',
    rituel: 'Rituel',
    envoutement: 'Envoûtement',
  };
  return (
    <>
      {Object.keys(magie).map((e: any) => {
        // nombre d'élément dans la catégorie
        const nb = magie[e];
        if (nb < 1) {
          return null;
        }
        return (
          <>
            <Heading>{conversion[e]}</Heading>
            <Wrap px={4} spacing="30px">
              {[...Array(nb)].map((el, n) => (
                <Affichage
                  label={conversion[e]}
                  n={n}
                  key={`${conversion[e]}_${n}`}
                />
              ))}
            </Wrap>
          </>
        );
      })}
    </>
  );
}

export default function Sample(props: any) {
  const { magie } = props;
  return (
    <>
      {typeof magie === 'object' ? <GigaList magie={magie} /> : null}
      {magie === 'Vampire' ? JSON.stringify(vampires) : null}
    </>
  );
}
