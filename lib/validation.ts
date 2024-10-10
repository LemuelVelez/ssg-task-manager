import { z } from "zod";

const nameValidation = z
  .string()
  .min(2, "Name must be at least 2 characters")
  .max(50, "Name must be at most 50 characters");

const emailValidation = z.string().email("Invalid email address");

const phoneValidation = z
  .string()
  .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number");

const addressValidation = z
  .string()
  .min(5, "Address must be at least 5 characters")
  .max(500, "Address must be at most 500 characters");

const occupationValidation = z
  .string()
  .min(2, "Occupation must be at least 2 characters")
  .max(500, "Occupation must be at most 500 characters");

const emergencyContactNameValidation = z
  .string()
  .min(2, "Contact name must be at least 2 characters")
  .max(50, "Contact name must be at most 50 characters");

const insuranceValidation = z
  .string()
  .min(2, "Insurance name must be at least 2 characters")
  .max(50, "Insurance name must be at most 50 characters");

const policyNumberValidation = z
  .string()
  .min(2, "Policy number must be at least 2 characters")
  .max(50, "Policy number must be at most 50 characters");

const consentValidation = z
  .boolean()
  .default(false)
  .refine((value) => value === true, {
    message: "You must consent to this action in order to proceed",
  });

// New password validation
const passwordValidation = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(50, "Password must be at most 50 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(
    /[!@#$%^&*(),.?":{}|<>]/,
    "Password must contain at least one special character"
  );

export const UserFormValidation = z.object({
  name: nameValidation,
  email: emailValidation,
  phone: phoneValidation,
  password: passwordValidation, // Add password validation here
});

export const PatientFormValidation = z.object({
  name: nameValidation,
  email: emailValidation,
  phone: phoneValidation,
  birthDate: z.coerce.date(),
  gender: z.enum(["Male", "Female", "Other"]),
  address: addressValidation,
  occupation: occupationValidation,
  emergencyContactName: emergencyContactNameValidation,
  emergencyContactNumber: phoneValidation,
  primaryPhysician: z.string().min(2, "Select at least one doctor"),
  insuranceProvider: insuranceValidation,
  insurancePolicyNumber: policyNumberValidation,
  allergies: z.string().optional(),
  currentMedication: z.string().optional(),
  familyMedicalHistory: z.string().optional(),
  pastMedicalHistory: z.string().optional(),
  identificationType: z.string().optional(),
  identificationNumber: z.string().optional(),
  identificationDocument: z.custom<File[]>().optional(),
  treatmentConsent: consentValidation,
  disclosureConsent: consentValidation,
  privacyConsent: consentValidation,
});

export const CreateAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, "Select at least one doctor"),
  schedule: z.coerce.date(),
  reason: z
    .string()
    .min(2, "Reason must be at least 2 characters")
    .max(500, "Reason must be at most 500 characters"),
  note: z.string().optional(),
  cancellationReason: z.string().optional(),
});

export const ScheduleAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, "Select at least one doctor"),
  schedule: z.coerce.date(),
  reason: z.string().optional(),
  note: z.string().optional(),
  cancellationReason: z.string().optional(),
});

export const CancelAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, "Select at least one doctor"),
  schedule: z.coerce.date(),
  reason: z.string().optional(),
  note: z.string().optional(),
  cancellationReason: z
    .string()
    .min(2, "Reason must be at least 2 characters")
    .max(500, "Reason must be at most 500 characters"),
});

export function getAppointmentSchema(type: string) {
  switch (type) {
    case "create":
      return CreateAppointmentSchema;
    case "cancel":
      return CancelAppointmentSchema;
    default:
      return ScheduleAppointmentSchema;
  }
}
