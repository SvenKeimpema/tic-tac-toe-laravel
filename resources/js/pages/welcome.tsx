import { Button } from '@/components/ui/button';
import axios from "axios";

export default function Welcome() {
    async function test() {
        await axios.post("/game/matchmake")
        window.location.href = "/play/online"
    }


    return (
        <>
            <Button onClick={test}>
                Play Online
            </Button>
        </>
    );
}
