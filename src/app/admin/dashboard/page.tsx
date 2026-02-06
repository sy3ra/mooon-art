"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LayoutDashboard, Package, LogOut, Calendar } from 'lucide-react';
import CategoryManager from '../../../components/admin/CategoryManager';
import ProductManager from '../../../components/admin/ProductManager';
import ExhibitionManager from '../../../components/admin/ExhibitionManager';

export default function AdminDashboardPage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('products'); // 'categories', 'products', 'exhibitions'

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const isAdmin = localStorage.getItem('isAdmin');
            if (!isAdmin) {
                router.push('/admin/login');
            }
        }
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('isAdmin');
        router.push('/admin/login');
    };

    return (
        <div className="max-w-7xl mx-auto px-6 pt-24 pb-12 md:pt-32 md:pb-24">
            <div className="flex flex-col md:flex-row gap-12">
                {/* Sidebar */}
                <div className="w-full md:w-64 flex flex-col gap-2">
                    <div className="mb-8 px-4">
                        <h1 className="text-xl font-bold uppercase tracking-widest">Admin</h1>
                        <p className="text-xs text-gray-500 mt-1">Dashboard</p>
                    </div>

                    <button
                        onClick={() => setActiveTab('products')}
                        className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors ${activeTab === 'products' ? 'bg-black text-white' : 'text-gray-500 hover:bg-gray-100'
                            }`}
                    >
                        <Package size={18} /> Products
                    </button>

                    <button
                        onClick={() => setActiveTab('categories')}
                        className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors ${activeTab === 'categories' ? 'bg-black text-white' : 'text-gray-500 hover:bg-gray-100'
                            }`}
                    >
                        <LayoutDashboard size={18} /> Categories
                    </button>

                    <button
                        onClick={() => setActiveTab('exhibitions')}
                        className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors ${activeTab === 'exhibitions' ? 'bg-black text-white' : 'text-gray-500 hover:bg-gray-100'
                            }`}
                    >
                        <Calendar size={18} /> Exhibitions
                    </button>

                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50 mt-auto"
                    >
                        <LogOut size={18} /> Logout
                    </button>
                </div>

                {/* Content Area */}
                <div className="flex-1 min-h-[500px] border-l border-gray-100 md:pl-12">
                    {activeTab === 'categories' && <CategoryManager />}
                    {activeTab === 'products' && <ProductManager />}
                    {activeTab === 'exhibitions' && <ExhibitionManager />}
                </div>
            </div>
        </div>
    );
}
