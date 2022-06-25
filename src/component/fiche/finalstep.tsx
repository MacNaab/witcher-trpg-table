import { Flex, Spacer, Heading, Text } from '@chakra-ui/react';

// import itemList from '@/public/assets/json/fiche/item.json';
import { Parcours } from '@/component/fiche/histoire/event';

function Line(props: any) {
  const { l, v } = props;
  return (
    <div>
      <b>{l}: </b>
      {v}
    </div>
  );
}

function EquipLine(props: any) {
  const { label, data } = props;
  if (data.length < 1) {
    return null;
  }
  return (
    <div className="mx-3">
      <b>{label}</b>
      <div className="flex flex-wrap">
        {data.map((e: any) => (
          <div className="mx-3" key={`final_step7_equip_${label}_${e}`}>
            {e}
          </div>
        ))}
      </div>
    </div>
  );
}

function RenderEvents(props: any) {
  const { data, profession } = props;
  switch (profession) {
    case 'Mage':
      if (data.event === 'Allier') {
        return (
          <div className="mx-3">
            <Heading size="md">{data.event}</Heading>
            <Text>
              {`Un(e) ${data.data.profession}. ${data.data.how}. Domaine d’influence: ${data.data.value}. Affinité: ${data.data.closeness}.`}
            </Text>
          </div>
        );
      }
      if (data.event === 'Rien') {
        return (
          <div className="mx-3">
            <Heading size="md">{data.event}</Heading>
            <Text>{data.data}</Text>
          </div>
        );
      }
      return (
        <div className="mx-3">
          <Heading size="md">{`${data.data.nom} (${data.event})`}</Heading>
          <Text>{data.data.desc}</Text>
          {data.data.grudge ? (
            <Text>
              {`Un(e) ${data.data.profession}. ${data.data.cause}. Domaine d’influence: ${data.data.power}. ${data.data.escalation}.`}
            </Text>
          ) : null}
        </div>
      );
    case 'Sorceleur':
      if (data.event === 'Danger') {
        if (data.data.dataType === 'Ennemis') {
          // {
          //  "event": "Danger",
          //  "data": { "Genre": "Femme", "Profession": "Marchand", "Cause": "Il vous a trompé", "Influence": "Physique", "Conséquences": "Vous pourchasse", "Vie": "Mort", "Mort": "Vous l’avez tué" } }
          return (
            <div className="mx-3">
              <Heading size="md">{`${data.data.nom} (Danger)`}</Heading>
              <Text>
                {data.data.Genre === 'Femme' ? 'Une ' : 'Un '}
                {data.data.Profession}. Influence: {data.data.Influence}.{' '}
                {data.data.Cause}. {data.data.Conséquences}
              </Text>
              <Text>
                Iel est: {data.data.Vie}
                {data.data.Vie === 'Mort' ? `: ${data.data.Mort}.` : '.'}
              </Text>
            </div>
          );
        }
        return (
          <div className="mx-3">
            <Heading size="md">
              {`${data.data.nom} (Danger)`}
              {data.data.malus ? ` ~ ${data.data.malus}` : null}
            </Heading>
            <Text>{data.data.description}</Text>
          </div>
        );
      }
      if (data.event === 'Bénéfices') {
        return (
          <div className="mx-3">
            <Heading size="md">{`${data.data.nom} (Bénéfices)`}</Heading>
            <Text>{data.data.description}</Text>
          </div>
        );
      }
      if (data.event === 'Allié') {
        return (
          <div className="mx-3">
            <Heading size="md">Allié</Heading>
            <Text>
              {data.data.Genre === 'Femme' ? 'Une ' : 'Un '}
              {data.data.Statut}. {data.data.Circonstance}. Vous êtes:{' '}
              {data.data.Proche}. Iel est: {data.data.Vie}
              {data.data.Vie === 'Mort' ? ` (${data.data.Mort})` : null}
            </Text>
          </div>
        );
      }
      if (data.event === 'Chasse') {
        return (
          <div className="mx-3">
            <Heading size="md">Chasse</Heading>
            <Text>
              Type: {data.data.type}, emplacement: {data.data.emplacement}.{' '}
              {data.data.resultat}.<br />
              {data.data.retournement ? data.data.retournement : null}
            </Text>
          </div>
        );
      }
      return (
        <div className="mx-3">
          <Heading size="md">{data.event}</Heading>
          <Text>{data.data}</Text>
        </div>
      );
    default:
      if (data.type === 'Ennemie') {
        // {"Genre":"Homme","Statut":"Soldat","Circonstances":"Responsable d’une attaque de monstres","Victime":"vous avez offensé quelqu’un","Puissance":5,"Rivalité":"Lui ou vous vous mettez en chasse pour obtenir réparation","Domaine":"Physique"}
        return (
          <div className="mx-3">
            <Heading size="md">{data.type}</Heading>
            <Text>
              {data.data.Genre === 'Homme' ? 'Un ' : 'Une '}
              {`${data.data.Statut}. Domaine: ${data.data.Domaine}, puissance: ${data.data.Puissance}/10`}
              <br />
              {`${data.data.Victime}: ${data.data.Circonstances}.`}
              <br />
              {data.data.Rivalité}.
            </Text>
          </div>
        );
      }
      if (data.type === 'Allier') {
        // {"Genre":"Femme","Statut":"Artisan","Circonstances":"Vous vous êtes rencontrés dans une taverne","Proche":"Connaissances","Région":"Au-delà des frontières du monde connu"}
        return (
          <div className="mx-3">
            <Heading size="md">{data.type}</Heading>
            <Text>
              {data.data.Genre === 'Homme' ? 'Un ' : 'Une '} {data.data.Statut}
              <br />
              {`${data.data.Circonstances}. Vous êtes: ${data.data.Proche}. Iel est actuellement ${data.data.Région}.`}
            </Text>
          </div>
        );
      }
      /*
      if (data.type === "Liaison amoureuse"){
        return (
          <div className="mx-3">
            <Heading size="md">{`${data.data.nom} (${data.type})`}</Heading>
            <Text>{data.data.desc}</Text>
          </div>
        );
      }
      */
      return (
        <div className="mx-3">
          <Heading size="md">{`${data.data.nom} (${data.type})`}</Heading>
          <Text>{data.data.desc}</Text>
        </div>
      );
  }
}

