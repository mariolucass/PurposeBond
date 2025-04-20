import { MessageCircle } from "lucide-react";

export const EmptyComments = () => (
  <div className="w-full py-10 flex flex-col items-center justify-center text-muted-foreground">
    <MessageCircle className="w-10 h-10 mb-2 opacity-40" />

    <h3 className="text-lg font-semibold mb-1">No comments yet</h3>
    <span className="text-sm text-center max-w-xs">
      Be the first to leave a comment.
    </span>
  </div>
);
