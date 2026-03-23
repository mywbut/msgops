import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, useForm, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import Modal from '@/Components/Modal';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';

export default function Contacts() {
    const { isConnected, contacts = [], filters = {} } = usePage().props;
    const [search, setSearch] = useState(filters.search || '');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isImportModalOpen, setIsImportModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [editingContact, setEditingContact] = useState(null);
    const [deletingContact, setDeletingContact] = useState(null);

    // Form for Add/Edit
    const { data, setData, post, patch, delete: destroy, processing, errors, reset, clearErrors } = useForm({
        name: '',
        phone_number: '',
        tags: [],
    });

    // Form for Import
    const { data: importData, setData: setImportData, post: postImport, processing: importing, errors: importErrors, reset: resetImport } = useForm({
        file: null,
    });

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            router.get(route('whatsapp.contacts.index'), { search }, { preserveState: true, replace: true });
        }, 300);
        return () => clearTimeout(timeoutId);
    }, [search]);

    const openAddModal = () => {
        reset();
        clearErrors();
        setIsAddModalOpen(true);
    };

    const openEditModal = (contact) => {
        setEditingContact(contact);
        setData({
            name: contact.name || '',
            phone_number: contact.phone_number,
            tags: contact.tags || [],
        });
        clearErrors();
        setIsEditModalOpen(true);
    };

    const openDeleteModal = (contact) => {
        setDeletingContact(contact);
        setIsDeleteModalOpen(true);
    };

    const submitAdd = (e) => {
        e.preventDefault();
        post(route('whatsapp.contacts.store'), {
            onSuccess: () => {
                setIsAddModalOpen(false);
                reset();
            },
        });
    };

    const submitEdit = (e) => {
        e.preventDefault();
        patch(route('whatsapp.contacts.update', editingContact.id), {
            onSuccess: () => {
                setIsEditModalOpen(false);
                reset();
            },
        });
    };

    const submitDelete = (e) => {
        e.preventDefault();
        destroy(route('whatsapp.contacts.destroy', deletingContact.id), {
            onSuccess: () => setIsDeleteModalOpen(false),
        });
    };

    const submitImport = (e) => {
        e.preventDefault();
        postImport(route('whatsapp.contacts.import'), {
            onSuccess: () => {
                setIsImportModalOpen(false);
                resetImport();
            },
        });
    };

    const toggleTag = (tag) => {
        const currentTags = [...data.tags];
        const index = currentTags.indexOf(tag);
        if (index > -1) {
            currentTags.splice(index, 1);
        } else {
            currentTags.push(tag);
        }
        setData('tags', currentTags);
    };

    const presetTags = ['Hot Lead', 'Student', 'Follow Up', 'Customer', 'Spam'];

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Contact Directory (CRM)
                    </h2>
                    <div className="flex space-x-2">
                        <SecondaryButton onClick={() => setIsImportModalOpen(true)}>Import CSV</SecondaryButton>
                        <PrimaryButton onClick={openAddModal}>+ Add Contact</PrimaryButton>
                    </div>
                </div>
            }
        >
            <Head title="Contacts | Mini CRM" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">

                            {!isConnected && (
                                <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 rounded text-yellow-800 dark:text-yellow-200">
                                    <p className="font-semibold">WhatsApp is not connected.</p>
                                    <p className="text-sm">Connect your account for full automation features.</p>
                                </div>
                            )}

                            <div className="flex mb-6 space-x-4">
                                <div className="flex-1 relative">
                                    <input
                                        type="text"
                                        placeholder="Search by name or phone..."
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#1877F2] focus:ring-[#1877F2] dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                                        value={search}
                                        onChange={handleSearch}
                                        disabled={!isConnected}
                                    />
                                    {search && (
                                        <button 
                                            onClick={() => setSearch('')}
                                            className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                                        >✕</button>
                                    )}
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-900/50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone Number</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tags</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Messages</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                                        {contacts.length === 0 && (
                                            <tr>
                                                <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                                                    No contacts found.
                                                </td>
                                            </tr>
                                        )}
                                        {contacts.map((contact) => (
                                            <tr key={contact.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition duration-150">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                                                    {contact.name || <span className="text-gray-400 italic">Unknown</span>}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                    {contact.phone_number}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    <div className="flex flex-wrap gap-1">
                                                        {contact.tags && contact.tags.map(tag => (
                                                            <span key={tag} className="bg-gray-100 text-gray-700 text-[10px] px-1.5 py-0.5 rounded border border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600">
                                                                {tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-200">
                                                        {contact.message_count}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <button onClick={() => openEditModal(contact)} className="text-[#1877F2] hover:text-[#0c63d4] mr-3">Edit</button>
                                                    <button onClick={() => openDeleteModal(contact)} className="text-red-600 hover:text-red-900">Delete</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            {/* Add Contact Modal */}
            <Modal show={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
                <form onSubmit={submitAdd} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Add New Contact</h2>
                    <div className="space-y-4">
                        <div>
                            <InputLabel htmlFor="add_name" value="Name" />
                            <TextInput
                                id="add_name"
                                className="mt-1 block w-full"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                            />
                            <InputError message={errors.name} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel htmlFor="add_phone" value="Phone Number (with country code)" />
                            <TextInput
                                id="add_phone"
                                className="mt-1 block w-full"
                                value={data.phone_number}
                                onChange={(e) => setData('phone_number', e.target.value)}
                                required
                            />
                            <InputError message={errors.phone_number} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel value="Tags" />
                            <div className="flex flex-wrap gap-2 mt-2">
                                {presetTags.map(tag => (
                                    <button
                                        key={tag}
                                        type="button"
                                        onClick={() => toggleTag(tag)}
                                        className={`px-3 py-1 rounded-full text-xs border transition ${
                                            data.tags.includes(tag) 
                                            ? 'bg-[#1877F2] text-white border-[#1877F2]' 
                                            : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                                        }`}
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={() => setIsAddModalOpen(false)}>Cancel</SecondaryButton>
                        <PrimaryButton className="ms-3" disabled={processing}>Save Contact</PrimaryButton>
                    </div>
                </form>
            </Modal>

            {/* Edit Contact Modal */}
            <Modal show={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
                <form onSubmit={submitEdit} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Edit Contact</h2>
                    <div className="space-y-4">
                        <div>
                            <InputLabel htmlFor="edit_name" value="Name" />
                            <TextInput
                                id="edit_name"
                                className="mt-1 block w-full"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                            />
                            <InputError message={errors.name} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel htmlFor="edit_phone" value="Phone Number" />
                            <TextInput
                                id="edit_phone"
                                className="mt-1 block w-full"
                                value={data.phone_number}
                                onChange={(e) => setData('phone_number', e.target.value)}
                                required
                            />
                            <InputError message={errors.phone_number} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel value="Tags" />
                            <div className="flex flex-wrap gap-2 mt-2">
                                {presetTags.map(tag => (
                                    <button
                                        key={tag}
                                        type="button"
                                        onClick={() => toggleTag(tag)}
                                        className={`px-3 py-1 rounded-full text-xs border transition ${
                                            data.tags.includes(tag) 
                                            ? 'bg-[#1877F2] text-white border-[#1877F2]' 
                                            : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                                        }`}
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={() => setIsEditModalOpen(false)}>Cancel</SecondaryButton>
                        <PrimaryButton className="ms-3" disabled={processing}>Update Contact</PrimaryButton>
                    </div>
                </form>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal show={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
                <form onSubmit={submitDelete} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Are you sure?</h2>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        This will permanently delete the contact for {deletingContact?.phone_number}. This action cannot be undone.
                    </p>
                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={() => setIsDeleteModalOpen(false)}>Cancel</SecondaryButton>
                        <DangerButton className="ms-3" disabled={processing}>Delete Contact</DangerButton>
                    </div>
                </form>
            </Modal>

            {/* Import Modal */}
            <Modal show={isImportModalOpen} onClose={() => setIsImportModalOpen(false)}>
                <form onSubmit={submitImport} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Import Contacts from CSV</h2>
                    <p className="text-sm text-gray-500 mb-4">
                        Upload a CSV file with "name" and "phone" headings.
                    </p>
                    <input 
                        type="file" 
                        accept=".csv"
                        onChange={e => setImportData('file', e.target.files[0])}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    <InputError message={importErrors.file} className="mt-2" />
                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={() => setIsImportModalOpen(false)}>Cancel</SecondaryButton>
                        <PrimaryButton className="ms-3" disabled={importing}>Start Import</PrimaryButton>
                    </div>
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
}
