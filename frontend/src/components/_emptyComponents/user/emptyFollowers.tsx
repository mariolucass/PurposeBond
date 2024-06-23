export const EmptyFollowers = ({ username }: { username: string }) => (
  <div className="h-96 flex flex-col gap-4 items-center justify-center">
    <h1 className="text-2xl font-bold text-center">
      @{username} has not followers.
    </h1>

    <p className="text-center">
      Once they follow accounts, they’ll show up here.
    </p>
  </div>
);
