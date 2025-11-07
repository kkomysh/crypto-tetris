import { useState, useEffect, useCallback } from 'react';
import { Board, Piece, Position } from '../types/game';
import { SHAPES } from '../utils/shapes';
import {
  createEmptyBoard,
  checkCollision,
  mergePieceToBoard,
  clearLines,
  createPiece
} from '../utils/gameUtils';

const INITIAL_DROP_SPEED = 1000;
const SPEED_INCREASE_PER_LEVEL = 100;

export const useGameLogic = () => {
  const [board, setBoard] = useState<Board>(createEmptyBoard());
  const [currentPiece, setCurrentPiece] = useState<Piece | null>(null);
  const [nextPiece, setNextPiece] = useState<Piece | null>(null);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [dropSpeed, setDropSpeed] = useState(INITIAL_DROP_SPEED);

  const spawnPiece = useCallback(() => {
    const piece = nextPiece || createPiece();
    setNextPiece(createPiece());

    if (checkCollision(board, piece, piece.position)) {
      setGameOver(true);
      return null;
    }

    return piece;
  }, [board, nextPiece]);

  const moveLeft = useCallback(() => {
    if (!currentPiece || gameOver || isPaused) return;

    const newPosition: Position = {
      x: currentPiece.position.x - 1,
      y: currentPiece.position.y
    };

    if (!checkCollision(board, currentPiece, newPosition)) {
      setCurrentPiece({ ...currentPiece, position: newPosition });
    }
  }, [currentPiece, board, gameOver, isPaused]);

  const moveRight = useCallback(() => {
    if (!currentPiece || gameOver || isPaused) return;

    const newPosition: Position = {
      x: currentPiece.position.x + 1,
      y: currentPiece.position.y
    };

    if (!checkCollision(board, currentPiece, newPosition)) {
      setCurrentPiece({ ...currentPiece, position: newPosition });
    }
  }, [currentPiece, board, gameOver, isPaused]);

  const moveDown = useCallback(() => {
    if (!currentPiece || gameOver || isPaused) return false;

    const newPosition: Position = {
      x: currentPiece.position.x,
      y: currentPiece.position.y + 1
    };

    if (!checkCollision(board, currentPiece, newPosition)) {
      setCurrentPiece({ ...currentPiece, position: newPosition });
      return true;
    } else {
      const newBoard = mergePieceToBoard(board, currentPiece);
      const { board: clearedBoard, linesCleared } = clearLines(newBoard);

      setBoard(clearedBoard);

      if (linesCleared > 0) {
        const points = [0, 100, 300, 500, 800][linesCleared];
        setScore(prev => prev + points * level);

        const newLevel = Math.floor(score / 1000) + 1;
        if (newLevel > level) {
          setLevel(newLevel);
          setDropSpeed(Math.max(100, INITIAL_DROP_SPEED - (newLevel - 1) * SPEED_INCREASE_PER_LEVEL));
        }
      }

      const newPiece = spawnPiece();
      setCurrentPiece(newPiece);
      return false;
    }
  }, [currentPiece, board, gameOver, isPaused, level, score, spawnPiece]);

  const rotate = useCallback(() => {
    if (!currentPiece || gameOver || isPaused) return;

    const rotated = currentPiece.shape[0].map((_, index) =>
      currentPiece.shape.map(row => row[index]).reverse()
    );

    const rotatedPiece = { ...currentPiece, shape: rotated };

    if (!checkCollision(board, rotatedPiece, currentPiece.position)) {
      setCurrentPiece(rotatedPiece);
    }
  }, [currentPiece, board, gameOver, isPaused]);

  const drop = useCallback(() => {
    if (!currentPiece || gameOver || isPaused) return;

    let newPosition = { ...currentPiece.position };

    while (!checkCollision(board, currentPiece, { ...newPosition, y: newPosition.y + 1 })) {
      newPosition.y += 1;
    }

    setCurrentPiece({ ...currentPiece, position: newPosition });

    setTimeout(() => {
      moveDown();
    }, 50);
  }, [currentPiece, board, gameOver, isPaused, moveDown]);

  const startGame = useCallback(() => {
    setBoard(createEmptyBoard());
    setScore(0);
    setLevel(1);
    setGameOver(false);
    setIsPaused(false);
    setDropSpeed(INITIAL_DROP_SPEED);
    setNextPiece(createPiece());
    setCurrentPiece(createPiece());
  }, []);

  const pauseGame = useCallback(() => {
    setIsPaused(prev => !prev);
  }, []);

  useEffect(() => {
    if (!currentPiece || gameOver || isPaused) return;

    const interval = setInterval(() => {
      moveDown();
    }, dropSpeed);

    return () => clearInterval(interval);
  }, [currentPiece, dropSpeed, gameOver, isPaused, moveDown]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'p' || e.key === 'P') {
        pauseGame();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [pauseGame]);

  return {
    board,
    currentPiece,
    nextPiece,
    score,
    level,
    gameOver,
    isPaused,
    moveLeft,
    moveRight,
    moveDown,
    rotate,
    drop,
    startGame,
    pauseGame,
  };
};
