import { useState, useEffect } from 'react';

import { Button, ButtonGroup, Heading, Center } from '@chakra-ui/react';
import download from 'downloadjs';
import { useRouter } from 'next/router';
import { PDFDocument } from 'pdf-lib';

import competences from '@/public/assets/json/fiche/competence.json';
import items from '@/public/assets/json/fiche/item.json';
import magies from '@/public/assets/json/fiche/magie.json';
import races from '@/public/assets/json/fiche/race.json';

const CopyCompt: any = competences;

const dataPDF1 = {
  etape1: {
    joueur: 'Nom',
    personnage: 'Nom',
    race: 'Race',
    profession: 'Profession',
  },
  etape2: { age: 'Age', origine: 'Origine' },
  etape3: {
    INT: 'INT 1',
    REF: 'REF 1',
    DEX: 'DEX 1',
    COR: 'COR 1',
    VIT: 'VIT 1',
    EMP: 'EMP 1',
    TECH: 'TEC 1',
    VOL: 'VOL 1',
    CHA: 'CHA 1',
  },
};

const dataPDF2 = {
  secondaire: {
    ETOU: 'ETOU 1',
    COU: 'RUN 1',
    SAUT: 'SAUT 1',
    PS: 'PS',
    END: 'END 1',
    ENC: 'ENC 1',
    REC: 'REC 1',
    SB: 'SB',
  },
};

async function fillForm(
  formUrl: string,
  myData: any,
  secondaire: any,
  inventory: any,
  setURL: any,
  setPDF = false
) {
  const formPdfBytes = await fetch(formUrl).then((res) => res.arrayBuffer());

  const pdfDoc = await PDFDocument.load(formPdfBytes);

  const form = pdfDoc.getForm();

  const jsonCopy: any = dataPDF1;
  Object.keys(dataPDF1).forEach((e: any) => {
    const a = jsonCopy[e];
    Object.keys(a).forEach((f: any) => {
      form.getTextField(a[f]).setText(myData[e][f]);
    });
  });
  form.getTextField('Vigueur').setText(myData.etape1.data.vigueur.toString());

  if (myData.etape1.profession === 'Mage') {
    form.getTextField('Origine').setText(myData.etape2.region);
  }

  // Caract secondaires
  const jsonCopy2: any = dataPDF2;
  Object.keys(dataPDF2.secondaire).forEach((e: any) => {
    const id = jsonCopy2.secondaire[e];
    const value = secondaire[e].toString();
    form.getTextField(id).setText(value);
  });

  // Particularités
  const particularités: any = races.find(
    (e) => e.nom === myData.etape1.race
  )?.particularité;
  form
    .getTextField('Particularités')
    .setText(`${particularités.join('\n ')}\n + Bonus Terre Natale`);

  // Compétences Pro
  Object.keys(myData.etape4).forEach((e: any, i: number) => {
    if (e === 'EXC') {
      const { exclusive } = myData.etape1.data;
      form.getTextField('Compt Excl').setText(exclusive.nom);
      form.getTextField('Compt Excl N').setText(myData.etape4.EXC.toString());
      form
        .getTextField('Compt Excl C')
        .setText(myData.etape3[exclusive.caract].toString());
    } else if (CopyCompt[e]) {
      const compt = CopyCompt[e];
      const value = compt.complexe ? myData.etape4[e] / 2 : myData.etape4[e];
      const base = `Compt Pro ${(i + 1).toString()}`;
      form.getTextField(base).setText(compt.nom);
      form.getTextField(`${base} N`).setText(value.toString());
      form
        .getTextField(`${base} C`)
        .setText(myData.etape3[compt.caract].toString());
    }
  });

  // Compétences Nm
  Object.keys(myData.etape5).forEach((e: any, i: number) => {
    if (CopyCompt[e]) {
      const compt = CopyCompt[e];
      const value = compt.complexe ? myData.etape5[e] / 2 : myData.etape5[e];
      const base = `Compt ${(i + 1).toString()}`;
      form.getTextField(base).setText(compt.nom);
      form.getTextField(`${base} N`).setText(value.toString());
      form
        .getTextField(`${base} C`)
        .setText(myData.etape3[compt.caract].toString());
    }
  });

  // Items
  function addInventory(type: any) {
    function getItem(item: any) {
      switch (type) {
        case 'weapon':
          return items.Arme.find((e) => e.Nom === item);
        case 'armor':
          return items.Armure.find((e) => e.Nom === item);
        // case 'item':
        //  return items.Item.find((e) => e.Nom === item);
        default:
          return item;
      }
    }
    inventory[type].forEach((e: any, i: number) => {
      const item: any = getItem(e);
      switch (type) {
        case 'weapon': {
          const base = `Arme ${(i + 1).toString()}`;
          const matchUp: any = {};
          matchUp[base] = item.Nom; // Nom de l'item
          matchUp[`${base} Pré`] = item['Précision'];
          matchUp[`${base} DMG`] = item['Dégats'];
          matchUp[`${base} Type`] = item.Type;
          matchUp[`${base} F`] = item.Fia;
          matchUp[`${base} Port`] = item['Portée'];
          matchUp[`${base} Effet`] = item.Effet;

          Object.keys(matchUp).forEach((f: any) => {
            form.getTextField(f).setText(matchUp[f]);
          });
          break;
        }
        case 'armor': {
          const base = `Armure ${(i + 1).toString()}`;
          const matchUp: any = {};
          matchUp[base] = item.Nom; // Nom de l'item
          matchUp[`${base} PA`] = item.PA;
          matchUp[`${base} VE`] = item.VE;
          matchUp[`${base} Effet`] = item.Effet;

          Object.keys(matchUp).forEach((f: any) => {
            form.getTextField(f).setText(matchUp[f]);
          });
          break;
        }
        case 'item': {
          const base = `Equipement ${(i + 1).toString()}`;
          form.getTextField(base).setText(e);
          break;
        }
        default: {
          const base = `Composant ${(i + 1).toString()}`;
          form.getTextField(base).setText(e);
          break;
        }
      }
    });
  }
  ['weapon', 'armor', 'item', 'other'].forEach((e) => addInventory(e));

  // Bourses
  form.getTextField('Bourse').setText(myData.etape1.data.gold.toString());

  // Magie
  const magic = {
    rit: [],
    other: [],
  };
  function findMagie(name: string) {
    const copyMagic: any = magies;
    let founded = null;
    // eslint-disable-next-line consistent-return
    Object.keys(magies).forEach((e: any) => {
      const found: any = copyMagic[e].find((s: any) => s.Nom === name);
      if (found) {
        founded = found;
      }
    });
    return founded;
  }

  Object.keys(myData.etape6).forEach((e: any) => {
    const splitted = e.split('_');
    if (splitted[0] === 'Rituel') {
      const found = findMagie(myData.etape6[e]);
      if (found) {
        magic.rit.push(found);
      }
    } else {
      const found = findMagie(myData.etape6[e]);
      if (found) {
        magic.other.push(found);
      }
    }
  });

  if (myData.etape1.race === 'Sorceleur') {
    ['Yrden', 'Quen', 'Aard', 'Igni', 'Axii'].forEach((e) => {
      const found = findMagie(e);
      if (found) {
        magic.other.push(found);
      }
    });
  }

  magic.rit.forEach((e: any, i: number) => {
    const matchUp: any = {};
    matchUp[`Rituel N${i.toString()}`] = e.Nom;
    matchUp[`Rituel C${i.toString()}`] = e.END;
    matchUp[`Rituel SD${i.toString()}`] = e.SD;
    matchUp[`Rituel D${i.toString()}`] = e['Durée'];
    matchUp[`Rituel T${i.toString()}`] = e.Temps;
    matchUp[`Rituel Comp${i.toString()}`] = e.Composants;
    matchUp[`Rituel E${i.toString()}`] = e.Effet;

    Object.keys(matchUp).forEach((f: any) => {
      form.getTextField(f).setText(matchUp[f]);
    });
  });

  magic.other.forEach((e: any, i: number) => {
    const matchUp: any = {};
    matchUp[`Sort N${i.toString()}`] = e.Nom;
    matchUp[`Sort C${i.toString()}`] = e.END;
    matchUp[`Sort P${i.toString()}`] = e.Portée;
    matchUp[`Sort D${i.toString()}`] = e['Durée'];
    matchUp[`Sort E${i.toString()}`] = e.Effet;

    /*
    "Sort N1": "Sort N1",
    "Sort C1": "Sort C1",
    "Sort P1": "Sort P1",
    "Sort D1": "Sort D1",
    "Sort E1": "Sort E1",
    */

    Object.keys(matchUp).forEach((f: any) => {
      form.getTextField(f).setText(matchUp[f]);
    });
  });

  // HdM
  form
    .getTextField('Historique')
    .setText(
      `${document.getElementById('ParcoursListID')?.innerText}\n${
        document.getElementById('EventListID')?.innerText
      }`
    );

  /*
  const arr: any = {};
  const fields = form.getFields();
  fields.forEach((field) => {
    const name = field.getName();
    arr[name] = name;
  });
  console.log(JSON.stringify(arr));
  */

  const pdfBytes = await pdfDoc.save();
  if (setPDF) {
    download(
      pdfBytes,
      `fiche_PJ_${myData.etape1.personnage}.pdf`,
      'application/pdf'
    );
  } else {
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const urlBytes = URL.createObjectURL(blob);
    setURL(urlBytes);
  }
}

