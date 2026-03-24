import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            <div className="mb-8">
                <h2 className="text-3xl font-bold text-[#0B1F2A] font-heading mb-2">Welcome Back</h2>
                <p className="text-gray-400 text-sm">Please enter your details to sign in to your workspace.</p>
            </div>

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600 bg-green-50 p-3 rounded-lg border border-green-100">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-5">
                <div>
                    <InputLabel htmlFor="email" value="Work Email" className="text-gray-700 font-semibold mb-1.5" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="w-full border-gray-100 bg-gray-50 rounded-xl px-4 py-3 placeholder:text-gray-300 focus:ring-2 focus:ring-[#25D366] transition-all"
                        placeholder="name@company.com"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div>
                    <div className="flex justify-between items-center mb-1.5">
                        <InputLabel htmlFor="password" value="Password" className="text-gray-700 font-semibold" />
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-xs font-semibold text-[#4F46E5] hover:text-[#25D366] transition-all"
                            >
                                Forgot password?
                            </Link>
                        )}
                    </div>

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="w-full border-gray-100 bg-gray-50 rounded-xl px-4 py-3 placeholder:text-gray-300 focus:ring-2 focus:ring-[#25D366] transition-all"
                        placeholder="••••••••"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="flex items-center justify-between py-2">
                    <label className="flex items-center cursor-pointer">
                        <Checkbox
                            name="remember"
                            className="rounded border-gray-200 text-[#25D366] shadow-sm focus:ring-[#25D366]"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                        />
                        <span className="ms-2 text-sm text-gray-500">
                            Remember me
                        </span>
                    </label>
                </div>

                <div>
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-[#25D366]/20 transition-all transform hover:-translate-y-0.5 disabled:opacity-50"
                    >
                        Sign In
                    </button>
                </div>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-50 text-center">
                <p className="text-sm text-gray-500">
                    Don't have an account?{' '}
                    <Link
                        href={route('register')}
                        className="font-bold text-[#4F46E5] hover:text-[#25D366] transition-all underline decoration-2 underline-offset-4"
                    >
                        Start your free trial
                    </Link>
                </p>
            </div>
        </GuestLayout>
    );
}
