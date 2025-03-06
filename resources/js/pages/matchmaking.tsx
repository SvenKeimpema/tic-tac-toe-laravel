import useSWR from 'swr'
import axios from 'axios';
import { useEffect } from 'react';

export default function useMatchmaking() {
    // check if we can join game
    const {data: response} = useSWR('/game/found', axios.post, { refreshInterval: 1000 })

    useEffect(() => {
        if(response !== undefined && "data" in response) {
            if(response.data?.found) {
                window.location = "/play/match"
            }
        }
    }, [response]);

    return (
        <>
            Searching match
        </>
    )
}
