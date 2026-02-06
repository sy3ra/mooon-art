"use client";

import { useState } from 'react';
import { useArtwork, Exhibition } from '../../context/ArtworkContext';
import { Trash2, Plus, Upload, Pencil, Calendar, MapPin } from 'lucide-react';
import Image from 'next/image';

const ExhibitionManager = () => {
    const { exhibitions, addExhibition, updateExhibition, deleteExhibition } = useArtwork();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);

    const [formData, setFormData] = useState<Omit<Exhibition, 'id'>>({
        title: '',
        period: '',
        location: '',
        description: '',
        image: null
    });

    const [imageFile, setImageFile] = useState<File | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const imageUrl = URL.createObjectURL(file);
            setFormData({ ...formData, image: imageUrl });
        }
    };

    const handleEdit = (ex: Exhibition) => {
        setEditingId(ex.id);
        setImageFile(null);
        setFormData({
            title: ex.title,
            period: ex.period,
            location: ex.location,
            description: ex.description,
            image: ex.image
        });
        setIsFormOpen(true);
    };

    const resetForm = () => {
        setIsFormOpen(false);
        setEditingId(null);
        setImageFile(null);
        setFormData({
            title: '',
            period: '',
            location: '',
            description: '',
            image: null
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // --- Image Upload Logic Start ---
        let finalImageUrl = formData.image;

        if (imageFile) {
            try {
                const { supabase } = await import('../../lib/supabase');
                const fileExt = imageFile.name.split('.').pop();
                const fileName = `exhibition_${Date.now()}.${fileExt}`;
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
        // --- Image Upload Logic End ---

        if (!formData.title) {
            alert("Title is required.");
            return;
        }

        const submissionData = { ...formData, image: finalImageUrl };

        if (editingId) {
            await updateExhibition(editingId, submissionData);
        } else {
            await addExhibition(submissionData);
        }

        resetForm();
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold uppercase tracking-wider">Exhibitions ({exhibitions.length})</h2>
                <button
                    onClick={() => {
                        if (isFormOpen) resetForm();
                        else setIsFormOpen(true);
                    }}
                    className="bg-black text-white px-4 py-2 text-sm uppercase flex items-center gap-2 hover:bg-gray-800"
                >
                    {isFormOpen ? 'Cancel' : <><Plus size={16} /> New Exhibition</>}
                </button>
            </div>

            {isFormOpen && (
                <div className="bg-gray-50 p-6 mb-8 border border-gray-200">
                    <h3 className="text-sm font-bold uppercase mb-4">{editingId ? 'Edit Exhibition' : 'Add New Exhibition'}</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs uppercase text-gray-500 mb-1">Title</label>
                                <input className="w-full border p-2 text-sm" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} required />
                            </div>
                            <div>
                                <label className="block text-xs uppercase text-gray-500 mb-1">Period</label>
                                <input className="w-full border p-2 text-sm" value={formData.period} onChange={e => setFormData({ ...formData, period: e.target.value })} placeholder="e.g. 2025.03.01 - 2025.04.15" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-xs uppercase text-gray-500 mb-1">Location</label>
                                <input className="w-full border p-2 text-sm" value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} placeholder="e.g. Gallery Mooon, Seoul" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs uppercase text-gray-500 mb-1">Description</label>
                            <textarea className="w-full border p-2 text-sm h-24" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
                        </div>

                        <div>
                            <label className="block text-xs uppercase text-gray-500 mb-1">Image (Optional)</label>
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
                            {editingId ? 'Update Exhibition' : 'Save Exhibition'}
                        </button>
                    </form>
                </div>
            )}

            <div className="space-y-6">
                {exhibitions.map(ex => (
                    <div key={ex.id} className="border border-gray-100 p-6 bg-white shadow-sm flex flex-col md:flex-row gap-6">
                        {/* Optional Image */}
                        <div className="w-full md:w-48 h-32 shrink-0 relative">
                            {ex.image ? (
                                <Image src={ex.image} alt={ex.title} fill className="object-cover bg-gray-50" />
                            ) : (
                                <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-300 text-xs uppercase">
                                    No Image
                                </div>
                            )}
                        </div>

                        <div className="flex-1">
                            <h4 className="font-bold text-lg mb-2">{ex.title}</h4>
                            <div className="flex flex-col gap-1 text-sm text-gray-500 mb-4">
                                <div className="flex items-center gap-2">
                                    <Calendar size={14} /> <span>{ex.period}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin size={14} /> <span>{ex.location}</span>
                                </div>
                            </div>
                            <p className="text-sm text-gray-600 line-clamp-2">{ex.description}</p>
                        </div>

                        <div className="flex flex-row md:flex-col gap-2 self-start md:self-center">
                            <button onClick={() => handleEdit(ex)} className="text-gray-400 hover:text-black transition-colors">
                                <Pencil size={18} />
                            </button>
                            <button onClick={() => deleteExhibition(ex.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div >
    );
};

export default ExhibitionManager;