export default function Sample(props: any) {
  const { myData } = props;

  const tablePhy = Math.floor(0.5 * (myData.etape3.COR + myData.etape3.VOL));

  const secondaire: any = {
    VIG: myData.etape1.data.vigueur,
    ETOU: tablePhy > 10 ? 10 : tablePhy,
    COU: myData.etape3.VIT * 3,
    SAUT: Math.floor((myData.etape3.VIT * 3) / 5),
    PS: 5 * tablePhy,
    END: 5 * tablePhy,
    ENC: myData.etape3.COR * 10,
    REC: tablePhy,
  };

  const armor: any = [];
  const weapon: any = [];
  const item: any = [];
  const other: any = [];

  function recap7(array1: [any], array2: [any]) {
    array1.forEach((e) => {
      const found = array2.find((f: any) => f.nom === e);
      switch (found.type) {
        case 'Arme':
          weapon.push(e);
          break;
        case 'Armure':
          armor.push(e);
          break;
        case 'Item':
          item.push(e);
          break;
        default:
          other.push(e);
          break;
      }
    });
  }

  recap7(myData.etape7.static, myData.etape1.data.equipmentStatic);
  recap7(myData.etape7.equip, myData.etape1.data.equipement);

  /*
  const decadeList: any = [];
  Object.keys(myData.etape2).forEach((e) => {
    if (e.includes('decade')) {
      const ev = Event(myData.etape1.profession, myData.etape2[e]);
      decadeList.push(ev);
    }
  });
  */

  return (
    <div>
      <Heading as="h1" size="4xl" className="my-2 mb-6 text-center underline">
        Récapitulatif
      </Heading>
      <Heading>Informations:</Heading>
      <Flex>
        <Line l="Joueur" v={myData.etape1.joueur} />
        <Spacer />
        <Line l="Personnage" v={myData.etape1.personnage} />
        <Spacer />
        <Line l="Sexe" v={myData.etape1.sexe} />
        <Spacer />
        <Line l="Race" v={myData.etape1.race} />
        <Spacer />
        <Line l="Profession" v={myData.etape1.profession} />
      </Flex>
      <Heading>Parcours:</Heading>
      <Parcours profession={myData.etape1.profession} data={myData.etape2} />
      <Heading>Caractéristiques:</Heading>
      <div className="flex flex-wrap">
        {Object.keys(myData.etape3).map((e: any) => (
          <div className="mx-3" key={`final_step3_${e}`}>
            <b>{e}: </b>
            {myData.etape3[e]}
          </div>
        ))}
      </div>
      <div className="flex flex-wrap">
        {Object.keys(secondaire).map((e: any) => (
          <div className="mx-3" key={`final_step3_${e}`}>
            <b>{e}: </b>
            {secondaire[e]}
          </div>
        ))}
      </div>
      <Heading>Compétences:</Heading>
      <div className="flex flex-wrap">
        {Object.keys(myData.etape4).map((e: any) => (
          <div className="mx-3" key={`final_step4_${e}`}>
            <b>{e}: </b>
            {myData.etape4[e]}
          </div>
        ))}
        {Object.keys(myData.etape5).map((e: any) => (
          <div className="mx-3" key={`final_step5_${e}`}>
            <b>{e}: </b>
            {myData.etape5[e]}
          </div>
        ))}
      </div>
      {Object.keys(myData.etape6).length > 0 ? <Heading>Magie:</Heading> : null}
      <Heading>Équipement:</Heading>
      <EquipLine label="Arme" data={weapon} />
      <EquipLine label="Armure" data={armor} />
      <EquipLine label="Item" data={item} />
      <EquipLine label="Autre" data={other} />
      <Heading>Description:</Heading>
      <div className="mx-3">Âge: {myData.etape2.age} ans</div>
      {myData.etape7.desc ? (
        <div className="mx-3">{myData.etape7.desc}</div>
      ) : null}
      <Heading>Événements:</Heading>
      {myData.etape2.events.map((e: any, n: number) => (
        <RenderEvents
          key={`decadeList#${n}`}
          profession={myData.etape1.profession}
          data={e}
        />
      ))}
    </div>
  );
}
