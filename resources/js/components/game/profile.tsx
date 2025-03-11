import { useAvatar } from "@/hooks/use-avatar";

export function Profile() {
    const { avatar } = useAvatar();

    return (
        <div className="fixed top-4 right-4 flex flex-col items-center gap-4">
            <label className="relative w-16 h-16 rounded-full overflow-hidden border-4 border-indigo-500 cursor-pointer hover:opacity-80 transition-opacity group">
                <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
    
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => window.location.href = '/profile'} className="text-white text-sm">Profile</button>
                </div>
            </label>
        </div>
    );
}