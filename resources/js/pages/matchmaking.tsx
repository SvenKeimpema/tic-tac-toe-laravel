import useSWR from 'swr'
import axios, { AxiosResponse } from 'axios';
import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function useMatchmaking() {
    // check if we can join game
    const {data: response} = useSWR<AxiosResponse>('/game/found', axios.post, { refreshInterval: 1000 })

    useEffect(() => {
        if(response != undefined && "data" in response) {
            if(response.data?.found) {
                window.location.href = "/play/match"
            }
        }
    }, [response]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-500 p-8 flex items-center justify-center">
            <Card className="w-full max-w-lg shadow-2xl backdrop-blur-sm bg-white/90">
                <CardHeader className="text-center pb-2">
                    <CardTitle className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-indigo-600 bg-clip-text text-transparent">
                        Finding Match
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center p-6 gap-4">
                    <div className="animate-spin w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full"></div>
                    <p className="text-indigo-700 font-medium animate-pulse">
                        Searching for opponent...
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
