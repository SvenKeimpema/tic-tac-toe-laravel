import { useBoard } from '@/hooks/use-board';
import { Square } from "@/components/game/square";
import React from 'react';

export function Board() {
    let board = useBoard();

    return (
        <div className="grid grid-cols-3 w-fit">
            {[0, 1, 2].map(row => (
                <React.Fragment key={row}>
                    {[0, 1, 2].map(col => {
                        const index = row * 3 + col;
                        return (
                            <Square
                                key={index}
                                value={board[index]}
                                onClick={() => {}}
                            />
                        );
                    })}
                </React.Fragment>
            ))}
        </div>
    );
}

