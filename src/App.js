import { useState } from 'react';
import './App.css';

function App() {
  return (
    <div>
      <h1>TIC-TAC-TOE</h1>
      <Board></Board>
    </div>
  );
}

function Square({ value, onSquareClicked }) {
  return (
    <button className='square' onClick={onSquareClicked} style={{backgroundColor:value.color}}>
      {value.value===null?'_':value.value}
    </button>
  );
}

function Board() {

  const [square, setSquares] = useState(Array(9).fill({value:null,color:'white'}));
  const [turn,setTurn] = useState('X')
  const status = getStatus(square)
  console.log(turn)
  function handleClick(i) {
    if(square[i].value!==null || status.status === 'Draw' || status.status === 'Winner'){
      return
    }
    const newSquares = square.slice()
    newSquares[i] = {value: turn , color:'white'}
    if(turn==='X'){
      setTurn('O')
    }
    else{
      setTurn('X')
    }
    const postMoveStatus = getStatus(newSquares)
    if(postMoveStatus.status === 'Winner'){
      postMoveStatus.squares.forEach((i)=>{newSquares[i].color = 'green'})
    }
    setSquares(newSquares)
  }
  const statusString = status.status === 'Winner' ? 'Winner is '+ status.winner : status.status === 'Ongoing' ? turn + '\'s turn' : 'Draw'
  return (
    <>
    <h2>Status : {statusString}</h2>
      <div className="board-row">
        <Square value={square[0]} onSquareClicked={() => handleClick(0)} />
        <Square value={square[1]} onSquareClicked={() => handleClick(1)} />
        <Square value={square[2]} onSquareClicked={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={square[3]} onSquareClicked={() => handleClick(3)} />
        <Square value={square[4]} onSquareClicked={() => handleClick(4)} />
        <Square value={square[5]} onSquareClicked={() => handleClick(5)} />

      </div>
      <div className="board-row">
        <Square value={square[6]} onSquareClicked={() => handleClick(6)} />
        <Square value={square[7]} onSquareClicked={() => handleClick(7)} />
        <Square value={square[8]} onSquareClicked={() => handleClick(8)} />
      </div>
      <button className='reset' onClick={()=> setSquares(Array(9).fill({value:null,color:'white'}))} >Reset</button>
    </>
  );
}

function getStatus(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a].value && squares[a].value === squares[b].value && squares[a].value === squares[c].value && squares[a].value!==null) {
      return {
        status:'Winner',
        winner:squares[a].value,
        squares : lines[i]
      };
    }
  }
  if(squares.every(value => value.value === 'X' || value.value === 'O')){
    return {status:'Draw'}
  }
  return {status:'Ongoing'};
}

export default App;
