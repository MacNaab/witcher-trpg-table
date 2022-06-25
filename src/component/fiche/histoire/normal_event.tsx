import parcours from '@/public/assets/json/fiche/events_normal.json';

function rand(max: number) {
  return Math.floor(Math.random() * max);
}

function allier() {
  const sexe = rand(2);

  const procheRoll = rand(10);
  let proche = '';
  if (procheRoll < 4) {
    proche = 'Connaissances';
  } else if (procheRoll < 6) {
    proche = 'Amis';
  } else if (procheRoll < 8) {
    proche = 'Amis proches';
  } else if (procheRoll < 9) {
    proche = 'Inséparables';
  } else {
    proche = 'À la vie, à la mort';
  }

  const régionRoll = rand(10);
  let région = '';
  if (régionRoll < 3) {
    région = 'Royaumes du Nord';
  } else if (régionRoll < 6) {
    région = 'Empire de Nilfgaard';
  } else if (régionRoll < 9) {
    région = 'Terres des races anciennes';
  } else {
    région = 'Au-delà des frontières du monde connu';
  }

  return {
    Genre: sexe === 0 ? 'Homme' : 'Femme',
    Statut: parcours.Allier.Statut[rand(10)],
    Circonstances: parcours.Allier.Rencontre[rand(10)],
    Proche: proche,
    Région: région,
  };
}
function ennemie() {
  const sexe = rand(2);
  const victime = rand(2);

  return {
    Genre: sexe === 0 ? 'Homme' : 'Femme',
    Statut: parcours.Ennemi.Statut[rand(10)],
    Circonstances: parcours.Ennemi.Cause[rand(10)],
    Victime:
      victime === 0 ? 'Vous avez offensé quelqu’un' : 'Vous êtes la victime',
    Puissance: rand(10) + 1,
    Rivalité: parcours.Ennemi.Rivalité[rand(5)],
    Domaine: parcours.Ennemi.Domaine[rand(5)],
  };
}

function amour() {
  const roll = rand(10);
  if (roll === 0) {
    // 1 Histoire idyllique
    return {
      nom: 'Histoire idyllique',
      desc: parcours.Amour.Idylle,
    };
  }
  if (roll < 4) {
    // 2-4 Tragédie romantique
    return {
      nom: 'Tragédie romantique',
      desc: parcours.Amour.Tragédie[rand(10)],
    };
  }
  if (roll < 6) {
    // 5-6 Relations compliquées
    return {
      nom: 'Relations compliquées',
      desc: parcours.Amour.Problème[rand(10)],
    };
  }
  // 7-10 Débauche et prostituées
  return {
    nom: 'Débauche',
    desc: parcours.Amour.Débauche,
  };
}

export default function Event() {
  const roll = rand(10);
  if (roll < 4) {
    // 1-4 Chanceux ou malchanceux
    const roll2 = rand(2);
    if (roll2 === 0) {
      // Malchance
      return {
        type: 'Malchance',
        data: parcours.Malchance[rand(10)],
      };
    }
    // Chance
    return {
      type: 'Chance',
      data: parcours.Chance[rand(10)],
    };
  }
  if (roll < 7) {
    // 5-7 Alliés et ennemis
    const roll2 = rand(2);
    if (roll2 === 0) {
      // Ennemie
      return {
        type: 'Ennemie',
        data: ennemie(),
      };
    }
    // Allier
    return {
      type: 'Allier',
      data: allier(),
    };
  }
  // 8-10 Liaison amoureuse
  return {
    type: 'Liaison amoureuse',
    data: amour(),
  };
}
