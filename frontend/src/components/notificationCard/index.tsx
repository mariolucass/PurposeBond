import { handleDateWithMoment } from "@/utils/handleDateWithMoment";
import { useRouter } from "next/navigation";
import { Avatar, AvatarImage } from "../ui/avatar";

interface NotificationProps {
  notification: any;
}

const notificationTitles = {
  NEW_FOLLOWER: "followed you.",
  POST_LIKED: "liked your post.",
  POST_REPOSTED: "reposted your post.",
  POST_COMMENTED: "commented on your post.",
};

type NotificationType = keyof typeof notificationTitles;

export const NotificationCard = ({ notification }: NotificationProps) => {
  const router = useRouter();

  const notificationType = notification.type as NotificationType;
  const notificationIsOnPost =
    notificationTitles[notificationType] !== "followed you.";

  const handleNotificationClick = () => {
    if (notificationIsOnPost) {
      router.push(`/posts/${notification.postId}`);
    }
  };

  const authors = notification.authors;
  const lastAuthor = authors[authors.length - 1];

  return (
    <li
      onClick={handleNotificationClick}
      className="w-full flex justify-between items-center gap-4 p-4 bg-card hover:bg-muted transition cursor-pointer"
    >
      <div className="flex -space-x-4">
        {authors.map((elem: any) => (
          <Avatar
            key={elem.id}
            className="w-10 h-10 border-2 border-background shadow-sm"
          >
            <AvatarImage
              src={
                elem.profileImage ||
                "https://static-00.iconduck.com/assets.00/profile-default-icon-512x511-v4sw4m29.png"
              }
            />
          </Avatar>
        ))}
      </div>

      <div className="flex-1 ml-4">
        <p className="text-sm text-foreground leading-tight">
          <span className="font-semibold">@{lastAuthor.username}</span>{" "}
          {notificationTitles[notificationType] || "interacted with you."}
        </p>
        <button className="text-xs mt-1 font-medium text-primary hover:underline">
          Check it now!
        </button>
      </div>

      <div className="flex items-center gap-1 text-muted-foreground text-xs whitespace-nowrap">
        {handleDateWithMoment(notification.createdAt)}
      </div>
    </li>
  );
};
