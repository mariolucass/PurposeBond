import { useModalContext } from "@/contexts/modal.context";
import { Mail } from "lucide-react";

export const MessageButton = () => {
  const { setIsDialogMessagesOpen } = useModalContext();

  return (
    <div className="fixed inset-0 flex justify-center items-end pointer-events-none">
      <div className="relative w-full max-w-7xl pointer-events-auto">
        <div className="absolute bottom-5 right-0 z-50">
          <button
            className="bg-primary text-white p-4 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none"
            onClick={() => {
              setIsDialogMessagesOpen(true);
            }}
          >
            <Mail />
          </button>
        </div>
      </div>
    </div>
  );
};
