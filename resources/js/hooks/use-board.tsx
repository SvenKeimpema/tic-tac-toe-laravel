import { useEffect, useState } from 'react';
import useSWR, { KeyedMutator } from 'swr';
import axios, { AxiosResponse } from 'axios';

export type BoardInfo = {
    board: string[];
    reloadBoard: KeyedMutator<AxiosResponse<boardResponse>>
}

interface boardResponse {
    board: number;
}

export function useBoardInfo(): BoardInfo {
    const [board, setBoard] = useState(Array(9).fill(null));
    let { data: response, mutate: reloadBoard } = useSWR<AxiosResponse<boardResponse>>("/game/board", axios.post, {refreshInterval: 500});

    useEffect(() => {
        let bb: number | undefined = response?.data?.board;
        let newBoard = Array(9).fill(null);
        if(!bb) {
            return;
        }

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
    }, [response])

    return {
        board: board,
        reloadBoard: reloadBoard
    };
}
