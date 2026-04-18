import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage, router } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { MessageSquare, Bell, X } from 'lucide-react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);
    const [unreadCount, setUnreadCount] = useState(0);
    const [notification, setNotification] = useState(null);
    const prevUnreadCountRef = useRef(0);
    const incomingSoundRef = useRef(new Audio('https://assets.mixkit.co/active_storage/sfx/2358/2358-preview.mp3'));

    useEffect(() => {
        const fetchUnread = async () => {
            // Only poll if not on the inbox page to avoid double alerts
            if (route().current('whatsapp.inbox')) return;

            try {
                const response = await axios.get(route('api.whatsapp.unread-notifications'));
                const { unread_total, latest_message } = response.data;

                if (unread_total > prevUnreadCountRef.current && latest_message) {
                    // Play sound
                    incomingSoundRef.current.play().catch(e => console.log('Audio play blocked:', e));
                    
                    // Show notification toast
                    setNotification(latest_message);
                    
                    // Auto-hide after 10 seconds
                    setTimeout(() => setNotification(null), 10000);
                }

                setUnreadCount(unread_total);
                prevUnreadCountRef.current = unread_total;
            } catch (error) {
                console.error('Error fetching unread notifications:', error);
            }
        };

        const interval = setInterval(fetchUnread, 30000); // 30 seconds
        fetchUnread(); // Initial check

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <nav className="border-b border-gray-100 bg-white dark:border-gray-700 dark:bg-gray-800">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-14 justify-between">
                        <div className="flex">
                            <div className="flex shrink-0 items-center">
                                <Link href="/">
                                    <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800 dark:text-gray-200" />
                                </Link>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink
                                    href={route('dashboard')}
                                    active={route().current('dashboard')}
                                >
                                    Dashboard
                                </NavLink>
                                <NavLink
                                    href={route('whatsapp.inbox')}
                                    active={route().current('whatsapp.inbox')}
                                >
                                    Inbox
                                </NavLink>
                                <NavLink
                                    href={route('whatsapp.connect')}
                                    active={route().current('whatsapp.connect')}
                                >
                                    Connect
                                </NavLink>
                                <NavLink
                                    href={route('whatsapp.campaigns.index')}
                                    active={route().current('whatsapp.campaigns.*')}
                                >
                                    Campaigns
                                </NavLink>
                                <NavLink
                                    href={route('whatsapp.contacts.index')}
                                    active={route().current('whatsapp.contacts.index')}
                                >
                                    Contacts
                                </NavLink>
                                <NavLink
                                    href={route('whatsapp.templates.index')}
                                    active={route().current('whatsapp.templates.*')}
                                >
                                    Templates
                                </NavLink>
                                <NavLink
                                    href={route('whatsapp.logs')}
                                    active={route().current('whatsapp.logs')}
                                >
                                    Logs
                                </NavLink>
                                <NavLink
                                    href={route('whatsapp.automation.index')}
                                    active={route().current('whatsapp.automation.*')}
                                >
                                    Automation
                                </NavLink>
                                <NavLink
                                    href={route('billing.index')}
                                    active={route().current('billing.index')}
                                >
                                    Billing
                                </NavLink>
                                <NavLink
                                    href={route('settings')}
                                    active={route().current('settings')}
                                >
                                    Settings
                                </NavLink>
                            </div>
                        </div>

                        <div className="hidden sm:ms-6 sm:flex sm:items-center">
                            <div className="relative ms-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none dark:bg-gray-800 dark:text-gray-400 dark:hover:text-gray-300"
                                            >
                                                {user.name}

                                                <svg
                                                    className="-me-0.5 ms-2 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={route('profile.edit')}
                                        >
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState,
                                    )
                                }
                                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none dark:text-gray-500 dark:hover:bg-gray-900 dark:hover:text-gray-400 dark:focus:bg-gray-900 dark:focus:text-gray-400"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={
                        (showingNavigationDropdown ? 'block' : 'hidden') +
                        ' sm:hidden'
                    }
                >
                    <div className="space-y-1 pb-3 pt-2">
                        <ResponsiveNavLink
                            href={route('dashboard')}
                            active={route().current('dashboard')}
                        >
                            Dashboard
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route('whatsapp.inbox')}
                            active={route().current('whatsapp.inbox')}
                        >
                            Inbox
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route('whatsapp.connect')}
                            active={route().current('whatsapp.connect')}
                        >
                            Connect
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route('whatsapp.campaigns.index')}
                            active={route().current('whatsapp.campaigns.*')}
                        >
                            Campaigns
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route('whatsapp.contacts.index')}
                            active={route().current('whatsapp.contacts.index')}
                        >
                            Contacts
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route('whatsapp.templates.index')}
                            active={route().current('whatsapp.templates.*')}
                        >
                            Templates
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route('whatsapp.logs')}
                            active={route().current('whatsapp.logs')}
                        >
                            Logs
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route('whatsapp.automation.index')}
                            active={route().current('whatsapp.automation.*')}
                        >
                            Automation
                        </ResponsiveNavLink>
                    </div>

                    <div className="border-t border-gray-200 pb-1 pt-4 dark:border-gray-600">
                        <div className="px-4">
                            <div className="text-base font-medium text-gray-800 dark:text-gray-200">
                                {user.name}
                            </div>
                            <div className="text-sm font-medium text-gray-500">
                                {user.email}
                            </div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>
                                Profile
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                method="post"
                                href={route('logout')}
                                as="button"
                            >
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow dark:bg-gray-800">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>

            {/* Global Notification Toast */}
            {notification && (
                <div className="fixed bottom-8 right-8 z-[100] animate-in slide-in-from-right duration-500">
                    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700 p-1 flex items-stretch overflow-hidden max-w-sm">
                        <div className="bg-[#25D366] w-2 rounded-l-2xl"></div>
                        <div className="flex-1 p-5">
                            <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center gap-2">
                                    <div className="p-2 bg-[#25D366]/10 rounded-xl text-[#25D366]">
                                        <MessageSquare className="w-4 h-4" />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">New Message</span>
                                </div>
                                <button onClick={() => setNotification(null)} className="text-gray-300 hover:text-gray-500 transition-colors">
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                            <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-1">{notification.contact_name}</h4>
                            <p className="text-xs text-gray-500 line-clamp-2 mb-4 leading-relaxed">
                                {notification.snippet}
                            </p>
                            <Link 
                                href={route('whatsapp.inbox', { contactId: notification.contact_id })}
                                onClick={() => setNotification(null)}
                                className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#25D366] hover:gap-3 transition-all"
                            >
                                View Chat <Bell className="w-3 h-3" />
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
