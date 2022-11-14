import { type } from "os";

import wordsJson from "../words.json";

export interface Words {
  randomize: () => Array<Word>;
  fromJson: () => Array<Word>;
}

interface WordInterface {
  value: String;
  index: number;
  success: boolean;
}

export class Word implements WordInterface {
  value: String;
  index: number;
  success: boolean;
  seen: boolean;
  constructor(value: String, index: number) {
    this.value = value;
    this.index = index;
    this.success = false;
    this.seen = false;
  }
}
function randomize(): Array<Word> {
  const _words: Array<String> = wordsJson.sort(() => Math.random() - 0.5);
  const randomized: Array<Word> = [];
  for (const [index, value] of _words.entries()) {
    randomized.push(new Word(value, index));
  }
  // console.log(randomized.length);
  return randomized;
}
export { randomize };
