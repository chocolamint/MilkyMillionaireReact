import React, { Dispatch } from 'react';
import './App.scss';
import CPUView from './components/CPUView';
import PlayerView from './components/PlayerView';
import { GameStatus, Random, shuffle, deal } from './models/Game';
import { allCards, Card } from './models/Card';
import gameInfo from './GameInfo';
import Board from './components/Board';
import { AppState } from './reducers';
import { goToNextTrick, endDiscarding, startGame, ActionTypes, goneToNextTrick } from './actions';
import { connect } from 'react-redux';

interface OwnProps {
    random: Random;
}

type OwnState = Pick<AppState, "gameStatus" | "decks" | "stack" | "discarding" | "isTrickEnding" | "currentTurn">;

interface OwnActions {
    startGame: (decks: Card[][], initialTurn: number) => void;
    endDiscarding: () => void;
    goToNextTrick: () => void;
    goneToNextTrick: () => void;
}

type AppProps = OwnProps & OwnState & OwnActions;

function App(props: AppProps) {

    const { random } = props;

    if (props.gameStatus === GameStatus.Init) {
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
                                    cards={props.decks[i]}
                                    stackTop={props.stack[0]}
                                    random={random}
                                />
                            </li>
                        );
                    })}
                </ul>
                <Board />
                <PlayerView {...gameInfo.player}
                    stackTop={props.stack[0]}
                    deck={props.decks[4]}
                    gameStatus={props.gameStatus}
                    isMyTurn={isYourTurn(4)}
                />
            </div>
        </div>
    );

    function isYourTurn(position: number) {
        return props.currentTurn === position &&
            props.discarding === undefined &&
            !props.isTrickEnding;
    }

    function handleGoToNextTrick() {
        props.goneToNextTrick();
    }

    function handleDiscardingEnd() {
        props.endDiscarding();
    }

}

export default connect(
    (state: AppProps) => ({
        discarding: state.discarding,
        isTrickEnding: state.isTrickEnding,
        gameStatus: state.gameStatus,
        decks: state.decks,
        stack: state.stack,
        currentTurn: state.currentTurn
    }),
    (dispatch: Dispatch<ActionTypes>) => ({
        startGame: (decks: Card[][], initialTurn: number) => dispatch(startGame(decks, initialTurn)),
        endDiscarding: () => dispatch(endDiscarding()),
        goToNextTrick: () => dispatch(goToNextTrick()),
        goneToNextTrick: () => dispatch(goneToNextTrick())
    })
)(App);
