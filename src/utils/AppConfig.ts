export const AppConfig = {
  site_name: 'The Witcher TRPG tables',
  title: 'The Witcher TRPG tables',
  description: 'Divers outils pour le JdR The Witcher.',
  locale: 'fr',
};

export const myURL = 'http://localhost:3000/';

export interface TableListProps {
  id: string;
  nom: string;
  description: string;
  tag: Array<string>;
}

export interface PopProps {
  nom: string;
  description: string;
}

export const ComptFromCaract = {
  INT: [
    'CRUE',
    'CMON',
    'DED',
    'EDU',
    'ENS',
    'ETI',
    'LAN',
    'LCO',
    'LNA',
    'SUR',
    'TAC',
    'VIG',
  ],
  REF: ['BAG', 'BAT', 'EQU', 'ESC', 'LAM', 'MEL', 'NAV'],
  DEX: ['ADR', 'ARB', 'ARC', 'ATH', 'FUR'],
  COR: ['PHY', 'RES'],
  EMP: ['BEA', 'CHA', 'COM', 'DUP', 'JEU', 'PER', 'PSY', 'REP', 'SED', 'STY'],
  TEC: ['ALC', 'ART', 'CON', 'CRO', 'DEG', 'FPI', 'PSO'],
  VOL: ['COU', 'ENV', 'INC', 'INT', 'RCO', 'RMA', 'RIT'],
};
