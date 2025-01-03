import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface MoveContextState{
    moves: string[]
}

const RubiksCubeContext = createContext<{
    moves: MoveContextState;
    setRMoves: (updatedMoves: MoveContextState) => void;
} | null>(null);

