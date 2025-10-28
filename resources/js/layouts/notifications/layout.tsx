import Heading from '@/components/heading';
import { type PropsWithChildren } from 'react';


export default function NotificationsLayout({ children }: PropsWithChildren) {
    // When server-side rendering, we only render the layout on the client...
    if (typeof window === 'undefined') {
        return null;
    }

    const currentPath = window.location.pathname;

    return (
        <div className="px-10 py-6">
            <Heading
                title="Notifications"
                description="Manage your Notifications"
            />

            <div className="flex flex-col lg:space-x-12">
                <section className="space-y-12">
                    {children}
                </section>
            </div>
        </div>
    );
}
