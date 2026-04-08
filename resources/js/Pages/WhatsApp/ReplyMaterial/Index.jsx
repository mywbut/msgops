import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { useState } from 'react';
import { 
    Plus, 
    MessageSquare, 
    FileText, 
    Image as ImageIcon, 
    Film, 
    Search,
    Trash2,
    Edit3,
    X,
    CheckCircle2,
    Smile,
    ArrowRight
} from 'lucide-react';

export default function Index({ materials }) {
    const [activeTab, setActiveTab] = useState('text');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const { data, setData, post, delete: destroy, reset, processing, errors } = useForm({
        name: '',
        type: 'text',
        content: {
            body: '',
            url: '',
            caption: ''
        }
    });

    const tabs = [
        { id: 'text', label: 'Text', icon: MessageSquare },
        { id: 'image', label: 'Image', icon: ImageIcon },
        { id: 'video', label: 'Video', icon: Film },
        { id: 'document', label: 'Document', icon: FileText },
        { id: 'sticker', label: 'Sticker', icon: Smile },
    ];

    const filteredMaterials = (materials || []).filter(m => 
        m.type === activeTab && 
        (m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
         (m.type === 'text' && m.content.body && m.content.body.toLowerCase().includes(searchQuery.toLowerCase())))
    );

    const submit = (e) => {
        e.preventDefault();
        post(route('whatsapp.reply-material.store'), {
            onSuccess: () => {
                setShowCreateModal(false);
                reset({
                    name: '',
                    type: activeTab,
                    content: { body: '', url: '', caption: '' }
                });
            }
        });
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this material?')) {
            destroy(route('whatsapp.reply-material.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center bg-white py-6 px-10 border-b border-gray-50">
                    <div>
                        <h2 className="text-3xl font-black text-[#0B1F2A] font-heading tracking-tight">Reply Material</h2>
                        <p className="text-sm text-gray-400 mt-1 font-medium">Manage your library of reusable WhatsApp content</p>
                    </div>
                    <div className="flex gap-4">
                         <Link
                            href={route('whatsapp.automation.index')}
                            className="px-6 py-2.5 text-[10px] font-black uppercase tracking-widest text-[#4F46E5] bg-indigo-50 hover:bg-indigo-100 rounded-2xl transition-all border border-indigo-100 flex items-center gap-2 group shadow-sm active:scale-95"
                        >
                            <ArrowRight className="w-4 h-4" />
                            To Automations
                        </Link>
                        <button
                            onClick={() => {
                                setData('type', activeTab);
                                setShowCreateModal(true);
                            }}
                            className="bg-[#25D366] hover:bg-[#128C7E] text-white px-8 py-2.5 rounded-2xl shadow-xl shadow-[#25D366]/20 text-[10px] uppercase font-black tracking-[0.15em] transition-all transform hover:-translate-y-0.5 flex items-center gap-3 active:scale-95"
                        >
                            <Plus className="w-4 h-4" />
                            Add Material
                        </button>
                    </div>
                </div>
            }
        >
            <Head title="Reply Material Library" />

            <div className="py-10 px-10">
                <div className="mx-auto max-w-[1400px]">
                    
                    {/* Tabs and Search */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                        <div className="flex bg-white p-1.5 rounded-[1.5rem] shadow-sm border border-gray-50 overflow-x-auto no-scrollbar">
                            {tabs.map((tab) => {
                                const Icon = tab.icon;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex items-center gap-2.5 px-6 py-2.5 rounded-xl text-[10px] uppercase font-black tracking-widest transition-all ${
                                            activeTab === tab.id 
                                            ? 'bg-[#0B1F2A] text-white shadow-lg' 
                                            : 'text-gray-400 hover:text-[#0B1F2A] hover:bg-gray-50'
                                        }`}
                                    >
                                        <Icon className="w-4 h-4" />
                                        {tab.label}
                                    </button>
                                );
                            })}
                        </div>

                        <div className="relative group max-w-md w-full">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-[#25D366] transition-colors" />
                            <input 
                                type="text"
                                placeholder="Search materials..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-6 py-3.5 bg-white border border-gray-100 rounded-2xl text-sm font-medium focus:ring-4 focus:ring-[#25D366]/5 focus:border-[#25D366] transition-all shadow-sm outline-none"
                            />
                        </div>
                    </div>

                    {/* Content Grid */}
                    {filteredMaterials.length === 0 ? (
                        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-black/5 border border-gray-50 py-32 text-center">
                            <div className="w-24 h-24 bg-gray-50 rounded-[2rem] flex items-center justify-center mx-auto mb-8 text-gray-200">
                                {(() => {
                                    const TabIcon = tabs.find(t => t.id === activeTab)?.icon;
                                    return TabIcon ? <TabIcon className="w-10 h-10" /> : null;
                                })()}
                            </div>
                            <h3 className="text-2xl font-black text-[#0B1F2A] mb-3 tracking-tight">No {activeTab} materials found</h3>
                            <p className="text-gray-400 font-medium max-w-xs mx-auto mb-10">Create your first {activeTab} material to reuse in your automation rules.</p>
                            <button
                                onClick={() => {
                                    setData('type', activeTab);
                                    setShowCreateModal(true);
                                }}
                                className="px-12 py-3.5 bg-[#0B1F2A] text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-2xl shadow-black/10 transition-all hover:-translate-y-1 active:scale-95"
                            >
                                Create First {activeTab} 
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                            {filteredMaterials.map((material) => (
                                <div key={material.id} className="group bg-white rounded-[2.5rem] p-8 shadow-xl shadow-black/5 border border-gray-50 hover:-translate-y-1 transition-all flex flex-col justify-between min-h-[320px]">
                                    <div>
                                        <div className="flex justify-between items-start mb-6">
                                            <div>
                                                <h4 className="text-xl font-black text-[#0B1F2A] tracking-tight truncate max-w-[180px]">{material.name}</h4>
                                                <p className="text-[10px] text-gray-300 font-bold uppercase tracking-widest mt-1">
                                                    Added {new Date(material.created_at).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <div className="flex gap-2">
                                                <button className="p-2.5 bg-gray-50 text-gray-400 hover:text-[#4F46E5] hover:bg-indigo-50 rounded-xl transition-all">
                                                    <Edit3 className="w-4 h-4" />
                                                </button>
                                                <button 
                                                    onClick={() => handleDelete(material.id)}
                                                    className="p-2.5 bg-gray-50 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Preview Area */}
                                        <div className="bg-[#F8FAFC] rounded-2xl p-6 min-h-[160px] flex flex-col justify-center border border-gray-100 overflow-hidden">
                                            {material.type === 'text' ? (
                                                <p className="text-sm font-medium text-gray-700 leading-relaxed line-clamp-6 whitespace-pre-wrap italic">
                                                    "{material.content.body}"
                                                </p>
                                            ) : (
                                                <div className="space-y-4">
                                                    <div className="aspect-[4/3] bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center text-gray-300 relative group/media">
                                                         {material.type === 'image' && <ImageIcon className="w-12 h-12" />}
                                                         {material.type === 'video' && <Film className="w-12 h-12" />}
                                                         {material.type === 'document' && <FileText className="w-12 h-12" />}
                                                         <div className="absolute inset-0 bg-black/5 group-hover/media:bg-transparent transition-colors"></div>
                                                    </div>
                                                    {material.content.caption && (
                                                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wide truncate">{material.content.caption}</p>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    
                                    <div className="mt-6 pt-6 border-t border-gray-50 flex items-center justify-between">
                                          <div className="flex items-center gap-2">
                                              <div className="w-1.5 h-1.5 bg-[#25D366] rounded-full"></div>
                                              <span className="text-[9px] font-black uppercase text-gray-400 tracking-widest">Library Item</span>
                                          </div>
                                          <div className="text-[9px] font-black uppercase text-[#25D366] bg-green-50 px-3 py-1 rounded-lg tracking-widest border border-green-100">Ready to use</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Create Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 z-50 bg-[#0B1F2A]/60 backdrop-blur-md flex items-center justify-center p-6 animate-fade-in">
                    <div className="bg-white rounded-[3rem] shadow-2xl w-full max-w-2xl overflow-hidden animate-scale-up">
                        <div className="px-10 py-10 flex items-center justify-between border-b border-gray-50">
                            <div>
                                <h3 className="text-2xl font-black text-[#0B1F2A] tracking-tight">New {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Material</h3>
                                <p className="text-sm text-gray-400 font-medium mt-1">Define your reusable response</p>
                            </div>
                            <button 
                                onClick={() => setShowCreateModal(false)}
                                className="p-4 text-gray-300 hover:text-[#0B1F2A] hover:bg-gray-50 rounded-[1.5rem] transition-all"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <form onSubmit={submit} className="p-10">
                            <div className="space-y-8">
                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-1">Material Name</label>
                                    <input 
                                        type="text"
                                        placeholder="e.g. Welcome Message"
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        className="w-full px-6 py-4 bg-[#F8FAFC] border border-gray-100 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-[#25D366]/5 focus:border-[#25D366] transition-all outline-none"
                                        required
                                    />
                                    {errors.name && <p className="text-red-500 text-[10px] font-black mt-2 ml-1">{errors.name}</p>}
                                </div>

                                {data.type === 'text' ? (
                                    <div>
                                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-1">Message Content</label>
                                        <textarea 
                                            placeholder="Write your message here..."
                                            value={data.content.body}
                                            onChange={e => setData('content', { ...data.content, body: e.target.value })}
                                            rows="6"
                                            className="w-full px-6 py-4 bg-[#F8FAFC] border border-gray-100 rounded-2xl text-sm font-medium focus:ring-4 focus:ring-[#25D366]/5 focus:border-[#25D366] transition-all resize-none outline-none leading-relaxed"
                                            required
                                        ></textarea>
                                    </div>
                                ) : (
                                    <>
                                        <div>
                                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-1">Media URL</label>
                                            <input 
                                                type="url"
                                                placeholder="https://..."
                                                value={data.content.url}
                                                onChange={e => setData('content', { ...data.content, url: e.target.value })}
                                                className="w-full px-6 py-4 bg-[#F8FAFC] border border-gray-100 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-[#25D366]/5 focus:border-[#25D366] transition-all outline-none"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-1">Caption (Optional)</label>
                                            <input 
                                                type="text"
                                                placeholder="Brief description..."
                                                value={data.content.caption}
                                                onChange={e => setData('content', { ...data.content, caption: e.target.value })}
                                                className="w-full px-6 py-4 bg-[#F8FAFC] border border-gray-100 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-[#25D366]/5 focus:border-[#25D366] transition-all outline-none"
                                            />
                                        </div>
                                    </>
                                )}
                            </div>

                            <div className="mt-12 flex gap-4">
                                <button
                                    type="button"
                                    onClick={() => setShowCreateModal(false)}
                                    className="flex-1 py-4 bg-gray-50 text-gray-500 font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-gray-100 transition-all active:scale-95"
                                >
                                    Cancel
                                </button>
                                <button
                                    disabled={processing}
                                    className="flex-[2] py-4 bg-[#25D366] text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-[#25D366]/20 transition-all hover:-translate-y-1 active:scale-95 disabled:opacity-50 disabled:translate-y-0"
                                >
                                    {processing ? 'Saving...' : 'Save Material'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <style dangerouslySetInnerHTML={{ __html: `
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@700;900&family=Inter:wght@400;500;600;700;900&display=swap');
                .font-heading { font-family: 'Poppins', 'Inter', sans-serif; }
                body { font-family: 'Inter', sans-serif; }
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes scale-up {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
                .animate-fade-in { animation: fade-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
                .animate-scale-up { animation: scale-up 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
            `}} />
        </AuthenticatedLayout>
    );
}
