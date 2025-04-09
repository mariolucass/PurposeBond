import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMessageContext } from "@/contexts/domains/SocialDomain/message.context";
import { MessageCreateType } from "@/interfaces/messages.interfaces";
import { messageCreateSchema } from "@/lib/schemas/messages.schemas";
import {
  getUsersWhoHaveMessage,
  postMessageToUser,
} from "@/services/messages.services";
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
    const a = await postMessageToUser(currentChat!.id, form);
    console.log(a);
    setShouldFetchMessages(true);

    const fetchedUsers: any = await getUsersWhoHaveMessage();
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
        className="min-w-full flex items-center justify-center"
      >
        <FormField
          control={messageFormMethods.control}
          name="content"
          render={({ field }) => (
            <FormItem className="w-11/12">
              <FormControl>
                <Input
                  placeholder={`Send message to ${currentChat!.username}.`}
                  className="w-10/12"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit">
          <Send />
        </Button>
      </form>
    </Form>
  );
};
