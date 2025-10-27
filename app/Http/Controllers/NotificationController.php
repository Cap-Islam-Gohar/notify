<?php
namespace App\Http\Controllers;

use Illuminate\Notifications\DatabaseNotification as NotificationModel;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class NotificationController extends Controller {


    public function index ()
    {
        $notifications = Auth::user()->notifications;
        return Inertia::render('notifications/index', [
            'notifications' => $notifications
        ]);
    }

    public function markAsRead(NotificationModel $notification)
    {
        $notification->markAsRead();
        return redirect()->route('notifications.index')->with('success', 'Notification marked as read.');
    }

    public function markAsUnread(NotificationModel $notification)
    {
        $notification->markAsUnread();
        return redirect()->route('notifications.index')->with('success', 'Notification marked as unread.');
    }

}