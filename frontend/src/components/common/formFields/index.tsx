"use client";

import { Control } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import {
  loginFieldsConfig,
  registerFieldsConfig,
  updateProfileFieldsConfig,
} from "./configs";

interface FormFieldsProps {
  control: Control<any>;
  type: "login" | "register" | "userUpdate";
}

const handleType = (type: "login" | "register" | "userUpdate") => {
  switch (type) {
    case "login":
      return loginFieldsConfig;
    case "register":
      return registerFieldsConfig;
    case "userUpdate":
      return updateProfileFieldsConfig;
    default:
      return loginFieldsConfig;
  }
};

export const FormFields = ({ control, type }: FormFieldsProps) => {
  const fieldsConfig = handleType(type);

  return fieldsConfig.map((fieldConfig) => (
    <FormField
      key={fieldConfig.name}
      control={control}
      name={fieldConfig.name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="font-semibold">{fieldConfig.label}</FormLabel>

          <FormControl>
            {fieldConfig.type === "textarea" ? (
              <Textarea placeholder={fieldConfig.placeholder} {...field} />
            ) : (
              <Input
                placeholder={fieldConfig.placeholder}
                type={fieldConfig.type}
                {...field}
              />
            )}
          </FormControl>

          {fieldConfig.description && (
            <FormDescription>{fieldConfig.description}</FormDescription>
          )}

          <FormMessage />
        </FormItem>
      )}
    />
  ));
};
