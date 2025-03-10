import { useEffect, useState } from 'react';

export function useBoard() {
    const [board, setBoard] = useState(Array(9).fill(null));
    let bb = 1 << 16;

    useEffect(() => {
        let newBoard = Array(9).fill(null);
        for(let x = 0; x < 18; x+=2) {
            if((bb & (1 << x)) != 0) {
                newBoard[x/2] = "X";
            }else if((bb & (1 << (x+1))) != 0) {
                newBoard[x/2] = "O";
            }else {
                newBoard[x/2] = "";
            }

            setBoard(newBoard);
        }
    }, [bb])

    return board;
}
