"use client";

import { EmptyNotifications } from "@/components/_emptyComponents/emptyNotifications";
import { Navigator } from "@/components/navigator";
import { NotificationCard } from "@/components/notificationCard";
import { Separator } from "@/components/ui/separator";
import { ApiError } from "@/services/config/apiError";
import { getNotifications } from "@/services/notifications.services";
import { useEffect, useState } from "react";

const Notifications = () => {
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const fetched = await getNotifications();

        const cleaned = fetched.map((n: any) =>
          Object.fromEntries(Object.entries(n).filter(([_, v]) => v !== null))
        );

        const grouped = new Map<string, any>();

        cleaned.forEach((notif: any) => {
          const key = `${notif.type}-${notif.postId || "none"}`;
          const author = { ...notif.author, createdAt: notif.createdAt };

          const group = grouped.get(key);

          if (!group) {
            grouped.set(key, {
              type: notif.type,
              postId: notif.postId,
              createdAt: notif.createdAt,
              authors: [author],
            });
            return;
          }

          const existingAuthorIndex = group.authors.findIndex(
            (a: any) => a.id === author.id
          );

          if (existingAuthorIndex === -1) {
            group.authors.push(author);
          } else {
            const existing = group.authors[existingAuthorIndex];
            const isNewer =
              new Date(author.createdAt) > new Date(existing.createdAt);

            if (isNewer) {
              group.authors[existingAuthorIndex].createdAt = author.createdAt;
            }
          }

          grouped.set(key, group);
        });

        const groupedArray = Array.from(grouped.values()).map((group) => ({
          ...group,
          authors: group.authors.sort(
            (a: any, b: any) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          ),
        }));

        setNotifications(groupedArray);
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
            <>
              <NotificationCard
                notification={notification}
                key={notification.id}
              />

              <Separator />
            </>
          ))}
        </ul>
      ) : (
        <EmptyNotifications />
      )}
    </section>
  );
};

export default Notifications;
