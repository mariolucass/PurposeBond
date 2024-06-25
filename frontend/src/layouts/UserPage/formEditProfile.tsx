import { FormFields } from "@/components/formFields";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { SheetClose, SheetFooter } from "@/components/ui/sheet";
import { useAuthContext } from "@/contexts/auth.context";
import { UserUpdateType } from "@/interfaces/users.interfaces";
import { userUpdateSchema } from "@/lib/schemas/users.schemas";
import { patchUser } from "@/services/users.services";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const FormEditProfile = () => {
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

  type EditProfileForm = {
    [K in (typeof fieldNames)[number]]: string | null;
  };

  const { authenticatedUser, setAuthenticatedUser } = useAuthContext();

  const filteredUser = fieldNames.reduce((acc, fieldName) => {
    acc[fieldName] =
      (authenticatedUser as Record<string, any>)[fieldName] || "";
    return acc;
  }, {} as Record<string, string>);

  const editProfile = async (form: EditProfileForm) => {
    const isString = (value: any) => {
      return typeof value === "string";
    };

    const isValidString = (key: string, value: any) => {
      return value.trim() !== "" && value !== authenticatedUser[key];
    };

    const isValidValue = (key: string, value: any) => {
      return ![undefined, null, authenticatedUser[key]].includes(value);
    };

    const formStrip = Object.fromEntries(
      Object.entries(form).filter(([key, value]) => {
        return isString(value)
          ? isValidString(key, value)
          : isValidValue(key, value);
      })
    );

    try {
      const updatedProfile = await patchUser(formStrip, authenticatedUser.id);
    } catch (error) {
      console.log(error);
    }

    setAuthenticatedUser((user: any) => {
      return { ...user, ...formStrip };
    });
  };

  const profileFormMethods = useForm<UserUpdateType>({
    resolver: zodResolver(userUpdateSchema),
    defaultValues: filteredUser,
  });

  return (
    <Form {...profileFormMethods}>
      <form
        onSubmit={profileFormMethods.handleSubmit(editProfile)}
        className="flex flex-col w-full gap-4 p-4"
      >
        <FormFields control={profileFormMethods.control} type={"userUpdate"} />

        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </form>
    </Form>
  );
};
