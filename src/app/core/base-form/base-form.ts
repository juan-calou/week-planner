import { AbstractControl, UntypedFormGroup } from '@angular/forms';

export abstract class BaseForm {
  form: UntypedFormGroup;
  _formPending: boolean;

  /** Creates the form group that wil be used. */
  abstract buildForm(): UntypedFormGroup;

  initForm() {
    this.form = this.buildForm();
    this.resetForm();
  }

  /** Added a getter & setter for the formPending property so that it can overwritten in subClasses. **/
  get formPending(): boolean {
    return this._formPending;
  }

  set formPending(value: boolean) {
    this._formPending = value;
  }

  /** The map of { formControlName: value } values that will be used to reset the form. */
  abstract getFormResetValue(): any;

  resetForm() {
    this.form.reset(this.getFormResetValue());
    this.formPending = false;
    this.form.enable();
    this.form.markAsUntouched();
  }

  reEnableForm() {
    this.formPending = false;
    this.form.enable();
    this.markAllAsTouched();
  }

  disableForm() {
    this.formPending = true;
    this.form.disable();
  }

  /**
   * Returns whether the given form control should show an error message. This is when the control
   * is touched and invalid. If any error types are given, it will return true only if one of the
   * given error types is invalid, otherwise any error types will count.
   */
  showError(
    formControlName: string = null,
    errorTypes: string | string[] = null
  ): boolean {
    const control = formControlName
      ? this.form.get(formControlName)
      : this.form;
    if (control.untouched || control.valid) {
      return false;
    }
    if (!errorTypes) {
      return true;
    }
    return []
      .concat(errorTypes)
      .some((errorType) => control.hasError(errorType));
  }

  /** Marks every form control as touched. Useful to show validation errors on invalid submit. */
  markAllAsTouched(control: AbstractControl = this.form) {
    control.markAsTouched();

    // Recurse through child controls.
    if (
      control instanceof UntypedFormGroup &&
      (control as UntypedFormGroup).controls
    ) {
      Object.keys((control as UntypedFormGroup).controls).map((key) => {
        this.markAllAsTouched(control.controls[key]);
      });
    }
  }

  onInvalidSubmit() {
    // to optionally implement in subclass
  }

  submitForm() {
    if (this.form.invalid) {
      this.markAllAsTouched();
      this.onInvalidSubmit();
      return;
    }

    this.disableForm();
    this.submit();
  }

  /**
   * The actual form submit logic. Typically an API call. If successful and navigation stays on the
   * page, the form should probably be reset with .resetForm().
   */
  abstract submit();
}