// REACT FN
export default function Sample(props: any) {
  const { myData, secondaire, inventory } = props;
  const router = useRouter();
  const [pdfLink, setpdfLink]: any = useState(null);
  const lifePath: any = {};

  function handleChange() {
    fillForm(
      `${router.basePath}/assets/pdf/fiche_eric.pdf`,
      myData,
      secondaire,
      inventory,
      setpdfLink,
      true
    );
  }

  useEffect(() => {
    lifePath.events = document.getElementById('EventListID')?.innerText;
    lifePath.parcours = document.getElementById('ParcoursListID')?.innerText;
    fillForm(
      `${router.basePath}/assets/pdf/fiche_eric.pdf`,
      myData,
      secondaire,
      inventory,
      setpdfLink
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Heading as="h1" size="4xl" className="my-2 mb-6 text-center underline">
        Téléchargement
      </Heading>
      <Center>
        <ButtonGroup variant="outline" spacing="6">
          <Button minWidth={100} colorScheme="red" onClick={handleChange}>
            PDF
          </Button>
          <Button
            minWidth={100}
            colorScheme="orange"
            disabled
            // onClick={fillForm}
          >
            Let&apos;s Role
          </Button>
        </ButtonGroup>
      </Center>
      <Center marginTop={15}>
        {pdfLink ? (
          <object
            width="100%"
            height="400"
            data={pdfLink}
            type="application/pdf"
          />
        ) : null}
      </Center>
    </div>
  );
}
