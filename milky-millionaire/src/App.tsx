import React, { Dispatch } from 'react';
import './App.scss';
import CPUView from './components/CPUView';
import PlayerView from './components/PlayerView';
import { GameStatus, Random, shuffle, deal } from './models/Game';
import { allCards, Card } from './models/Card';
import gameInfo from './GameInfo';
import Board from './components/Board';
import { AppState } from './reducers';
import { goToNextTrick, endDiscarding, startGame, ActionTypes } from './actions';
import { connect } from 'react-redux';

interface OwnProps {
    random: Random;
}

interface OwnActions {
    startGame: (decks: Card[][], initialTurn: number) => void;
    endDiscarding: () => void;
    goToNextTrick: () => void;
}

type AppProps = OwnProps & AppState & OwnActions;

function App(props: AppProps) {

    const { random } = props;

    if (props.gameState.gameStatus === GameStatus.Init) {
        const cards = shuffle(allCards, random);
        const dealCards = shuffle(deal(cards, 5), random);
        const initialTurn = random.next(5);
        props.startGame(dealCards, initialTurn);
        return (<div></div>);
    }

    return (
        <div className="main">
            <div className="game">
                <ul className="cpus">
                    {gameInfo.cpus.map((cpu, i) => {
                        return (
                            <li className="cpu" key={`cpu-${i}`}>
                                <CPUView {...cpu}
                                    isMyTurn={isYourTurn(i)}
                                    cards={props.gameState.decks[i]}
                                    stackTop={props.gameState.stack[0]}
                                    random={random}
                                />
                            </li>
                        );
                    })}
                </ul>
                <Board gameState={props.gameState} discarding={props.discarding} isTrickEnding={props.isTrickEnding} onDiscardingEnd={handleDiscardingEnd} onGoToNextTrick={handleGoToNextTrick} />
                <PlayerView {...gameInfo.player}
                    stackTop={props.gameState.stack[0]}
                    deck={props.gameState.decks[4]}
                    gameStatus={props.gameState.gameStatus}
                    isMyTurn={isYourTurn(4)}
                />
            </div>
        </div>
    );

    function isYourTurn(position: number) {
        return props.gameState.currentTurn === position &&
            props.discarding === undefined &&
            !props.isTrickEnding;
    }

    function handleGoToNextTrick() {
        props.goToNextTrick();
    }

    function handleDiscardingEnd() {
        props.endDiscarding();
    }

}

export default connect(
    (state: AppProps) => ({
        discarding: state.discarding,
        isTrickEnding: state.isTrickEnding,
        gameState: state.gameState
    }),
    (dispatch: Dispatch<ActionTypes>) => ({
        startGame: (decks: Card[][], initialTurn: number) => dispatch(startGame(decks, initialTurn)),
        endDiscarding: () => dispatch(endDiscarding()),
        goToNextTrick: () => dispatch(goToNextTrick())
    })
)(App);
