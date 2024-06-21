import { LoginType, RegisterType } from "@/interfaces/auth.interfaces";
import { UserUpdateType } from "@/interfaces/users.interfaces";

interface BaseFieldConfig {
  label: string;
  name: string;
  description?: string;
  placeholder: string;
  type: string;
}

interface FormFieldLoginConfig extends BaseFieldConfig {
  name: keyof LoginType;
}

interface FormFieldRegisterConfig extends BaseFieldConfig {
  name: keyof RegisterType;
}

interface FormFieldUpdateProfileConfig extends BaseFieldConfig {
  name: keyof UserUpdateType;
}

export const registerFieldsConfig: FormFieldRegisterConfig[] = [
  {
    label: "Email",
    name: "email",
    placeholder: "Enter your email address.",
    type: "email",
  },
  {
    label: "Password",
    name: "password",
    placeholder: "Enter your password.",
    type: "password",
  },
  {
    label: "Confirm Password",
    name: "confirmPassword",
    placeholder: "Confirm your password.",
    type: "password",
  },
];

export const loginFieldsConfig: FormFieldLoginConfig[] = [
  {
    label: "Email",
    name: "email",
    placeholder: "Enter your email address.",
    type: "email",
  },
  {
    label: "Password",
    name: "password",
    placeholder: "Enter your password.",
    type: "password",
  },
];

// export const updateProfileFieldsConfig: FormFieldUpdateProfileConfig[] = [
//   {
//     label: "Email",
//     name: "email",
//     placeholder: "Enter your email address.",
//     type: "email",
//   },
//   {
//     label: "Password",
//     name: "password",
//     placeholder: "Enter your password.",
//     type: "password",
//   },
//   {
//     label: "Confirm Password",
//     name: "confirmPassword",
//     placeholder: "Confirm your password.",
//     type: "password",
//   },
// ];

const updateProfileFields = [
  "name",
  "username",
  "email",
  "description",
  "phone",
  "address",
  "password",
  "profileImage",
];

export const updateProfileFieldsConfig: FormFieldUpdateProfileConfig[] =
  updateProfileFields.map((fieldName) => {
    const capitalizedFieldName =
      fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
    const type = fieldName === "description" ? "textarea" : "text";

    return {
      label: capitalizedFieldName,
      name: fieldName as keyof UserUpdateType,
      placeholder: `Enter your ${fieldName}.`,
      type,
    };
  });
