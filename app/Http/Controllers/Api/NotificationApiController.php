<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\JsonResponse;
use Illuminate\Notifications\DatabaseNotification as NotificationModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;
use Throwable;

/**
 * @group Notifications
 * 
 * APIs for managing Notifications.
 */
class NotificationApiController extends BaseApiController
{
    /**
     * List notifications.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $perPage = $request->input('per_page', 15);
            $notifications = NotificationModel::paginate($perPage);

            return $this->success(Notification::collection($notifications));
        } catch (Throwable $e) {
            return $this->handleException($e); 
        }
    }

    /**
     * Mark a notification as read.
     *
     * @param NotificationModel $notification
     * @return JsonResponse
     */
    public function markAsRead(NotificationModel $notification): JsonResponse
    {
        try {
            $notification->markAsRead();

            return $this->success(null, 'Notification marked as read successfully');
        } catch (Throwable $e) {
            return $this->handleException($e); 
        }
    }

    /**
     * Mark a notification as unread.
     *
     * @param NotificationModel $notification
     * @return JsonResponse
     */
    public function markAsUnread(NotificationModel $notification): JsonResponse
    {
        try {
            $notification->markAsUnread();

            return $this->success(null, 'Notification marked as unread successfully');
        } catch (Throwable $e) {
            return $this->handleException($e); 
        }
    }
}
