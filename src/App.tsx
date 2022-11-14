
import React, { useEffect, useState } from "react";

import { randomize, Word } from "./service/wordService";


import './App.css';
import { Words } from "./components/words";





/**
 * Write a React UI that starts a 60 second game for a typing test. 
 * 
 * The test should show you words to type as fast as possible.
 * 
 * When starting, random words should line up for typing from the word bank below.
 * You should track character typing and typos as you see fit.
 * Pressing space should conclude a word and progress to the next word.
 * At the end of the game, show statistics such as the correct word count, number of mistakes, speed in Words Per Minute, and anything else you can think of.
 * 
 */
function App() {


  const [words , setWords] = useState<Array<Word>>([]);
  const [rows, setRows] = useState<Array<Array<Word>>>([]);
  const [currentRow, setCurrentRow] = useState(0)


  useEffect(() => {
    const randomizedWords = randomize();
    // Create rows : Array<Word>
    // A row contains <= 5 Word
    const tempRows = [];
    let currentRow = [];
    for (let i = 0; i < randomizedWords.length; i ++) {
     if (currentRow.length === 5){
        currentRow = [];
        tempRows.push(currentRow);
     } else {
       currentRow.push(randomizedWords[i])
      }
    }
    console.log(tempRows);
    setWords(randomizedWords);
    setRows(tempRows);
  }, []);



  return (
    <div className="App">
        <Words rows={rows} currentRow={ currentRow} />      
    </div>
  );
}

export default App;
