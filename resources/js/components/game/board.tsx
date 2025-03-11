import { useBoardInfo } from '@/hooks/use-board';
import { Square } from "@/components/game/square";
import React from 'react';
import axios from 'axios';

export function Board() {
    let {board, reloadBoard} = useBoardInfo();

    async function handleClick(index: number) {
        await axios.post("/game/move", {
            index: index
        });

        reloadBoard();
    }

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
                                onClick={() => handleClick(index)}
                            />
                        );
                    })}
                </React.Fragment>
            ))}
        </div>
    );
}

