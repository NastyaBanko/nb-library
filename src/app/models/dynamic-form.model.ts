import {AbstractControl, ValidationErrors} from "@angular/forms";

export enum FieldType {
  TEXT ="TEXT",
  SELECT ="SELECT",
  COLOR = "COLOR",
  NUMBER = "NUMBER",
  MEMO = "MEMO"
}

export interface FormField {
  key: string;
  label: string;
  type: FieldType;
  value: any;
  options?: {label: string; value: any;}[];
}

export function jsonObjectValidator(control: AbstractControl): ValidationErrors | null {
  if (!control.value) return null;
  try {
    const parsed = JSON.parse(control.value);
    if (typeof parsed !== "object" || parsed === null) {
      return {invalidJson: true};
    }

    if (Array.isArray(parsed)) {
      if (parsed.length === 0) return {emptyArray: true};
      const isValid = parsed.every(
        (item) => typeof item === "object" && item !== null && "data" in item
      );
      if (!isValid) return {missingDataKey: true};
    }
    else {
      if (!("data" in parsed)) {
        return {missingDataKey: true};
      }
    }

    return null;
  } catch (e) {
    return {invalidJson: true};
  }
}
