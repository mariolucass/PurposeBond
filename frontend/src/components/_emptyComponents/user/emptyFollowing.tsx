export const EmptyFollowing = ({ username }: { username: string }) => {
  return (
    <div className="h-96 flex flex-col gap-4 items-center justify-center">
      <h1 className="text-2xl font-bold text-center">
        @{username} isn’t following anyone.
      </h1>

      <p className="text-center">
        Once they follow accounts, they’ll show up here.
      </p>
    </div>
  );
};
