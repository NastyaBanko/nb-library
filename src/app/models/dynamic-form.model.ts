import {AbstractControl, ValidationErrors} from "@angular/forms";

export enum FieldType {
  TEXT = "TEXT",
  SELECT = "SELECT",
  COLOR = "COLOR",
  NUMBER = "NUMBER",
  MEMO = "MEMO",
  CHECKBOX = "CHECKBOX",
}

export interface FormField {
  key: string;
  label: string;
  type: FieldType;
  value: any;
  options?: {label: string; value: any}[];
}

export function jsonObjectValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;

  if (!value) {
    return null;
  }

  try {
    const parsed = typeof value === "string" ? JSON.parse(value) : value;
    if (parsed !== null && typeof parsed === "object" && !Array.isArray(parsed)) {
      return null;
    }

    return {notAnObject: true};
  } catch (e) {
    return {invalidJson: true};
  }
}

export function getInitialFormValues<T extends Record<string, any>>(config: FormField[]): T {
  const values = {} as T;
  config.forEach((field: FormField) => {
    (values as Record<string, any>)[field.key] = field.value;
  });
  return values;
}
