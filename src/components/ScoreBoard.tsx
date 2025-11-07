import { Bitcoin, Coins, DollarSign, TrendingUp, Wallet, Zap, Shield, Trophy, Target } from 'lucide-react';
import { Piece } from '../types/game';

interface ScoreBoardProps {
  score: number;
  level: number;
  nextPiece: Piece | null;
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

const ScoreBoard = ({ score, level, nextPiece }: ScoreBoardProps) => {
  return (
    <div className="bg-slate-800 border-2 border-cyan-400 rounded-lg p-6 min-w-[250px] shadow-lg">
      <div className="space-y-6">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Trophy className="w-6 h-6 text-yellow-400" />
            <h2 className="text-xl font-bold text-cyan-400">Stats</h2>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-slate-900 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-300 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-green-400" />
                Score
              </span>
            </div>
            <div className="text-3xl font-bold text-white">{score}</div>
          </div>

          <div className="bg-slate-900 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-300 flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-400" />
                Level
              </span>
            </div>
            <div className="text-3xl font-bold text-white">{level}</div>
          </div>

          {nextPiece && (
            <div className="bg-slate-900 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Coins className="w-5 h-5 text-yellow-400" />
                <span className="text-gray-300">Next Asset</span>
              </div>
              <div className="flex justify-center">
                <div className="grid gap-1" style={{
                  gridTemplateColumns: `repeat(${nextPiece.shape[0].length}, minmax(0, 1fr))`
                }}>
                  {nextPiece.shape.map((row, rowIndex) =>
                    row.map((cell, colIndex) => {
                      const { Icon, color } = CRYPTO_ICONS[nextPiece.color] || CRYPTO_ICONS[0];
                      return (
                        <div
                          key={`${rowIndex}-${colIndex}`}
                          className={`
                            w-7 h-7 flex items-center justify-center rounded
                            ${cell
                              ? 'bg-slate-700 border border-slate-600'
                              : 'bg-transparent'
                            }
                          `}
                        >
                          {cell === 1 && <Icon className={`w-4 h-4 ${color}`} />}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-slate-700 pt-4">
          <div className="text-xs text-gray-400 space-y-1">
            <p className="flex items-center gap-1">
              <Bitcoin className="w-3 h-3" /> Bitcoin
            </p>
            <p className="flex items-center gap-1">
              <Coins className="w-3 h-3" /> Altcoins
            </p>
            <p className="flex items-center gap-1">
              <Wallet className="w-3 h-3" /> Wallets
            </p>
            <p className="flex items-center gap-1">
              <Shield className="w-3 h-3" /> Security
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreBoard;
