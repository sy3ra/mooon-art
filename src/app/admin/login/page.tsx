"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
    const [password, setPassword] = useState('');
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const isAdmin = localStorage.getItem('isAdmin');
            if (isAdmin) {
                router.push('/admin/dashboard');
            }
        }
    }, [router]);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === 'mooon2025') {
            localStorage.setItem('isAdmin', 'true');
            router.push('/admin/dashboard');
        } else {
            alert('Incorrect Password');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] pt-24">
            <h1 className="text-xl font-bold uppercase tracking-widest mb-8">Admin Login</h1>
            <form onSubmit={handleLogin} className="flex flex-col gap-4 w-full max-w-xs">
                <input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border p-3 text-sm focus:outline-none focus:border-black text-center"
                    autoFocus
                />
                <button type="submit" className="bg-black text-white py-3 uppercase text-xs tracking-widest hover:bg-gray-800 transition-colors">
                    Login
                </button>
            </form>
        </div>
    );
}
