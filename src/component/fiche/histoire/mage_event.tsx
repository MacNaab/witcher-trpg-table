import parcours from '@/public/assets/json/fiche/parcours_mage.json';

function rand(max: number) {
  return Math.floor(Math.random() * max);
}

function getID(Time: string) {
  switch (Time) {
    case 'Prudent':
      return {
        id: 'Cautious',
        danger: 20,
        benefit: 1,
        allies: 2,
        knowledge: 3,
      };
    case 'Politique':
      return {
        id: 'Politicking',
        danger: 50,
        benefit: 2,
        allies: 7,
        knowledge: 8,
      };
    case 'Expérimentation':
      return {
        id: 'Experimentation',
        danger: 70,
        benefit: 3,
        allies: 4,
        knowledge: 10,
      };
    case 'Étude magique':
      return {
        id: 'Experimentation',
        danger: 50,
        benefit: 5,
        allies: 7,
        knowledge: 8,
      };
    default:
      return null;
  }
}

function allyTable() {
  const closeRoll = rand(10);
  function closeIndex() {
    if (closeRoll < 6) {
      return 0;
    }
    if (closeRoll < 9) {
      return 1;
    }
    return 2;
  }
  return {
    profession: parcours.Allies.Profession[rand(10)],
    how: parcours.Allies.How[rand(10)],
    closeness: parcours.Allies.Closeness[closeIndex()],
    value: parcours.Allies.Power[rand(5)],
  };
}

function dangerTable(type: string) {
  const roll = rand(10);
  if (type === 'Politicking') {
    const grudgeNumbers = [0, 4, 8];
    if (grudgeNumbers.includes(roll)) {
      const danger: any = parcours.danger.Politicking[roll];
      danger.grudge = {
        profession: parcours.Grudges.Profession[rand(10)],
        cause: parcours.Grudges.Cause[rand(10)],
        escalation: parcours.Grudges.Escalation[rand(10)],
        power: parcours.Grudges.Power[rand(5)],
      };
      if (roll === 4) {
        danger.grudge.power = 'Sbires';
      }
      if (roll === 8) {
        danger.grudge.cause = `Vous avez: ${danger.grudge.cause}`;
      }
      return danger;
    }
  }
  const clone: any = parcours.danger;
  return clone[type][roll];
}

/*
Prudent
Politique
Expérimentation
Étude magique
*/

export default function Event(Time: string) {
  const ID = getID(Time);
  if (ID) {
    const dangerRoll = rand(100);
    if (dangerRoll < ID.danger) {
      // Danger Table
      return {
        event: 'Danger',
        data: dangerTable(ID.id),
      };
    }
    const eventsRoll = rand(10);
    if (eventsRoll < ID.benefit) {
      // Benefit Table
      return {
        event: 'Bénéfice',
        data: parcours.Benefit[rand(10)],
      };
    }
    if (eventsRoll < ID.allies) {
      // Ally Table
      return {
        event: 'Allier',
        data: allyTable(),
      };
    }
    if (eventsRoll < ID.knowledge) {
      // Knowledge Table
      return {
        event: 'Connaissances',
        data: parcours.Knowledge[rand(10)],
      };
    }
    return {
      event: 'Rien',
      data: 'Rien de notable ne s’est produit lors de cette décennie.',
    };
  }
  return null;
}
