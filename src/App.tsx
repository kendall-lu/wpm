
import React, { useEffect, useState } from "react";

import { randomize, Statistic, Word } from "./service/wordService";
import './App.css';
import { Words } from "./components/words";

/**
 * bug: 
 * When timer hits 0 and user continues to type, we need to create a new Statistic()
 * 
 */
function App() {


  const [words, setWords] = useState<Array<Word>>([]);
  const [rows, setRows] = useState<Array<Array<Word>>>([]);
  const [rowIndex, setRowIndex] = useState<number>(0);
  const [wordIndex, setWordIndex] = useState<number>(0);
  const [inputValue, setInputValue] = useState<String>('');
  const [seconds, setSeconds] = useState(60);
  const [hasStarted, setHasStarted] = useState(false);
  const [statistics, setStatistics] = useState<Statistic>();


  const handleInputChange = (e) => {
    if (!hasStarted) startGame(true);
    setInputValue(e.target.value);
  };

  const handleSpace = (e) => {
    const input = e.target.value;
    if (e.keyCode === 32) {
      setInputValue("");
      const nextWordIndex = wordIndex + 1;
      const currentWord: Word = rows[rowIndex][wordIndex];
      currentWord.onComplete(input);
      statistics.onCompleted(currentWord.correct, currentWord.value.length);
      setStatistics(statistics);
      if (nextWordIndex > rows[rowIndex].length - 1) {
        setRowIndex(rowIndex + 1);
        setWordIndex(0);
      } else {
        setWordIndex(nextWordIndex);
      }
    }
  };
  useEffect(() => {
    if (hasStarted && seconds <= 60 && seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
    } else {
      setSeconds(60);
      setHasStarted(false);
    }
  }, [seconds, hasStarted])

  const startGame = (isInput = false) => {

    if (isInput) {
      setHasStarted(true);
    } else {
      init();
      setHasStarted(false)
    }
  }
  const init = () => {
    const randomizedWords = randomize();
    // Create rows : Array<Word>
    // A row contains <= 5 Word
    const tempRows = [];
    let currentRow = [];
    for (let i = 0; i < randomizedWords.length; i++) {

      if (currentRow.length === 5) {
        tempRows.push(currentRow);
        currentRow = [];
      } else {
        currentRow.push(randomizedWords[i])
      }
    }
    setWords(randomizedWords);
    setRows(tempRows);
    setRowIndex(0);
    setWordIndex(0);
    setStatistics(new Statistic());
  }
  useEffect(() => {
    init();

  }, []);



  return (
    <div className="app">
      <Timer
        seconds={seconds}
        startGame={startGame} />
      <Directions />
      <div className='words'>
        <Words
          rows={rows}
          rowIndex={rowIndex}
          wordIndex={wordIndex}
          inputValue={inputValue} />
        <InputField
          inputValue={inputValue}
          handleInputChange={handleInputChange}
          handleSpace={handleSpace} />
      </div>
      < Statistics
        statistics={statistics}
        seconds={seconds}
      />
    </div >
  );
}
const Directions = () => {
  return <div>
    <div className="directions"><span>How fast are your fingers? Do the one-minute typing test to find out! Press the space bar after each word. At the end, you'll get your typing speed in CPM and WPM. Good luck!</span></div>
  </div>
}
const InputField = ({ inputValue, handleInputChange, handleSpace }) => {
  return (
    <div className='input'>
      <input
        id='input'
        type="text"
        placeholder='Type...'
        value={inputValue.trim()}
        onChange={handleInputChange}
        onKeyDown={handleSpace}
      />
    </div>
  );
};
const Timer = ({ seconds, startGame }) => {
  return (
    <div>
      <div className="timer" role="timer">
        <div className="box">
          <button className="restart-button" onClick={() => startGame(false)}>Restart</button>
        </div>
        <div className="col-1">
          <div className="timer-countdown">
            <p>{seconds < 10 ? "0" + seconds : seconds}</p>
            <span className="text">Seconds</span>
          </div>
        </div>
      </div>
    </div>


  );
};
const Statistics = ({ statistics, seconds }) => {
  const [accuracy, setAccuracy] = useState<number>(0);
  const [wpm, setWpm] = useState<number>(0);
  useEffect(() => {
    if (seconds < 60) {
      const currentAccuracy = Math.round((statistics.correct / statistics.attempted) * 100);
      console.log(currentAccuracy)
      if (currentAccuracy > 0) {
        setAccuracy(currentAccuracy);
        setWpm(Math.floor(statistics.keystrokes / (60 - seconds) * currentAccuracy))
      }
    }
  }, [seconds])
  return seconds < 60 ? <div>
    <div className="statistics" role="timer">
      <div className="accuracy">
        <div className="box">
          <span className="text">{accuracy}% Correct</span>
        </div>
      </div>
      <div className="wpm">
        <div className="box">
          <span className="text">{wpm} WPM</span>
        </div>
      </div>
    </div>
  </div > : <div />;
};

export default App;
