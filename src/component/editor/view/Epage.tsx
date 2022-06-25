import { useEffect, useState, useRef } from 'react';

import { Button, Center, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { nameColor, debounce } from '@/utils/editor';

import Einput from './E/Input';
import Enumber from './E/Number';
import Eselect from './E/Select';
import Eswitch from './E/Switch';

const ColorList = Object.keys(nameColor)?.map((e) => (
  <option className="text-black" key={`TW_Color_${e}`} value={e}>
    {e}
  </option>
));

export default function Page(props: any) {
  const { data, index, updateData, delData } = props;
  const router = useRouter();
  const BGref: any = useRef();

  const handleChange = (event: any) => {
    event.persist();
    data[event.target.name] = event.target.value;
    updateData(index, data);
  };
  const optimisedHandleChange = debounce(handleChange, 500);

  const [myTemplate, setTemplate] = useState('');

  const TemplateLogo = {
    type: 'vierge',
    bordure: 'Aventure',
    numéro: 0,
    style: false,
    columnCount: 1,
    annotation: [],
    children: [
      {
        type: 'image',
        data: {
          src: `${router.basePath}/assets/images/editor/logo.png`,
          h: '',
          position: 'absolute',
          w: '1000',
          centrer: true,
        },
      },
    ],
    BG: 'black',
  };
  const TemplateCouv = {
    type: 'vierge',
    bordure: 'Aventure',
    numéro: 0,
    style: false,
    columnCount: 1,
    annotation: [],
    children: [
      { type: 'marge', data: { h: '600' } },
      {
        type: 'image',
        data: {
          src: 'https://upload.wikimedia.org/wikipedia/he/5/53/The_Witcher_video_game_series_logo.png',
          position: 'relative',
          centrer: true,
          columnSpan: false,
        },
      },
      { type: 'marge', data: { h: '5' } },
      {
        type: 'titre',
        data: {
          text: 'titre de mon aventure',
          fontSize: '50',
          centrer: true,
          color: 'gold',
          textStroke: true,
        },
      },
      {
        type: 'titre',
        data: {
          text: 'une aventure passionnante',
          fontSize: '28',
          color: 'white',
          centrer: true,
        },
      },
    ],
    BG: 'url(https://gwent.one/image/gwent/assets/card/art/max/1996.jpg) no-repeat center center',
  };
  const TemplateQuarte = {
    type: 'vierge',
    bordure: 'Aventure',
    numéro: 0,
    style: false,
    columnCount: 2,
    annotation: [],
    children: [
      {
        type: 'image',
        data: {
          src: 'https://gwent.one/image/gwent/assets/card/art/max/1916.jpg',
          position: 'absolute',
          w: '1000',
          yn: 'top',
          yv: '0',
          xn: 'left',
          xv: '0',
        },
      },
      {
        type: 'image',
        data: {
          src: `${router.basePath}/assets/images/editor/lodiciquarte.png`,
          position: 'absolute',
          w: '1000',
          yn: 'bottom',
          yv: '0',
          xn: 'left',
          xv: '0',
        },
      },
      {
        type: 'image',
        data: {
          src: `${router.basePath}/assets/images/editor/TRPG.png`,
          h: '85',
          position: 'absolute',
          yn: 'bottom',
          yv: '5',
          xn: 'right',
          xv: '100',
        },
      },
      {
        type: 'image',
        data: {
          src: `${router.basePath}/assets/images/editor/logo_nobg.png`,
          h: '90',
          position: 'absolute',
          yn: 'bottom',
          yv: '10',
          xn: 'left',
          xv: '100',
        },
      },
      { type: 'marge', data: { h: '700', columnSpan: true } },
      {
        type: 'paragraphe',
        data: {
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras nulla urna, eleifend at enim ac, faucibus malesuada leo. Fusce viverra augue erat, eget mollis mi scelerisque ac. Cras cursus leo elit, at consectetur velit fringilla nec.',
          columnSpan: true,
        },
      },
      { type: 'marge', data: { h: '200', columnSpan: true } },
      {
        type: 'titre',
        data: {
          text: 'The Witcher le Jeu de Rôle Officiel',
          fontSize: '18',
          centrer: true,
          columnSpan: true,
          color: 'black',
        },
      },
      {
        type: 'titre',
        data: {
          text: 'La communauté FR',
          fontSize: '15',
          centrer: true,
          columnSpan: true,
          color: '#dc3545',
        },
      },
    ],
    BG: 'none',
  };

  const TemplateQuarte2 = {
    type: 'vierge',
    bordure: 'Aventure',
    numéro: 0,
    style: false,
    columnCount: 2,
    annotation: [],
    children: [
      {
        type: 'image',
        data: {
          src: 'https://gwent.one/image/gwent/assets/card/art/max/1916.jpg',
          position: 'absolute',
          w: '1000',
          yn: 'top',
          yv: '0',
          xn: 'left',
          xv: '0',
        },
      },
      {
        type: 'image',
        data: {
          src: `${router.basePath}/assets/images/editor/lodiciquarte2.png`,
          position: 'absolute',
          w: '1000',
          yn: 'bottom',
          yv: '0',
          xn: 'left',
          xv: '0',
        },
      },
      {
        type: 'image',
        data: {
          src: `${router.basePath}/assets/images/editor/TRPG.png`,
          h: '85',
          position: 'absolute',
          yn: 'bottom',
          yv: '5',
          xn: 'right',
          xv: '100',
        },
      },
      {
        type: 'image',
        data: {
          src: `${router.basePath}/assets/images/editor/logo_nobg.png`,
          h: '90',
          position: 'absolute',
          yn: 'bottom',
          yv: '10',
          xn: 'left',
          xv: '100',
        },
      },
      { type: 'marge', data: { h: '700', columnSpan: true } },
      {
        type: 'paragraphe',
        data: {
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras nulla urna, eleifend at enim ac, faucibus malesuada leo. Fusce viverra augue erat, eget mollis mi scelerisque ac. Cras cursus leo elit, at consectetur velit fringilla nec.',
          columnSpan: true,
        },
      },
      { type: 'marge', data: { h: '200', columnSpan: true } },
      {
        type: 'titre',
        data: {
          text: 'The Witcher le Jeu de Rôle Officiel',
          fontSize: '18',
          centrer: true,
          columnSpan: true,
          color: 'black',
        },
      },
      {
        type: 'titre',
        data: {
          text: 'La communauté FR',
          fontSize: '15',
          centrer: true,
          columnSpan: true,
          color: '#dc3545',
        },
      },
    ],
    BG: 'none',
  };

  useEffect(() => {
    switch (myTemplate) {
      case 'logo':
        updateData(index, TemplateLogo);
        break;
      case 'couverture':
        updateData(index, TemplateCouv);
        break;
      case 'quarte':
        updateData(index, TemplateQuarte);
        break;
      case 'quarte2':
        updateData(index, TemplateQuarte2);
        break;
      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myTemplate]);

  useEffect(() => {
    if (BGref.current) {
      if (BGref.current.value !== data.BG) {
        BGref.current.value = data.BG;
      }
    }
  }, [data.BG]);

  return (
    <>
      <Text>Position: #{index + 1}</Text>
      <Eselect
        label="Type de page: "
        placeholder="Type"
        defaultValue={data.type}
        onChange={(e: any) => {
          data.type = e.target.value;
          updateData(index, data);
        }}
      >
        <option className="text-black" value="vierge">
          Vierge
        </option>
        <option className="text-black" value="pair">
          Page pair
        </option>
        <option className="text-black" value="impair">
          Page impair
        </option>
      </Eselect>
      {data.type === 'vierge' ? null : (
        <>
          <Eselect
            label="Type de bordure: "
            defaultValue={data.bordure}
            placeholder="Type"
            onChange={(e: any) => {
              data.bordure = e.target.value;
              updateData(index, data);
            }}
          >
            {ColorList}
          </Eselect>
          <Enumber
            maxWidth={100}
            defaultValue={data.numéro}
            onChange={(e: any) => {
              data.numéro = e;
              updateData(index, data);
            }}
          >
            Numéro de page:
          </Enumber>
        </>
      )}
      <Eswitch
        defaultChecked={data.style}
        onChange={(e: any) => {
          data.style = e.target.checked;
          updateData(index, data);
        }}
        size="lg"
      >
        Annotation:
      </Eswitch>
      {data.type === 'vierge' ? (
        <>
          <Einput
            ref={BGref}
            name="BG"
            defaultValue={data.BG}
            onChange={optimisedHandleChange}
            placeholder="Couleur"
          >
            Background:{' '}
          </Einput>
          <Eselect
            label="Template: "
            placeholder="Template"
            onChange={(e: any) => {
              setTemplate(e.target.value);
            }}
          >
            <option className="text-black" value="couverture">
              Couverture
            </option>
            <option className="text-black" value="logo">
              Logo
            </option>
            <option className="text-black" value="quarte">
              Lodiciquarte (diagonale)
            </option>
            <option className="text-black" value="quarte2">
              Lodiciquarte (droit)
            </option>
          </Eselect>
        </>
      ) : null}
      <Center>
        <Button
          onClick={() => delData(index)}
          colorScheme="red"
          size="lg"
          variant="outline"
          borderWidth={3}
        >
          Supprimer
        </Button>
      </Center>
    </>
  );
}
