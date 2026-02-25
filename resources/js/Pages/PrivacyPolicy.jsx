import React from 'react';
import { Head, Link } from '@inertiajs/react';

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
            <Head title="Privacy Policy" />

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
                    <span className="text-sm text-gray-400 font-medium tracking-wider uppercase">Privacy Policy</span>
                </div>

                <div className="prose prose-indigo max-w-none text-gray-600">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-8 leading-tight">Privacy Policy</h1>
                    <p className="text-lg leading-relaxed mb-8">
                        At <span className="font-semibold text-gray-900">MsgOps</span>, accessible from <Link href="/" className="text-indigo-600 hover:underline">msgops.in</Link>, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by MsgOps and how we use it.
                    </p>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 border-l-4 border-indigo-500 pl-4">1. Information We Collect</h2>
                        <p className="mb-4">We collect several different types of information for various purposes to provide and improve our service to you:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Personal Data:</strong> While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). This includes, but is not limited to, email address, name, and phone number.</li>
                            <li><strong>WhatsApp Data:</strong> To provide WhatsApp automation, we process messages, contacts, and phone number IDs provided through the Meta API.</li>
                            <li><strong>Usage Data:</strong> Information on how the Service is accessed and used.</li>
                        </ul>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 border-l-4 border-indigo-500 pl-4">2. How We Use Your Data</h2>
                        <p className="mb-4">MsgOps uses the collected data for various purposes:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>To provide and maintain our Service.</li>
                            <li>To notify you about changes to our Service.</li>
                            <li>To provide customer support.</li>
                            <li>To gather analysis or valuable information so that we can improve our Service.</li>
                            <li>To monitor the usage of our Service.</li>
                            <li>To detect, prevent and address technical issues.</li>
                        </ul>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 border-l-4 border-indigo-500 pl-4">3. Data Security</h2>
                        <p>The security of your data is important to us but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.</p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 border-l-4 border-indigo-500 pl-4">4. Your Rights</h2>
                        <p>You have the right to access, update or delete the information we have on you. You can do this by contacting us directly.</p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 border-l-4 border-indigo-500 pl-4">5. Contact Us</h2>
                        <p>If you have any questions about this Privacy Policy, please contact us:</p>
                        <ul className="list-disc pl-6">
                            <li>By email: support@msgops.in</li>
                        </ul>
                    </section>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-100 flex flex-wrap gap-4">
                    <Link href="/terms" className="text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors">Terms of Service</Link>
                    <Link href="/data-deletion" className="text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors">Data Deletion</Link>
                    <Link href="/" className="text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors ml-auto">Back to Home</Link>
                </div>
            </div>
        </div>
    );
}
