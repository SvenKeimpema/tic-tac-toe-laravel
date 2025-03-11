import { Board } from '@/components/game/board';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import useSWR from 'swr';
import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { Profile } from '@/components/game/profile';

export default function Game() {
    const {data: response} = useSWR<AxiosResponse>('/game/users', axios.post)
    const [userNames, setUserNames] = useState<string[]>([]);

    useEffect(() => {
        if(response && response.data) {
            setUserNames(response.data.userNames);
        }
    }, [response]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-cyan-300 via-blue-300 to-indigo-300 p-8 flex items-center justify-center">
            <Profile />
            <Card className="w-full max-w-lg shadow-2xl backdrop-blur-sm bg-white/90">
                <CardHeader className="text-center pb-2">
                    <CardTitle className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-indigo-600 bg-clip-text text-transparent">
                        Tic Tac Toe
                    </CardTitle>
                    <div className="flex justify-center gap-4 mt-4">
                        {userNames.map((name, index) => (
                            <div 
                                key={index} 
                                className={`px-4 py-2 rounded-full ${
                                    index === 0 ? 'bg-cyan-200 text-indigo-700' : 'bg-blue-300 text-indigo-700'
                                } font-medium`}
                            >
                                {name}
                            </div>
                        ))}
                    </div>
                </CardHeader>
                <CardContent className="flex justify-center p-6">
                    <Board />
                </CardContent>
            </Card>
        </div>
    );
}
