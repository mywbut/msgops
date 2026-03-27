import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { MessageSquare } from 'lucide-react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        phone: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout
            leftTitle="Start Growing Your Business on WhatsApp 🚀"
            leftSubtitle="Send offers, follow-ups and updates automatically. No technical knowledge required."
            leftFeatures={[
                'Bulk messaging',
                'Auto follow-ups',
                'Team inbox',
                'Quick setup',
            ]}
            leftFooter="Trusted by 100+ businesses in Kolkata & West Bengal"
            leftExtra={
                <div className="p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                    <h3 className="text-xl font-bold text-white mb-2 font-heading">Prefer WhatsApp?</h3>
                    <p className="text-gray-400 text-sm mb-6">
                        👉 Chat with us to get started instantly
                    </p>
                    <a
                        href="https://wa.me/919038073878?text=Hi%2C%20I%20am%20interested%20in%20MsgOps.%20Please%20share%20demo."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#128C7E] text-[#0B1F2A] font-black py-4 px-8 rounded-xl transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-[#25D366]/20"
                    >
                        <MessageSquare className="w-5 h-5" />
                        Chat on WhatsApp
                    </a>
                </div>
            }
            mobileHeader={
                <div className="text-center">
                    <h2 className="text-xl font-black text-[#0B1F2A] mb-2 leading-tight">🚀 Grow Your Business <br/> on WhatsApp</h2>
                    <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                        <span>✔ Bulk messaging</span>
                        <span>✔ Auto follow-ups</span>
                        <span>✔ No technical skills</span>
                    </div>
                    <p className="text-[9px] text-[#25D366] font-black uppercase tracking-widest">Trusted by 100+ businesses in Kolkata</p>
                </div>
            }
        >
            <Head>
                <title>Create Your MsgOps Account - Start WhatsApp Marketing Today</title>
                <meta name="description" content="Sign up for MsgOps and start sending WhatsApp messages, automating follow-ups, and managing customers. Free trial available. No credit card required." />
                <meta name="keywords" content="whatsapp marketing signup, whatsapp automation signup, create whatsapp business account, msgops signup" />
            </Head>

            <div className="flex justify-start mb-4 lg:-mt-4">
                <p className="text-sm text-gray-500">
                    Already have an account?{' '}
                    <Link
                        href={route('login')}
                        className="font-bold text-[#25D366] hover:text-[#128C7E] transition-all underline decoration-2 underline-offset-4"
                    >
                        Sign in instead
                    </Link>
                </p>
            </div>

            <div className="mb-4 sm:mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#0B1F2A] font-heading mb-1 sm:mb-2">Start Free Trial</h2>
                <p className="text-gray-400 text-xs sm:text-sm">7-day free trial. No credit card required.</p>
            </div>

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <InputLabel htmlFor="name" value="Full Name" className="text-gray-700 font-semibold mb-1.5" />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="w-full border-gray-100 bg-gray-50 rounded-xl px-4 py-3 placeholder:text-gray-300 focus:ring-2 focus:ring-[#25D366] transition-all"
                        placeholder=""
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Work Email" className="text-gray-700 font-semibold mb-1.5" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="w-full border-gray-100 bg-gray-50 rounded-xl px-4 py-3 placeholder:text-gray-300 focus:ring-2 focus:ring-[#25D366] transition-all"
                        placeholder=""
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="phone" value="Mobile Number (10 digit)" className="text-gray-700 font-semibold mb-1.5" />

                    <TextInput
                        id="phone"
                        type="tel"
                        name="phone"
                        value={data.phone}
                        className="w-full border-gray-100 bg-gray-50 rounded-xl px-4 py-3 placeholder:text-gray-300 focus:ring-2 focus:ring-[#25D366] transition-all"
                        placeholder=""
                        maxLength="10"
                        pattern="[0-9]{10}"
                        onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                            setData('phone', val);
                        }}
                        required
                    />

                    <InputError message={errors.phone} className="mt-2" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <InputLabel htmlFor="password" value="Password" className="text-gray-700 font-semibold mb-1.5" />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="w-full border-gray-100 bg-gray-50 rounded-xl px-4 py-3 placeholder:text-gray-300 focus:ring-2 focus:ring-[#25D366] transition-all"
                            placeholder=""
                            autoComplete="new-password"
                            onChange={(e) => setData('password', e.target.value)}
                            required
                        />

                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel
                            htmlFor="password_confirmation"
                            value="Confirm Password"
                            className="text-gray-700 font-semibold mb-1.5"
                        />

                        <TextInput
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="w-full border-gray-100 bg-gray-50 rounded-xl px-4 py-3 placeholder:text-gray-300 focus:ring-2 focus:ring-[#25D366] transition-all"
                            placeholder=""
                            autoComplete="new-password"
                            onChange={(e) =>
                                setData('password_confirmation', e.target.value)
                            }
                            required
                        />

                        <InputError
                            message={errors.password_confirmation}
                            className="mt-2"
                        />
                    </div>
                </div>



                <div className="pt-2">
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-[#4F46E5] hover:bg-[#4338CA] text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-indigo-200 transition-all transform hover:-translate-y-0.5 disabled:opacity-50"
                    >
                        Start Free Trial
                    </button>
                </div>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-50 text-center text-xs text-gray-400">
                By clicking "Start Free Trial", you agree to our <Link href={route('terms')} className="underline">Terms of Service</Link> and <Link href={route('privacy.policy')} className="underline">Privacy Policy</Link>.
            </div>


        </GuestLayout>
    );
}
