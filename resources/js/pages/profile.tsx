import { Avatar } from "@/components/user/avatar";
import { useState } from "react";
import axios from "axios";
import { Username } from "@/components/user/username";

export default function Profile() {

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold text-center mb-8">Profile Settings</h1>
                
                <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
                    <div className="mb-8">
                        <Avatar />
                    </div>

                    <Username />
                    <button onClick={() => window.location.href = '/'} className="mt-4 py-4 w-full btn-primary">
                        Home
                    </button>
                </div>
            </div>
        </div>
    );
}