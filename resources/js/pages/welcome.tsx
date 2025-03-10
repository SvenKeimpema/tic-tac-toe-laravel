import { Button } from '@/components/ui/button';
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Welcome() {
    async function test() {
        await axios.post("/game/matchmake")
        window.location.href = "/play/online"
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-500 p-8 flex items-center justify-center">
            <Card className="w-full max-w-lg shadow-2xl backdrop-blur-sm bg-white/90">
                <CardHeader className="text-center pb-2">
                    <CardTitle className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-indigo-600 bg-clip-text text-transparent">
                        Tic Tac Toe
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center p-6">
                    <Button 
                        onClick={test}
                        className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-600 hover:to-indigo-600 text-white font-medium rounded-full"
                    >
                        Play Online
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
