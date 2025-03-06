interface SquareProps {
    value: string;
    onClick: () => void;
}

export function Square({ value, onClick }: SquareProps) {
    return <button className="w-24 h-24 border-solid border-2 justify-center border-black" onClick={onClick}>{value}</button>;
}
