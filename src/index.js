import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './styles.css';

const blueBar = process.env.PUBLIC_URL + "/assets/barra.png"
const favicon = process.env.PUBLIC_URL + "/assets/favicon.ico"
const logo = process.env.PUBLIC_URL + "/assets/logo.jpg"
const imgX = process.env.PUBLIC_URL + "/assets/x.png"
const imgO = process.env.PUBLIC_URL + "/assets/o.png"
const restart = process.env.PUBLIC_URL + "/assets/restart.png"

const Square = ({ xIsNext, modifyXIsnext, index, changeList, winner, list }) => {

    const [ value, setValue ] = useState(null);
    useEffect(
        () => {
            if (list.every((element) => element === null)) {
                setValue(null);
            }
        },
        [ list, value ]
    );

    const cambiaGiocatore = () => {
        //controllo che la casella non sia già stata cliccata
        if (!value && !winner) {
            setValue(xIsNext ? 'X' : 'O');
            changeList(index - 1, xIsNext ? 'X' : 'O');
            //cambio il valore di xIsNext
            modifyXIsnext();
        }
    };
    return (
        <zoomIn><button className="square" onClick={cambiaGiocatore}>
            {
            value === "X" ? 
              <zoomIn><img className="movesGrid" src={imgX}></img></zoomIn>: 
              value === "O" ? 
                <img className="movesGrid" src={imgO}></img>: 
                value
            }
        </button></zoomIn>
    );
};
let listaRisultati = [];
const Board = () => {
    const [ xIsNext, setxIsNext ] = useState(true);
    const [ squares, setSquares ] = useState(Array(9).fill(null));

    const handlePlayerChange = () => {
        setxIsNext(!xIsNext);
    };
    const handleListChange = (index, val) => {
        if (!winner) {
            setSquares(
                squares.map((e, i) => {
                    if (index === i) {
                        e = val;
                    }
                    return e;
                })
            );
        }
    };
    const ricomincia = () => {
        setSquares(Array(9).fill(null));
        setxIsNext(true);
    };
    let status;
    const winner = calculateWinner(squares);
    if (winner && winner !== true) {
        status = <div>Vincitore: {winner === "X" ? <img className="moves" src={imgX}></img> : <img className="moves" src={imgO}></img>}</div>;
        if (winner === 'X') {
            listaRisultati.push(0);
        } else {
            listaRisultati.push(1);
        }
    } else if (winner === null) {
        status = <div>Prossimo giocatore: {xIsNext ? <img className="moves" src={imgX}></img> : <img className="moves" src={imgO}></img>}</div>;
    } else {
        status = <div style={{marginTop:"28px"}}>Nessun giocatore ha vinto </div>;
        listaRisultati.push(3);
    }
    for (let i = 0; i < 9; i++) {
        <div>
            <Square
                xIsNext={xIsNext}
                modifyXIsnext={handlePlayerChange}
                index={i}
                changeList={handleListChange}
                winner={winner}
                list={squares}
            />
        </div>;
    }
    return (
        <div>
            <div className="status">
              {status}
            </div>
            <img src={blueBar} className="blueBar"></img>
            <div id="grid">
            <div className="board-row">
                <Square
                    xIsNext={xIsNext}
                    modifyXIsnext={handlePlayerChange}
                    index={1}
                    changeList={handleListChange}
                    winner={winner}
                    list={squares}
                />
                <Square
                    xIsNext={xIsNext}
                    modifyXIsnext={handlePlayerChange}
                    index={2}
                    changeList={handleListChange}
                    winner={winner}
                    list={squares}
                />
                <Square
                    xIsNext={xIsNext}
                    modifyXIsnext={handlePlayerChange}
                    index={3}
                    changeList={handleListChange}
                    winner={winner}
                    list={squares}
                />
            </div>
            <div className="board-row">
                <Square
                    xIsNext={xIsNext}
                    modifyXIsnext={handlePlayerChange}
                    index={4}
                    changeList={handleListChange}
                    winner={winner}
                    list={squares}
                />
                <Square
                    xIsNext={xIsNext}
                    modifyXIsnext={handlePlayerChange}
                    index={5}
                    changeList={handleListChange}
                    winner={winner}
                    list={squares}
                />
                <Square
                    xIsNext={xIsNext}
                    modifyXIsnext={handlePlayerChange}
                    index={6}
                    changeList={handleListChange}
                    winner={winner}
                    list={squares}
                />
            </div>
            <div className="board-row">
                <Square
                    xIsNext={xIsNext}
                    modifyXIsnext={handlePlayerChange}
                    index={7}
                    changeList={handleListChange}
                    winner={winner}
                    list={squares}
                />
                <Square
                    xIsNext={xIsNext}
                    modifyXIsnext={handlePlayerChange}
                    index={8}
                    changeList={handleListChange}
                    winner={winner}
                    list={squares}
                />
                <Square
                    xIsNext={xIsNext}
                    modifyXIsnext={handlePlayerChange}
                    index={9}
                    changeList={handleListChange}
                    winner={winner}
                    list={squares}
                />
            </div>
            </div>
            <img src={blueBar} className="blueBar"></img>
            <div id="restart-container">
              <button id="restart-button" onClick={() => ricomincia()}>
                  <img id="restart" src={restart}></img>
              </button>
            </div>
            
            {listaRisultati.length > 0 ?
              <div className="lista-risultati">
                <h2>Storico partite:</h2>
                {
                listaRisultati.map((e, i) => {
                    if (e === 0) {
                        return <p>{i + 1}. Il giocatore X ha vinto</p>;
                    } else if (e === 1) {
                        return <p> {i + 1}. Il giocatore O ha vinto</p>;
                    } else {
                        return <p> {i + 1}. Nessuno ha vinto</p>;
                    }
                })
                }
              </div> : null
            }
                
        </div>
    );
};
const Game = () => {
    document.title = "Tris - by KMZ"
    document.getElementById("favicon").href = favicon
    return (
        <div>
            <div className="title">
                <img src={logo} id="logo"></img>
            </div>
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
            </div>
        </div>
    );
};
// ========================================
const calculateWinner = (squares) => {
    const lines = [
        [ 0, 1, 2 ],
        [ 3, 4, 5 ],
        [ 6, 7, 8 ],
        [ 0, 3, 6 ],
        [ 1, 4, 7 ],
        [ 2, 5, 8 ],
        [ 0, 4, 8 ],
        [ 2, 4, 6 ]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [ a, b, c ] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    if (squares.every((element) => element !== null)) {
        return undefined;
    }
    return null;
};

ReactDOM.render(<Game />, document.getElementById('root'));