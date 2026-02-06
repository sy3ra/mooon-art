"use client";

import { useState } from 'react';
import { useArtwork, Artwork } from '../../context/ArtworkContext';
import { Trash2, Plus, Upload, Pencil } from 'lucide-react';
import Image from 'next/image';

const ProductManager = () => {
    const { artworks, categories, addArtwork, updateArtwork, deleteArtwork } = useArtwork();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [filterCategory, setFilterCategory] = useState("ALL");

    const [imageFile, setImageFile] = useState<File | null>(null);

    // Form State
    const [formData, setFormData] = useState<Omit<Artwork, 'id'>>({
        title: '',
        category: categories[1] || '',
        year: new Date().getFullYear().toString(),
        material: '',
        size: '',
        price: '',
        description: '',
        image: '', // Initialize as empty string
        isSoldOut: false
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const imageUrl = URL.createObjectURL(file);
            setFormData({ ...formData, image: imageUrl });
        }
    };

    const handleEdit = (art: Artwork) => {
        setEditingId(art.id);
        setImageFile(null); // Reset file input
        const categoryValue = categories.includes(art.category) ? art.category : (categories[1] || '');
        setFormData({
            title: art.title,
            category: categoryValue,
            year: art.year,
            material: art.material,
            size: art.size,
            price: art.price,
            description: art.description,
            image: art.image as string, // Cast to string
            isSoldOut: art.isSoldOut || false
        });
        setIsFormOpen(true);
    };

    const resetForm = () => {
        setIsFormOpen(false);
        setEditingId(null);
        setImageFile(null);
        setFormData({
            title: '',
            category: categories[1] || '',
            year: new Date().getFullYear().toString(),
            material: '',
            size: '',
            price: '',
            description: '',
            image: '',
            isSoldOut: false
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        let finalImageUrl = formData.image;

        if (imageFile) {
            try {
                // Import locally to avoid ssr issues if any, ensuring it runs on client
                const { supabase } = await import('../../lib/supabase');

                const fileExt = imageFile.name.split('.').pop();
                const fileName = `${Date.now()}.${fileExt}`;
                const filePath = `public/${fileName}`;

                const { error: uploadError } = await supabase.storage
                    .from('mooon-art-assets')
                    .upload(filePath, imageFile);

                if (uploadError) {
                    console.error('Upload error:', uploadError);
                    alert('Failed to upload image: ' + uploadError.message);
                    return;
                }

                const { data: { publicUrl } } = supabase.storage
                    .from('mooon-art-assets')
                    .getPublicUrl(filePath);

                finalImageUrl = publicUrl;
            } catch (err) {
                console.error('Upload exception:', err);
                alert('An error occurred during upload.');
                return;
            }
        }

        if (!formData.title || !finalImageUrl) {
            alert("Title and Image are required.");
            return;
        }

        const submissionData = { ...formData, image: finalImageUrl };

        if (editingId) {
            await updateArtwork(editingId, submissionData);
        } else {
            await addArtwork(submissionData);
        }

        resetForm();
    };

    // Filter Logic
    const filteredArtworks = filterCategory === "ALL"
        ? artworks
        : artworks.filter(art => art.category === filterCategory);

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div className="flex items-center gap-4">
                    <h2 className="text-lg font-bold uppercase tracking-wider">Artworks ({filteredArtworks.length})</h2>
                    <select
                        className="border p-2 text-sm bg-white focus:outline-none focus:border-black"
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                    >
                        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                </div>

                <button
                    onClick={() => {
                        if (isFormOpen) resetForm();
                        else setIsFormOpen(true);
                    }}
                    className="bg-black text-white px-4 py-2 text-sm uppercase flex items-center gap-2 hover:bg-gray-800"
                >
                    {isFormOpen ? 'Cancel' : <><Plus size={16} /> New Artwork</>}
                </button>
            </div>

            {isFormOpen && (
                <div className="bg-gray-50 p-6 mb-8 border border-gray-200">
                    <h3 className="text-sm font-bold uppercase mb-4">{editingId ? 'Edit Artwork' : 'Add New Artwork'}</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs uppercase text-gray-500 mb-1">Title</label>
                                <input className="w-full border p-2 text-sm" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} required />
                            </div>
                            <div>
                                <label className="block text-xs uppercase text-gray-500 mb-1">Category</label>
                                <select className="w-full border p-2 text-sm bg-white" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })}>
                                    {categories.filter(c => c !== "ALL").map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs uppercase text-gray-500 mb-1">Price</label>
                                <input className="w-full border p-2 text-sm" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} placeholder="e.g. 500,000 KRW" />
                            </div>
                            <div>
                                <label className="block text-xs uppercase text-gray-500 mb-1">Size</label>
                                <input className="w-full border p-2 text-sm" value={formData.size} onChange={e => setFormData({ ...formData, size: e.target.value })} placeholder="e.g. 50 x 50 cm" />
                            </div>
                            <div>
                                <label className="block text-xs uppercase text-gray-500 mb-1">Material</label>
                                <input className="w-full border p-2 text-sm" value={formData.material} onChange={e => setFormData({ ...formData, material: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-xs uppercase text-gray-500 mb-1">Year</label>
                                <input className="w-full border p-2 text-sm" value={formData.year} onChange={e => setFormData({ ...formData, year: e.target.value })} />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs uppercase text-gray-500 mb-1">Description</label>
                            <textarea className="w-full border p-2 text-sm h-24" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
                        </div>

                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="isSoldOut"
                                checked={formData.isSoldOut}
                                onChange={e => setFormData({ ...formData, isSoldOut: e.target.checked })}
                                className="w-4 h-4"
                            />
                            <label htmlFor="isSoldOut" className="text-sm font-medium cursor-pointer">Mark as SOLD OUT</label>
                        </div>

                        <div>
                            <label className="block text-xs uppercase text-gray-500 mb-1">Image</label>
                            <div className="flex items-center gap-4">
                                <label className="cursor-pointer bg-white border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50 flex items-center gap-2">
                                    <Upload size={16} /> Choose File
                                    <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                                </label>
                                {formData.image && <span className="text-xs text-green-600">Image selected</span>}
                            </div>
                            {formData.image && (
                                <div className="mt-2 h-32 w-32 relative">
                                    <Image src={formData.image} alt="Preview" fill className="object-contain bg-gray-200" />
                                </div>
                            )}
                        </div>

                        <button type="submit" className="w-full bg-blue-600 text-white py-3 text-sm font-medium uppercase hover:bg-blue-700">
                            {editingId ? 'Update Artwork' : 'Save Artwork'}
                        </button>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArtworks.map(art => (
                    <div key={art.id} className="border border-gray-100 p-4 bg-white shadow-sm flex gap-4 relative">
                        {art.isSoldOut && (
                            <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 z-10">
                                SOLD OUT
                            </div>
                        )}
                        <div className="w-20 h-20 relative bg-gray-50 shrink-0">
                            <Image
                                src={art.image}
                                alt={art.title}
                                fill
                                className={`object-cover ${art.isSoldOut ? 'opacity-50' : ''}`}
                                sizes="80px"
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-sm truncate">{art.title}</h4>
                            <p className="text-xs text-gray-500 mb-1">{art.category}</p>
                            <p className="text-xs font-mono">{art.price}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <button onClick={() => handleEdit(art)} className="text-gray-400 hover:text-black transition-colors">
                                <Pencil size={16} />
                            </button>
                            <button onClick={() => deleteArtwork(art.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductManager;
