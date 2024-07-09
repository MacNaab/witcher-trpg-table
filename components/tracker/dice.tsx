export interface RollResult {
    formula: string;
    explode: boolean;
    rolls: number[];
    total: number;
}

export function rollDice(formula: string, explode: boolean = false): RollResult {
    const dicePattern = /(\d+)d(\d+)([+-]\d+)?/;
    const match = formula.match(dicePattern);

    if (!match) {
        throw new Error('Invalid dice formula');
    }

    const numDice = parseInt(match[1], 10);
    const dieSides = parseInt(match[2], 10);
    const modifier = match[3] ? parseInt(match[3], 10) : 0;

    let rolls: number[] = [];
    let total = 0;

    for (let i = 0; i < numDice; i++) {
        let roll = Math.floor(Math.random() * dieSides) + 1;
        rolls.push(roll);
        total += roll;

        if (explode) {
            if (roll === dieSides) {
                while (roll === dieSides) {
                    roll = Math.floor(Math.random() * dieSides) + 1;
                    rolls.push(roll);
                    total += roll;
                }
            } else if (roll === 1) {
                roll = Math.floor(Math.random() * dieSides) + 1;
                rolls.push(-roll);
                total -= (roll + 1);
                while (roll === dieSides) {
                    roll = Math.floor(Math.random() * dieSides) + 1;
                    rolls.push(-roll);
                    total -= roll;
                }
            }
        }
    }

    total += modifier;

    return {
        formula,
        explode,
        rolls,
        total
    };
}
