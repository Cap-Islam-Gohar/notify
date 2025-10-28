import { Head, router, usePage } from '@inertiajs/react';

import HeadingSmall from '@/components/heading-small';
import { Notification, type BreadcrumbItem } from '@/types';

import AppLayout from '@/layouts/app-layout';

import { Button } from '@/components/ui/button';
import notifications, { markAsRead, markAsUnread } from '@/routes/notifications';


import {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemTitle,
} from "@/components/ui/item"
import NotificationsLayout from '@/layouts/notifications/layout';
import { cn } from '@/lib/utils';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useEffect, useState } from 'react';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'All Notifications',
        href: notifications.index().url,
    },
];


type PageProps = {
    notifications: Notification[]
}

export default function Index() {

    const { notifications } = usePage<PageProps>().props

    const [show, setShow] = useState<boolean>(false);

    const [displayedNotification, setDisplayedNotification] = useState<Notification | null>(null);

    const showNotification = (notification: Notification) => {
        setShow(true);
        setDisplayedNotification(notification)
        router.post(markAsRead(notification.id))
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Notifications" />

            <NotificationsLayout>
                <div className="space-y-6">
                    <div className="flex w-full flex-col gap-6">

                        {notifications.length != 0 ? (
                            notifications.map((notification, index) => (
                                <Item variant="outline" key={index} className={cn(
                                    "cursor-pointer",
                                    !notification.read_at ? 'bg-gray-200' : 'bg-white',
                                )} onClick={(e) => {
                                    !notification.read_at && showNotification(notification)
                                }}>
                                    <ItemContent>
                                        <ItemTitle>{notification.type == 'product.created' ? 'New Product Created': 'General Notification'}</ItemTitle>
                                        <ItemDescription className="flex flex-col">
                                            <span className="text-sm">Review New Product: <strong>{notification.data.name}</strong></span>
                                            <span>{notification.created_at}</span>
                                        </ItemDescription>
                                    </ItemContent>
                                    <ItemActions>
                                        {notification.read_at ?
                                            <Button onClick={() => {
                                                router.visit(markAsUnread(notification.id))
                                            }} variant="link" size="sm">
                                                Mark as unread
                                            </Button>
                                            : ''}
                                    </ItemActions>
                                </Item>
                            ))
                        )
                            : 'You havent any notifications'
                        }
                    </div>
                </div>

                <Dialog open={show} onOpenChange={setShow}>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle>{displayedNotification?.type === 'product.created' ? 'Product Created': 'General Notification'}</DialogTitle>
                            <DialogDescription>
                                this is Notification show Action.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="flex items-center gap-2">
                            <div className="grid flex-1 gap-2">
                                <p className="text-xl">Review New Product: <strong>{displayedNotification?.data.name}</strong></p>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </NotificationsLayout>
        </AppLayout>
    );
}
