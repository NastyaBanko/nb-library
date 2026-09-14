import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  HostBinding,
  Input,
  OnInit,
} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {TranslatePipe} from "@ngx-translate/core";
import {FormField, jsonObjectValidator, FieldType} from "@nb/models/dynamic-form.model";
import {IconComponent} from "@nb/components/icon/icon.component";

@Component({
  selector: "nb-dynamic-form",
  templateUrl: "./dynamic-form.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule, TranslatePipe, IconComponent],
})
export class DynamicFormComponent implements OnInit {
  @HostBinding("class") public hostClass = "nb-dynamic-form taDynamicForm";
  @Input() fields: FormField[] = [];
  @Output() formChange = new EventEmitter<any>();
  public form!: FormGroup;
  public fieldType = FieldType;
  private memoAppliedValues: Record<string, any> = {};
  private initialMemoValues: Record<string, any> = {};

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    const group: any = {};
    this.fields.forEach((field) => {
      const validators = field.type === this.fieldType.MEMO ? [jsonObjectValidator] : [];
      group[field.key] = [field.value, validators];

      if (field.type === this.fieldType.MEMO) {
        this.memoAppliedValues[field.key] = field.value;
        this.initialMemoValues[field.key] = field.value;
      }
    });

    this.form = this.fb.group(group);
    if (this.form.valid) {
      this.formChange.emit(this.form.value);
    }

    this.form.valueChanges.subscribe((values) => {
      if (this.form.valid) {
        const emittedValues = {...values};
        this.fields.forEach((field) => {
          if (field.type === this.fieldType.MEMO) {
            emittedValues[field.key] = this.memoAppliedValues[field.key];
          }
        });
        this.formChange.emit(emittedValues);
      }
    });
  }

  public _onMemoApply(key: string): void {
    const control = this.form.get(key);
    if (control && control.valid) {
      this.memoAppliedValues[key] = control.value;
      this.emitFormValues();
    }
  }

  public _onMemoReset(key: string): void {
    const originalValue = this.initialMemoValues[key];
    this.form.get(key)?.setValue(originalValue);
    this.memoAppliedValues[key] = originalValue;
    this.emitFormValues();
  }

  public _isFieldInvalid(key: string): boolean {
    const control = this.form.get(key);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  private emitFormValues(): void {
    if (this.form.valid) {
      const currentValues = {...this.form.value};
      this.fields.forEach((field) => {
        if (field.type === this.fieldType.MEMO) {
          currentValues[field.key] = this.memoAppliedValues[field.key];
        }
      });
      this.formChange.emit(currentValues);
    }
  }
}
