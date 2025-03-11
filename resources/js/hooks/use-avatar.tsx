import { useState } from "react";
import { useEffect } from "react";
import useSWR from "swr";
import axios, { AxiosResponse } from "axios";

interface AvatarResponse {
    avatar: {
        image: string;
    };
}

export function useAvatar() {
    const [avatar, setAvatar] = useState<string | undefined>(undefined);
    const { data: response, mutate: reloadAvatar } = useSWR<AxiosResponse<AvatarResponse>>("/user/avatar", axios.get, {
        refreshInterval: 30000
    });

    useEffect(() => {
        if (response?.data?.avatar?.image) {
            setAvatar("data:image/jpg;base64," + response.data.avatar.image);
        }
    }, [response]);

    const uploadAvatar = async (file: File) => {
        const formData = new FormData();
        formData.append('avatar', file);
        try {
            await axios.post('/user/avatar', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
        } catch (error) {
            console.error('Failed to upload avatar:', error);
            throw error;
        }
    };

    return {
        avatar,
        reloadAvatar,
        uploadAvatar
    }
}