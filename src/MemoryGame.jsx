import React, { Component } from 'react';
import './MemoryGame.css';
import croc from './assets/animals/croc.svg';
import elephant from './assets/animals/elephant.svg';
import giraffe from './assets/animals/giraffe.svg';
import gorilla from './assets/animals/gorilla.svg';
import polarBear from './assets/animals/polar-bear.svg';
import tiger from './assets/animals/tiger.svg';
import whale from './assets/animals/whale.svg';
import koala from './assets/animals/koala.svg';

export default class MemoryGame extends Component {
    state = {
        cells: this.initializeCells(),
        open1: -1,
        open2: -1,
        gameOver: false
    };


    initializeCells() {
        let images = [
            croc, elephant, giraffe, gorilla, polarBear, tiger, whale, koala, croc, elephant, giraffe, gorilla, polarBear, tiger, whale, koala,
        ]
        return images.map((image, index) => ({
            image: image,
            open: false
        }));
    }

    handleCellClick(index) {
        const { open1, open2, cells, gameOver } = this.state;

        if (!gameOver) {
            if (open1 === -1) {
                cells[index].open = true;
                this.setState({ cells, open1: index });
            } else if (open2 === -1 && open1 !== index) {
                cells[index].open = true;
                this.setState({ cells, open2: index }, () => {
                    setTimeout(() => this.doCellsMatching(), 1000);
                });
            }
        }
    }

    doCellsMatching() {
        const { open1, open2, cells } = this.state;
        if (open1 !== -1 && open2 !== -1) {
            if (cells[open1].image === cells[open2].image) {
                cells[open1].image = null;
                cells[open2].image = null;
                this.checkGameOver(cells);
            } else {
                cells[open1].open = false;
                cells[open2].open = false;
            }

            this.setState({ cells, open1: -1, open2: -1 });
        }
    }

    checkGameOver(cells) {
        if (cells.every(cell => cell.image === null)) {
            this.setState({ gameOver: true });
        }
    }

    resetGame() {
        this.setState({
            cells: this.initializeCells(),
            open1: -1,
            open2: -1,
            gameOver: false
        });
    }

    render() {
        const { cells, gameOver } = this.state;

        return (
            <div>
                {gameOver && <h3 className="game-over text-center fw-bold text-danger">Game Over</h3>}

                <div className="memory-game">
                    {cells.map((cell, index) => (
                        <button key={index} className={`cell ${cell.open ? 'open' : ''}`} onClick={() => this.handleCellClick(index)}> {cell.open && cell.image && <img src={cell.image} alt="Animal" />} </button>
                    ))}
                </div>
                <div className='text-center mt-3'>
                    <button className="reset-button btn btn-primary" onClick={() => this.resetGame()}>{gameOver ? 'New Game' : 'Reset Game'}</button>
                </div>
            </div>
        );
    }
}