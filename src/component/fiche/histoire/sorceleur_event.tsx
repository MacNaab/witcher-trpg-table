import parcours from '@/public/assets/json/fiche/events_witcher.json';

function rand(max: number) {
  return Math.floor(Math.random() * max);
}

function getID(Time: string) {
  switch (Time) {
    case 'Prudent':
      return {
        id: 'Cautious',
        Danger: 10,
        Bénéfices: 1,
        Allié: 2,
        Chasse: 3,
      };
    case 'Normal':
      return {
        id: 'Cautious',
        Danger: 25,
        Bénéfices: 1,
        Allié: 2,
        Chasse: 5,
      };
    case 'Non-neutre':
      return {
        id: 'Cautious',
        Danger: 50,
        Bénéfices: 2,
        Allié: 7,
        Chasse: 8,
      };
    case 'Risqué':
      return {
        id: 'Cautious',
        Danger: 75,
        Bénéfices: 5,
        Allié: 7,
        Chasse: 9,
      };
    default:
      return null;
  }
}

function dangerTable() {
  const roll = rand(10);
  if (roll < 3) {
    // Événements
    const e: any = parcours.Danger.Événement[rand(10)];
    e.dataType = 'Événements';
    return e;
  }
  if (roll < 6) {
    // Blessures
    const e: any = parcours.Danger.Blessure[rand(10)];
    e.dataType = 'Blessures';
    return e;
  }
  // Ennemis
  const lifeRoll = rand(100);
  let mort = null;
  if (lifeRoll < 30) {
    const deathRoll = rand(10);
    let deathIndex = 3;
    if (deathRoll < 3) {
      deathIndex = 0;
    } else if (deathRoll < 6) {
      deathIndex = 1;
    } else if (deathRoll < 9) {
      deathIndex = 2;
    }
    mort = parcours.Danger.Ennemi.Mort[deathIndex];
  }

  const e: any = {
    Genre: parcours.Danger.Ennemi.Genre[rand(2)],
    Profession: parcours.Danger.Ennemi.Profession[rand(5)],
    Cause: parcours.Danger.Ennemi.Cause[rand(5)],
    Influence: parcours.Danger.Ennemi.Influence[rand(5)],
    Conséquences: parcours.Danger.Ennemi.Conséquence[rand(5)],
    Vie: lifeRoll < 30 ? 'Mort' : 'Encore en vie',
    Mort: mort,
  };
  e.dataType = 'Ennemis';
  return e;
}

function allyTable() {
  const procheRoll = rand(10);
  let procheIndex = 3;
  if (procheRoll < 6) {
    procheIndex = 0;
  } else if (procheRoll < 9) {
    procheIndex = 1;
  }

  const lifeRoll = rand(100);
  let mort = null;
  if (lifeRoll < 30) {
    const deathRoll = rand(10);
    let deathIndex = 3;
    if (deathRoll < 3) {
      deathIndex = 0;
    } else if (deathRoll < 6) {
      deathIndex = 1;
    } else if (deathRoll < 9) {
      deathIndex = 2;
    }
    mort = parcours.Allié.Mort[deathIndex];
  }

  return {
    Genre: parcours.Allié.Genre[rand(2)],
    Statut: parcours.Allié.Statut[rand(10)],
    Circonstance: parcours.Allié.Circonstances[rand(10)],
    Proche: parcours.Allié.Proche[procheIndex],
    Vie: lifeRoll < 30 ? 'Mort' : 'Encore en vie',
    Mort: mort,
  };
}

function huntTable() {
  const retournementRoll = rand(10);
  const retournement =
    retournementRoll < 4 ? parcours.Chasse.Retournement[rand(10)] : false;
  return {
    type: parcours.Chasse.Type[rand(10)],
    emplacement: parcours.Chasse.Emplacement[rand(10)],
    resultat: parcours.Chasse.Résultat[rand(5)],
    retournement,
  };
}

export default function Event(Time: string) {
  const ID = getID(Time);
  if (ID) {
    const dangerRoll = rand(100);
    if (dangerRoll < ID.Danger) {
      // Danger Table
      return {
        event: 'Danger',
        data: dangerTable(),
      };
    }
    const eventsRoll = rand(10);
    if (eventsRoll < ID.Bénéfices) {
      return {
        event: 'Bénéfices',
        data: parcours.Bénéfices[rand(10)],
      };
    }
    if (eventsRoll < ID.Allié) {
      return {
        event: 'Allié',
        data: allyTable(),
      };
    }
    if (eventsRoll < ID.Chasse) {
      return {
        event: 'Chasse',
        data: huntTable(),
      };
    }
    return {
      event: 'Rien',
      data: 'Rien de notable ne s’est produit lors de cette décennie.',
    };
  }
  return null;
}
