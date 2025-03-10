interface SquareProps {
    value: string;
    onClick: () => void;
}

export function Square({ value, onClick }: SquareProps) {
    return (
        <button 
            className="w-24 h-24 border-solid border-2 border-black flex items-center justify-center text-4xl font-bold transition-colors duration-200 transform active:transform-none hover:bg-gray-200 focus:outline-none" 
            onClick={onClick}
        >
            {value}
        </button>
    );
}
