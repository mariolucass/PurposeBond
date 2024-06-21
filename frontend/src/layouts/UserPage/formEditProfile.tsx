import { FormFields } from "@/components/formFields";
import { Form } from "@/components/ui/form";
import { UserUpdateType } from "@/interfaces/users.interfaces";
import { userUpdateSchema } from "@/lib/schemas/users.schemas";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";

export const FormEditProfile = ({ user }: { user: UserUpdateType }) => {
  type EditProfileForm = {
    [K in (typeof fieldNames)[number]]: string;
  };

  const editProfile = async (form: EditProfileForm) => {
    console.log(form);
  };

  const fieldNames = [
    "name",
    "username",
    "email",
    "description",
    "phone",
    "address",
    "password",
    "profileImage",
  ];

  const defaultValues = () => {
    const newObject: any = {};

    fieldNames.forEach((name) => {
      newObject[name] = "";
    });

    return newObject;
  };

  console.log(defaultValues());

  const profileFormMethods = useForm<UserUpdateType>({
    resolver: zodResolver(userUpdateSchema),
    defaultValues: defaultValues(),
  });

  return (
    <Form {...profileFormMethods}>
      <form
        onSubmit={profileFormMethods.handleSubmit(editProfile)}
        className="flex flex-col w-full gap-4 p-6"
      >
        <FormFields control={profileFormMethods.control} type={"userUpdate"} />
      </form>
    </Form>
  );
};
