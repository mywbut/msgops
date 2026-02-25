import React from 'react';
import { Head, Link } from '@inertiajs/react';

export default function TermsOfService() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
            <Head title="Terms of Service" />

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
                    <span className="text-sm text-gray-400 font-medium tracking-wider uppercase">Terms & Conditions</span>
                </div>

                <div className="prose prose-indigo max-w-none text-gray-600">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-8 leading-tight">Terms of Service</h1>

                    <p className="text-lg leading-relaxed mb-8">
                        Welcome to <span className="font-semibold text-gray-900">MsgOps</span>! These terms and conditions outline the rules and regulations for the use of MsgOps's Website and Platform.
                    </p>

                    <section className="mb-10 text-gray-600">
                        <p className="mb-4 italic bg-indigo-50 p-4 rounded-lg border-l-4 border-indigo-400 text-indigo-900">
                            By accessing this website we assume you accept these terms and conditions. Do not continue to use MsgOps if you do not agree to take all of the terms and conditions stated on this page.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 border-l-4 border-indigo-500 pl-4">1. License</h2>
                        <p className="mb-4">Unless otherwise stated, MsgOps and/or its licensors own the intellectual property rights for all material on MsgOps. All intellectual property rights are reserved.</p>
                        <p>You must not:</p>
                        <ul className="list-disc pl-6 space-y-2 mt-4">
                            <li>Republish material from MsgOps</li>
                            <li>Sell, rent or sub-license material from MsgOps</li>
                            <li>Reproduce, duplicate or copy material from MsgOps</li>
                            <li>Redistribute content from MsgOps</li>
                        </ul>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 border-l-4 border-indigo-500 pl-4">2. Use of WhatsApp API</h2>
                        <p className="mb-4">Our platform integrates with Meta's WhatsApp Business API. You agree to comply with all <a href="https://www.whatsapp.com/legal/business-policy/" className="text-indigo-600 hover:underline" target="_blank" rel="noopener noreferrer">WhatsApp Business Policies</a> and <a href="https://developers.facebook.com/terms/" className="text-indigo-600 hover:underline" target="_blank" rel="noopener noreferrer">Meta Developer Terms</a>.</p>
                        <p>Misuse of the platform for spamming or violating WhatsApp's policies may lead to immediate termination of your account.</p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 border-l-4 border-indigo-500 pl-4">3. Termination</h2>
                        <p>We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 border-l-4 border-indigo-500 pl-4">4. Governing Law</h2>
                        <p>These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions.</p>
                    </section>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-100 flex flex-wrap gap-4">
                    <Link href="/privacy-policy" className="text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors">Privacy Policy</Link>
                    <Link href="/data-deletion" className="text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors">Data Deletion</Link>
                    <Link href="/" className="text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors ml-auto">Back to Home</Link>
                </div>
            </div>
        </div>
    );
}
