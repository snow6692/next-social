import { getNotifications } from "@/actions/notificationAction";
export type Notifications = Awaited<ReturnType<typeof getNotifications>>;
export type Notification = Notifications[number];
