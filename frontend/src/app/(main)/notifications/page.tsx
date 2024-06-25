"use client";

import { EmptyNotifications } from "@/components/_emptyComponents/emptyNotifications";
import { Navigator } from "@/components/navigator";
import { NotificationCard } from "@/components/notificationCard";
import { ApiError } from "@/services/config/apiError";
import { getNotifications } from "@/services/notifications.services";

import { useEffect, useState } from "react";

const Notifications = () => {
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const fetchedNotifications = await getNotifications();

        const notificationsStrip = fetchedNotifications.map((objeto) => {
          return Object.fromEntries(
            Object.entries(objeto).filter(([_, valor]) => valor !== null)
          );
        });

        setNotifications(notificationsStrip);
      } catch (error) {
        if (error instanceof ApiError) {
          console.error(error);
        }
      }
    };

    fetchNotifications();
  }, []);

  return (
    <section className="w-full min-w-full flex flex-col justify-start">
      <Navigator name={"Notifications"} />

      {notifications.length ? (
        <ul className="flex flex-col w-full">
          {notifications.map((notification) => (
            <NotificationCard
              notification={notification}
              key={notification.id}
            />
          ))}
        </ul>
      ) : (
        <EmptyNotifications />
      )}
    </section>
  );
};

export default Notifications;
