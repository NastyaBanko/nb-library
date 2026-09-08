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

@Component({
  selector: "nb-dynamic-form",
  templateUrl: "./dynamic-form.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule, TranslatePipe],
})
export class DynamicFormComponent implements OnInit {
  @HostBinding("class") public hostClass = "nb-dynamic-form";
  @Input() fields: FormField[] = [];
  @Output() formChange = new EventEmitter<any>();
  public form!: FormGroup;
  public fieldType = FieldType;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    const group: any = {};
    this.fields.forEach((field) => {
      const validators = field.type === this.fieldType.MEMO ? [jsonObjectValidator] : [];
      group[field.key] = [field.value, validators];
    });

    this.form = this.fb.group(group);
    if (this.form.valid) {
      this.formChange.emit(this.form.value);
    }

    this.form.valueChanges.subscribe((values) => {
      if (this.form.valid) {
        this.formChange.emit(values);
      }
    });
  }

  public _isFieldInvalid(key: string): boolean {
    const control = this.form.get(key);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}
