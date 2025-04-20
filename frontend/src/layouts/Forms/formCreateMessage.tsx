import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMessageContext } from "@/contexts/domains/SocialDomain/message.context";
import { MessageCreateType } from "@/interfaces/messages.interfaces";
import { messageCreateSchema } from "@/lib/schemas/messages.schemas";
import { MessageService } from "@/services/messages.services";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { useForm } from "react-hook-form";

export const FormCreateMessage = () => {
  const {
    currentChat,
    setShouldFetchMessages,
    setUsersWhoHaveMessage,
    sortUsersWhoHaveMessage,
  } = useMessageContext();

  const sendMessage = async (form: { content: string }) => {
    await MessageService.sendMessage(currentChat!.id, form);

    setShouldFetchMessages(true);

    const fetchedUsers: any = await MessageService.getAllContacts();
    setUsersWhoHaveMessage(sortUsersWhoHaveMessage(fetchedUsers));
    messageFormMethods.reset();
  };

  const messageFormMethods = useForm<MessageCreateType>({
    resolver: zodResolver(messageCreateSchema),
    defaultValues: { content: "" },
  });

  return (
    <Form {...messageFormMethods}>
      <form
        onSubmit={messageFormMethods.handleSubmit(sendMessage)}
        className="w-full flex items-center gap-2 p-2 bg-background"
      >
        <FormField
          control={messageFormMethods.control}
          name="content"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  placeholder={`Send message to ${currentChat?.username}.`}
                  className="w-full  px-4 py-2 text-sm bg-muted/20 border-none focus:ring-2 focus:ring-primary focus:outline-none transition-all"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button
          type="submit"
          size="icon"
          className=" p-2 bg-primary hover:bg-primary/90 transition-all"
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </Form>
  );
};
