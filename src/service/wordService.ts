import { type } from 'os';
import { number } from 'yargs';

import wordsJson from '../words.json';

export interface Words {
    randomize: () => Array<Word>;
    fromJson: () => Array<Word>;
}
export class Statistic {
    correct: number;
    attempted: number;
    keystrokes: number;
    constructor() {
        this.correct = 0;
        this.attempted = 0;
        this.keystrokes = 0;
    }
    onCompleted(correct: boolean, length: number) {
        this.correct += correct ? 1 : 0;
        this.attempted++;
        this.keystrokes += Math.floor(length / 5);
    }
}

export class Word {
    value: String;
    index: number;
    correct: boolean;
    seen: boolean;
    constructor(value: String, index: number) {
        this.value = value;
        this.index = index;
        this.correct = false;
        this.seen = false;
    }
    onComplete(value: String) {
        this.correct = this.value === value;
        this.seen = true;
    }
}
function randomize(): Array<Word> {
    const _words: Array<String> = wordsJson.sort(() => Math.random() - 0.5);
    const randomized: Array<Word> = [];
    for (const [index, value] of _words.entries()) {
        randomized.push(new Word(value, index));
    }

    return randomized;
}
export { randomize };
