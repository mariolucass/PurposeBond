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

const registerFields = ["email", "username", "password", "confirmPassword"];
export const registerFieldsConfig: FormFieldRegisterConfig[] =
  registerFields.map((fieldName) => {
    const capitalizedFieldName =
      fieldName.charAt(0).toUpperCase() + fieldName.slice(1);

    const type = fieldName === "password" ? "password" : "input";

    return {
      label: capitalizedFieldName,
      name: fieldName as keyof RegisterType,
      placeholder: `Enter your ${fieldName}.`,
      type,
    };
  });

const loginFields = ["email", "password"];
export const loginFieldsConfig: FormFieldLoginConfig[] = loginFields.map(
  (fieldName) => {
    const capitalizedFieldName =
      fieldName.charAt(0).toUpperCase() + fieldName.slice(1);

    const type = fieldName === "password" ? "password" : "input";

    return {
      label: capitalizedFieldName,
      name: fieldName as keyof LoginType,
      placeholder: `Enter your ${fieldName}.`,
      type,
    };
  }
);

const updateProfileFields = [
  "name",
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
