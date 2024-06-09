"use client";

import { Control } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { loginFieldsConfig, registerFieldsConfig } from "./configs";

interface FormFieldsProps {
  control: Control<any>;
  type: "login" | "register";
}

export const FormFields = ({ control, type }: FormFieldsProps) => {
  const fieldsConfig =
    type === "register" ? registerFieldsConfig : loginFieldsConfig;

  return fieldsConfig.map((fieldConfig) => (
    <FormField
      key={fieldConfig.name}
      control={control}
      name={fieldConfig.name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{fieldConfig.label}</FormLabel>

          <FormControl>
            <Input
              placeholder={fieldConfig.placeholder}
              type={fieldConfig.type}
              {...field}
            />
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
