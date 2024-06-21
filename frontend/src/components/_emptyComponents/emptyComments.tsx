export const EmptyComments = ({ username }: { username: string }) => {
  return (
    <div className="flex flex-col gap-4 items-center justify-center p-4">
      <h1 className="text-2xl font-bold">@{username} has not comments yet.</h1>

      <p className="text-center">
        Try searching for something else, or check your Search settings to see
        if they’re protecting you from potentially sensitive content.
      </p>
    </div>
  );
};
