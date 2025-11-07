import { useEffect, useCallback, useState } from 'react';
import { Bitcoin, DollarSign, Coins, Wallet, TrendingUp, Zap, Shield } from 'lucide-react';
import GameBoard from './GameBoard';
import ScoreBoard from './ScoreBoard';
import { useGameLogic } from '../hooks/useGameLogic';

const CryptoTetris = () => {
  const {
    board,
    currentPiece,
    score,
    level,
    gameOver,
    isPaused,
    nextPiece,
    moveLeft,
    moveRight,
    moveDown,
    rotate,
    drop,
    startGame,
    pauseGame,
  } = useGameLogic();

  const [showInstructions, setShowInstructions] = useState(true);

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (gameOver || isPaused) return;

    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        moveLeft();
        break;
      case 'ArrowRight':
        event.preventDefault();
        moveRight();
        break;
      case 'ArrowDown':
        event.preventDefault();
        moveDown();
        break;
      case 'ArrowUp':
        event.preventDefault();
        rotate();
        break;
      case ' ':
        event.preventDefault();
        drop();
        break;
    }
  }, [gameOver, isPaused, moveLeft, moveRight, moveDown, rotate, drop]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-2">
          <Bitcoin className="w-10 h-10 text-orange-400 animate-pulse" />
          <h1 className="text-5xl font-bold text-white">Crypto Tetris</h1>
          <Coins className="w-10 h-10 text-yellow-400 animate-pulse" />
        </div>
        <p className="text-gray-300 text-lg">Stack your crypto assets to the moon! 🚀</p>
      </div>

      {showInstructions && !currentPiece && (
        <div className="bg-slate-800 border-2 border-cyan-400 rounded-lg p-6 mb-6 max-w-2xl">
          <h2 className="text-2xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
            <Zap className="w-6 h-6" />
            How to Play
          </h2>
          <div className="text-gray-200 space-y-2">
            <p><strong>← →</strong> Move crypto blocks left/right</p>
            <p><strong>↓</strong> Move block down faster</p>
            <p><strong>↑</strong> Rotate block</p>
            <p><strong>SPACE</strong> Drop block instantly</p>
            <p><strong>P</strong> Pause game</p>
          </div>
          <button
            onClick={() => setShowInstructions(false)}
            className="mt-4 w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded transition"
          >
            Got it!
          </button>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        <div className="flex flex-col gap-4">
          <ScoreBoard
            score={score}
            level={level}
            nextPiece={nextPiece}
          />

          {!currentPiece && !gameOver && (
            <button
              onClick={startGame}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 px-8 rounded-lg text-xl shadow-lg transform hover:scale-105 transition flex items-center justify-center gap-2"
            >
              <TrendingUp className="w-6 h-6" />
              Start Trading
            </button>
          )}

          {currentPiece && !gameOver && (
            <button
              onClick={pauseGame}
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition flex items-center justify-center gap-2"
            >
              <Shield className="w-5 h-5" />
              {isPaused ? 'Resume' : 'Pause (P)'}
            </button>
          )}

          {gameOver && (
            <div className="bg-red-900 border-2 border-red-500 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-white mb-4">Market Crash!</h2>
              <p className="text-gray-200 mb-4">Final Score: {score}</p>
              <button
                onClick={startGame}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition flex items-center justify-center gap-2"
              >
                <Wallet className="w-5 h-5" />
                Try Again
              </button>
            </div>
          )}
        </div>

        <GameBoard
          board={board}
          currentPiece={currentPiece}
          gameOver={gameOver}
          isPaused={isPaused}
        />
      </div>

      <div className="mt-8 text-center">
        <p className="text-gray-400 flex items-center justify-center gap-2">
          <DollarSign className="w-4 h-4" />
          Built with React & Tailwind CSS
        </p>
      </div>
    </div>
  );
};

export default CryptoTetris;
