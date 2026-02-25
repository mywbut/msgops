import React from 'react';
import { Head, Link } from '@inertiajs/react';

export default function DataDeletion() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
            <Head title="Data Deletion Instructions" />

            <div className="max-w-4xl w-full bg-white shadow-xl rounded-2xl p-8 sm:p-12 overflow-hidden border border-gray-100">
                <div className="flex justify-between items-center mb-10 border-b border-gray-100 pb-6">
                    <Link href="/" className="text-indigo-600 hover:text-indigo-500 font-bold text-2xl flex items-center gap-2">
                        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M7 12L12 7L17 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        MsgOps
                    </Link>
                    <span className="text-sm text-gray-400 font-medium tracking-wider uppercase">Data Deletion</span>
                </div>

                <div className="prose prose-indigo max-w-none text-gray-600">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-8 leading-tight">Data Deletion Instructions</h1>

                    <p className="text-lg leading-relaxed mb-8">
                        MsgOps is a WhatsApp automation platform. According to Meta's developer policies, we provide this page to explain how users can request the deletion of their data from our platform.
                    </p>

                    <section className="mb-10">
                        <div className="bg-red-50 p-6 rounded-xl border border-red-100 mb-8">
                            <h2 className="text-xl font-bold text-red-900 mb-4 flex items-center gap-2">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                Requesting Data Deletion
                            </h2>
                            <p className="text-red-800 leading-relaxed">
                                If you want to delete your activities for MsgOps SaaS, you can remove your information by following these steps:
                            </p>
                            <ol className="list-decimal pl-6 mt-4 space-y-2 text-red-800 font-medium">
                                <li>Go to your Facebook Account's "Settings & Privacy" menu.</li>
                                <li>Click on "Settings".</li>
                                <li>Scroll down and click on "Business Integrations".</li>
                                <li>Find "MsgOps SaaS", click on the "Remove" button.</li>
                            </ol>
                        </div>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 border-l-4 border-indigo-500 pl-4">Manual Deletion Request</h2>
                        <p className="mb-4">Alternatively, you can request manual deletion of your account and all associated data by contacting our support team:</p>
                        <div className="bg-gray-100 p-6 rounded-lg font-mono text-sm">
                            Email: <span className="text-indigo-600 font-bold underline">support@msgops.in</span><br />
                            Subject: Data Deletion Request - [Your Account Name]
                        </div>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 border-l-4 border-indigo-500 pl-4">Data we delete</h2>
                        <ul className="list-disc pl-6 space-y-2 mt-4">
                            <li>Account profile information</li>
                            <li>Connected WhatsApp configurations</li>
                            <li>Message logs and contact records</li>
                            <li>API access tokens</li>
                        </ul>
                    </section>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-100 flex flex-wrap gap-4">
                    <Link href="/privacy-policy" className="text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors">Privacy Policy</Link>
                    <Link href="/terms" className="text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors">Terms of Service</Link>
                    <Link href="/" className="text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors ml-auto">Back to Home</Link>
                </div>
            </div>
        </div>
    );
}
