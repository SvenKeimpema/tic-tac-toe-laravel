import { useBoard } from '@/hooks/use-board';
import { Square } from "@/components/game/square";

export function Board() {
    // Assuming useBoard is a custom hook returning the board state.
    // If not, using useState here as an example.
    let board = useBoard();

    const handleSquareClick = (index) => {
        if (board[index] !== " ") return;
        board[index] = "X";
        console.log(board[index]);
    };

    return (
        <div className="board">
            {[0, 1, 2].map(row => (
                <div className="board-row" key={row}>
                    {[0, 1, 2].map(col => {
                        const index = row * 3 + col;
                        console.log(board[index]);
                        return (
                            <Square
                                key={index}
                                value={board[index]}
                                onClick={() => handleSquareClick(index)}
                            />
                        );
                    })}
                </div>
            ))}
        </div>
    );

}

