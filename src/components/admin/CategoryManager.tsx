"use client";

import { useState } from 'react';
import { useArtwork } from '../../context/ArtworkContext';
import { Trash2, Plus, Pencil, Check, X } from 'lucide-react';

const CategoryManager = () => {
    const { categories, addCategory, updateCategory, deleteCategory } = useArtwork();
    const [newCategory, setNewCategory] = useState('');
    const [editingCategory, setEditingCategory] = useState<string | null>(null);
    const [editValue, setEditValue] = useState('');

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        if (newCategory.trim()) {
            addCategory(newCategory.trim());
            setNewCategory('');
        }
    };

    const startEditing = (category: string) => {
        setEditingCategory(category);
        setEditValue(category);
    };

    const cancelEditing = () => {
        setEditingCategory(null);
        setEditValue('');
    };

    const saveEdit = () => {
        if (editValue.trim() && editValue !== editingCategory && editingCategory) {
            updateCategory(editingCategory, editValue.trim());
        }
        setEditingCategory(null);
        setEditValue('');
    };

    return (
        <div className="max-w-2xl">
            <h2 className="text-lg font-bold mb-6 uppercase tracking-wider">Categories</h2>

            <form onSubmit={handleAdd} className="flex gap-4 mb-8">
                <input
                    type="text"
                    placeholder="New Category Name"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="flex-1 border p-2 text-sm focus:outline-none focus:border-black"
                />
                <button type="submit" className="bg-black text-white px-6 py-2 text-sm uppercase flex items-center gap-2 hover:bg-gray-800">
                    <Plus size={16} /> Add
                </button>
            </form>

            <ul className="space-y-3">
                {categories.map(cat => (
                    <li key={cat} className="flex justify-between items-center bg-white p-4 border border-gray-100 shadow-sm">
                        {editingCategory === cat ? (
                            <div className="flex-1 flex items-center gap-2">
                                <input
                                    type="text"
                                    value={editValue}
                                    onChange={(e) => setEditValue(e.target.value)}
                                    className="flex-1 border-b border-black text-sm p-1 focus:outline-none"
                                    autoFocus
                                />
                                <button onClick={saveEdit} className="text-green-600 hover:text-green-700">
                                    <Check size={16} />
                                </button>
                                <button onClick={cancelEditing} className="text-red-500 hover:text-red-600">
                                    <X size={16} />
                                </button>
                            </div>
                        ) : (
                            <span className="font-medium">{cat}</span>
                        )}

                        {cat !== "ALL" && editingCategory !== cat && (
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => startEditing(cat)}
                                    className="text-gray-400 hover:text-black transition-colors"
                                >
                                    <Pencil size={16} />
                                </button>
                                <button
                                    onClick={() => deleteCategory(cat)}
                                    className="text-gray-400 hover:text-red-500 transition-colors"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CategoryManager;
