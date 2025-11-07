export type Board = number[][];

export interface Position {
  x: number;
  y: number;
}

export interface Piece {
  shape: number[][];
  color: number;
  position: Position;
}

export const BOARD_WIDTH = 10;
export const BOARD_HEIGHT = 20;
