function Words({ rows, rowIndex, wordIndex, inputValue }) {

  return <div className="col-1"> {rows.slice(rowIndex, rowIndex + 3).map((row, index) => {

    return <Row key={`row-${index}`}
      rows={rows}
      row={row}
      wordIndex={wordIndex}
      rowIndex={rowIndex}
      inputValue={inputValue}
    />;
  })} </div>

}


function Row({ rows, row, wordIndex, rowIndex, inputValue }) {

  return <div className='row'>
    <ul id='ul_row'>{row.map((word, index) => {
      return rows[rowIndex][wordIndex] === word ?
        <CurrentWord key={`currentRow-${index}`}
          word={word}
          inputValue={inputValue} />
        : <OtherWord word={word} />
    })}
    </ul>
  </div>;
}
function CurrentWord({ word, inputValue }) {

  let value: String = word.value;

  console.log({ word: word.value, inputValue });
  const currentWord = value.split('').map((str, index) => {
    let hasSeenLetter: boolean = index >= inputValue.length;
    let isMatch: boolean = str === inputValue[index];
    return <span id='word' key={`current-word-${index}`} style={{
      color: hasSeenLetter ?
        'black' : isMatch ?
          'white' : 'red', opacity: null
    }}><b>{str}</b>
    </span >
  });

  return <li key={`li-${word.index}`} style={
    {
      backgroundColor: '#01cc74',
      textAlign: 'center',
      color: word.success ?
        'black' : 'white'
    }
  }> {currentWord}</li >;
}
function OtherWord({ word }) {

  return <li key={`word-${word.index}`} style={
    {
      textAlign: 'center',
      color: !word.seen ? 'white' : word.correct ?
        'white' : 'red'
    }}> {word.value}</li >;
}


export { Words };