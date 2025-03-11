import { useAvatar } from "@/hooks/use-avatar";
import { ChangeEvent } from "react";

export function Avatar() {
    const { avatar, reloadAvatar, uploadAvatar } = useAvatar();

    const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            await uploadAvatar(file);
            reloadAvatar();
        }
    };

    return (
        <div className="flex flex-col items-center gap-4">
            <label className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-indigo-500 cursor-pointer hover:opacity-80 transition-opacity group">
                <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
    
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white text-sm">Change Avatar</span>
                </div>
                <input type="file" className="hidden" onChange={handleFileUpload} accept="image/*" />
            </label>
        </div>
    );
}
