export const EmptyLikes = ({ username }: { username: string }) => (
  <div className="flex flex-col gap-4 items-center justify-center p-12">
    <h1 className="text-2xl text-center font-bold">
      @{username} has not liked yet.
    </h1>

    <p className="text-center">
      Try searching for something else, or check your Search settings to see if
      they’re protecting you from potentially sensitive content.
    </p>
  </div>
);
