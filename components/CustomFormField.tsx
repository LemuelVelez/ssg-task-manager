"use client";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { FormFieldType } from "./forms/RegisterForm";
import Image from "next/image";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { E164Number } from "libphonenumber-js/core";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { Select, SelectContent, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";

interface CustomProps {
  control: Control<any>;
  fieldType: FormFieldType;
  name: string;
  label?: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;
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

// ... (other field components remain unchanged)

const RenderField = ({ field, props }: { field: any; props: CustomProps }) => {
  const {
    fieldType,
    iconSrc,
    iconAlt,
    placeholder,
    showTimeSelect,
    dateFormat,
    renderSkeleton,
    type, // Destructure type prop here
  } = props;

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
    // ... (other cases remain unchanged)
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
