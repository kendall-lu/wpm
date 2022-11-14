import { useEffect, useState } from "react";
import { Word } from "../service/wordService";

function Words({  rows, currentRow}){

  return <div> {rows.slice(currentRow,currentRow + 3).map((row, index) => {
    return <Row key={`row-${index}`} row={row}/>;
  })}</div>;
}


function Row({row}) {
// console.log(row)
  return <ul id= 'ul_top_hypers'>{row.map((word, index)=>< CurrentWord key={`currentRow-${index}`} word = {word}/>)}</ul>;
}
function CurrentWord({ word }) {

  return <li key={word.index}>{word.value}</li>;
}


export {Words};