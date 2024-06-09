import { LoginType, RegisterType } from "@/interfaces/auth.interfaces";

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
