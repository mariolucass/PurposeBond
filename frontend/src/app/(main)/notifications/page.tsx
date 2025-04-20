"use client";

import { EmptyNotifications } from "@/components/_emptyComponents/emptyNotifications";
import { Navigator } from "@/components/common/navigator";
import { NotificationCard } from "@/components/notificationCard";
import { Separator } from "@/components/ui/separator";
import { ApiError } from "@/services/config/apiError";
import { NotificationService } from "@/services/notifications.services";
import { Fragment, useEffect, useState } from "react";

const Notifications = () => {
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const fetched = await NotificationService.getNotifications();

        const grouped: any[] = [];

        for (const notif of fetched) {
          const key = `${notif.type}-${notif.targetId}`;
          const author = {
            ...notif.author,
            notificationCreatedAt: notif.createdAt,
          };

          const existingGroup = grouped.find(
            (group) => `${group.type}-${group.targetId}` === key
          );

          if (!existingGroup) {
            grouped.push({
              ...notif,
              authors: [author],
            });
            continue;
          }

          const existingAuthor = existingGroup.authors.find(
            (a: any) => a.id === author.id
          );

          if (!existingAuthor) {
            existingGroup.authors.push(author);
          } else {
            const isNewer =
              new Date(author.notificationCreatedAt) >
              new Date(existingAuthor.notificationCreatedAt);

            if (isNewer) {
              existingAuthor.notificationCreatedAt =
                author.notificationCreatedAt;
            }
          }
        }

        const groupedSorted = grouped.map((group) => ({
          ...group,
          authors: group.authors.sort(
            (a: any, b: any) =>
              new Date(a.notificationCreatedAt).getTime() -
              new Date(b.notificationCreatedAt).getTime()
          ),
        }));

        setNotifications(groupedSorted);
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
            <Fragment key={notification.id}>
              <NotificationCard notification={notification} />

              <Separator />
            </Fragment>
          ))}
        </ul>
      ) : (
        <EmptyNotifications />
      )}
    </section>
  );
};

export default Notifications;
