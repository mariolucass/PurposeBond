"use client";

import { EmptyNotifications } from "@/components/_emptyComponents/emptyNotifications";
import { NotificationCard } from "@/components/notificationCard";
import { Separator } from "@/components/ui/separator";
import { ApiError } from "@/services/config/apiError";
import { getNotifications } from "@/services/notifications.services";

import React, { useEffect, useState } from "react";

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

        console.log(notificationsStrip);
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
    <section className="w-full min-w-full flex flex-col gap-4 justify-start p-4">
      {notifications.length ? (
        <ul className="flex flex-col w-full p-2 gap-4">
          {notifications.map((notification) => (
            <React.Fragment key={notification.id}>
              <NotificationCard notification={notification} />

              <Separator />
            </React.Fragment>
          ))}
        </ul>
      ) : (
        <EmptyNotifications />
      )}
    </section>
  );
};

export default Notifications;
