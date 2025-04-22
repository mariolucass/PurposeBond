"use client";

import { Navigator } from "@/components/common/navigator";
import { NotificationCard } from "@/components/notificationCard";
import { Separator } from "@/components/ui/separator";
import { ContentTransition } from "@/layouts/Animations/ContentTransition";
import { TabsNotificationsPage } from "@/layouts/NotificationsPage/tabs";
import { ApiError } from "@/services/config/apiError";
import { NotificationService } from "@/services/notifications.services";
import { Bell } from "lucide-react";
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

      <TabsNotificationsPage />

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

const EmptyNotifications = () => (
  <ContentTransition>
    <div className="flex flex-col items-center justify-start pt-8 h-full text-center px-4 gap-4">
      <div className="bg-muted p-4 rounded-full">
        <Bell className="w-8 h-8 text-muted-foreground" />
      </div>

      <h2 className="text-base font-semibold text-foreground">Notifications</h2>
      <p className="text-sm max-w-sm text-muted-foreground">
        When someone mentions you or interacts with your content, you'll see it
        here.
      </p>
    </div>
  </ContentTransition>
);

export default Notifications;
