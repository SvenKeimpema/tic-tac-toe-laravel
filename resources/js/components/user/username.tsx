import { useUsername } from "@/hooks/use-username";
import { KeyboardEvent, useEffect, useState } from "react";

export function Username() {
    const { username, updateUsername } = useUsername();
    const [localUsername, setLocalUsername] = useState(username);

    const handleSave = () => {
        if (localUsername !== username) {
            updateUsername(localUsername);
        }
    };

    useEffect(() => {
        setLocalUsername(username);
    }, [username]);

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.currentTarget.blur(); // This will trigger onBlur
        }
    };

    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
                Username
            </label>
            <input
                type="text"
                value={localUsername}
                onChange={(e) => setLocalUsername(e.target.value)}
                onBlur={handleSave}
                onKeyDown={handleKeyDown}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
        </div>
    )
}