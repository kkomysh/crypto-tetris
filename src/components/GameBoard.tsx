import { Bitcoin, Coins, DollarSign, TrendingUp, Wallet, Zap, Shield } from 'lucide-react';
import { Board, Piece } from '../types/game';

interface GameBoardProps {
  board: Board;
  currentPiece: Piece | null;
  gameOver: boolean;
  isPaused: boolean;
}

const CRYPTO_ICONS = [
  { Icon: Bitcoin, color: 'text-orange-400' },
  { Icon: Coins, color: 'text-yellow-400' },
  { Icon: DollarSign, color: 'text-green-400' },
  { Icon: TrendingUp, color: 'text-blue-400' },
  { Icon: Wallet, color: 'text-purple-400' },
  { Icon: Zap, color: 'text-cyan-400' },
  { Icon: Shield, color: 'text-red-400' },
];

const GameBoard = ({ board, currentPiece, gameOver, isPaused }: GameBoardProps) => {
  const renderCell = (row: number, col: number) => {
    let cellValue = board[row][col];
    let isCurrentPiece = false;

    if (currentPiece && !gameOver && !isPaused) {
      const relRow = row - currentPiece.position.y;
      const relCol = col - currentPiece.position.x;

      if (
        relRow >= 0 && relRow < currentPiece.shape.length &&
        relCol >= 0 && relCol < currentPiece.shape[0].length &&
        currentPiece.shape[relRow][relCol]
      ) {
        cellValue = currentPiece.color;
        isCurrentPiece = true;
      }
    }

    const { Icon, color } = CRYPTO_ICONS[cellValue] || CRYPTO_ICONS[0];
    const isEmpty = cellValue === 0 && !isCurrentPiece;

    return (
      <div
        key={`${row}-${col}`}
        className={`
          w-8 h-8 border flex items-center justify-center
          ${isEmpty
            ? 'bg-slate-800/50 border-slate-700/30'
            : `bg-slate-700 border-slate-600 ${isCurrentPiece ? 'animate-pulse' : ''}`
          }
          transition-all duration-100
        `}
      >
        {!isEmpty && <Icon className={`w-5 h-5 ${color}`} />}
      </div>
    );
  };

  return (
    <div className="relative">
      <div className="bg-slate-900 p-4 rounded-lg border-4 border-cyan-500 shadow-2xl shadow-cyan-500/50">
        <div className="grid grid-rows-20 gap-0">
          {board.map((row, rowIndex) => (
            <div key={rowIndex} className="flex gap-0">
              {row.map((_, colIndex) => renderCell(rowIndex, colIndex))}
            </div>
          ))}
        </div>
      </div>

      {isPaused && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center rounded-lg">
          <div className="text-center">
            <Shield className="w-16 h-16 text-yellow-400 mx-auto mb-4 animate-pulse" />
            <p className="text-3xl font-bold text-white">PAUSED</p>
            <p className="text-gray-300 mt-2">Press P to resume</p>
          </div>
        </div>
      )}

      {gameOver && (
        <div className="absolute inset-0 bg-red-900/90 flex items-center justify-center rounded-lg">
          <div className="text-center">
            <TrendingUp className="w-16 h-16 text-red-300 mx-auto mb-4 rotate-180" />
            <p className="text-3xl font-bold text-white">GAME OVER</p>
            <p className="text-red-200 mt-2">Market crashed!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameBoard;
