export const couleur = {
  bleu: '#007CAB', // équipement
  rose: '#96216E', // magie
  marron: '#7A440C', // artisanat
  rouge: '#A70C11', // combat
  vert: '#21772F', // lore
  violet: '#592B6E', // MJ
  kaki: '#585F42', // Sorceleur
  gris: '#4C6470', // relique
  noir: '#4C6470', // bestiaire
  bleuClair: '#24408F', // aventure
};
export const nameColor: any = {
  Artisanat: '#7A440C', // marron
  Aventure: '#24408F', // bleu clair
  Bestiaire: '#4C6470', // noir
  Combat: '#A70C11', // rouge
  Équipement: '#007CAB', // bleu
  Lore: '#21772F', // vert
  Magie: '#96216E', // rose
  MJ: '#592B6E', // violet
  Relique: '#4C6470', // gris
  Sorceleur: '#585F42', // kaki
};

export interface EditorProps {
  type: string;
  bordure: string;
  numéro: Number;
  style: boolean;
  annotation: Array<any>;
  children: Array<any>;
}

export const debounce = (func: any, delay: number) => {
  let debounceTimer: any;
  // eslint-disable-next-line func-names
  return function (this: any) {
    const context = this;
    // eslint-disable-next-line prefer-rest-params
    const args = arguments;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(context, args), delay);
  };
};
