import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import useSWR from "swr";

interface UserProfileResponse {
    username: string;
}

export function useUsername() {
    const { data: response, mutate: reload } = useSWR<AxiosResponse<UserProfileResponse>>("/user/profile/username", axios.get);
    const [username, setUsername] = useState("");
    
    const updateUsername = async (newUsername: string) => {
        try {
            await axios.post("/user/profile", { username: newUsername });
            await reload();
        } catch (error) {
            console.error("Failed to update username:", error);
        }
    }

    useEffect(() => {
        if (response) {
            setUsername(response?.data?.username);
        }
    }, [response]);

    return { username, updateUsername };
}