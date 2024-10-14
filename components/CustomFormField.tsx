"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { FormFieldType } from "./forms/AdminSignInForm";
import Image from "next/image";

interface CustomProps {
  control: Control<any>;
  fieldType: FormFieldType;
  name: string;
  label?: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  type?: string; // Add type prop for input fields
}

const InputField = ({ field, placeholder, iconSrc, iconAlt, type }: any) => (
  <div className="flex rounded-md border border-dark-500 bg-dark-400">
    {iconSrc && (
      <Image
        src={iconSrc}
        alt={iconAlt || "icon"}
        width={24}
        height={24}
        className="ml-2"
      />
    )}
    <FormControl>
      <Input
        placeholder={placeholder}
        type={type} // Set the input type
        {...field}
        className="shad-input border-0"
      />
    </FormControl>
  </div>
);

const RenderField = ({ field, props }: { field: any; props: CustomProps }) => {
  const { fieldType, iconSrc, iconAlt, placeholder, type } = props;

  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <InputField
          field={field}
          placeholder={placeholder}
          iconSrc={iconSrc}
          iconAlt={iconAlt}
          type={type} // Pass type prop to InputField
        />
      );
    default:
      return null;
  }
};

const CustomFormField = (props: CustomProps) => {
  const { control, fieldType, name, label } = props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          {fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel>{label}</FormLabel>
          )}
          <RenderField field={field} props={props} />
          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
