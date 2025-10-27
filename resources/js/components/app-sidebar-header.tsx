import { Breadcrumbs } from '@/components/breadcrumbs';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Auth, Notification, type BreadcrumbItem as BreadcrumbItemType } from '@/types';
import { router, usePage } from '@inertiajs/react';
import { useEchoModel } from '@laravel/echo-react';
import { Bell } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Badge } from './ui/badge';
import { toast } from 'sonner';
import { index as notificationIndexPage } from '@/routes/notifications';

type PageProps = {
    auth: Auth
}

export function AppSidebarHeader({
    breadcrumbs = [],
}: {
    breadcrumbs?: BreadcrumbItemType[];
}) {
    const { auth } = usePage<PageProps>().props

    const { channel } = useEchoModel('App.Models.User', auth.user.id);

    const [notification, setNotification] = useState<Notification | null>(null);

    channel().notification((notification: Notification) => {
        console.log(notification);
    });

    useEffect(() => {
        const userChannel = channel();

        const notificationHandler = (notification: Notification) => {
            setNotification(notification)

            const message = notification.type === 'product.created' ? `Product ${notification.name} has been created` : 'Action have been created'

            toast(message, {
                description: "You can now make another",
                action: {
                    label: "Review",
                    onClick: () => console.log("Review"),
                },
            })
        };

        userChannel.notification(notificationHandler);

        // cleanup to prevent duplicate listeners
        return () => {
            userChannel.stopListening('.Illuminate\\Notifications\\Events\\BroadcastNotificationCreated');
        };
    }, [auth.user.id]); // re-run only if user changes

    return (
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-sidebar-border/50 px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4">
            <div className="flex w-full justify-between items-center">
                <div className="flex items-center gap-2">
                    <SidebarTrigger className="-ml-1" />
                    <Breadcrumbs breadcrumbs={breadcrumbs} />
                </div>
                <div onClick={() => {
                    setNotification(null)
                    router.visit(notificationIndexPage())
                }} className="flex relative cursor-pointer">
                    {notification && <Badge
                        className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums absolute -top-2 -left-2"
                        variant="destructive"
                    >
                        1
                    </Badge>}
                    <Bell />
                </div>
            </div>
        </header>
    );
}
