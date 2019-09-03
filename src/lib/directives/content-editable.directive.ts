import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[contenteditable=true]',
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: ContentEditableDirective, multi: true },
  ],
})
export class ContentEditableDirective implements ControlValueAccessor {
  constructor(private elementRef: ElementRef<HTMLElement>) {
  }

  @Input()
  html = true;
  private isDisabled = false;
  private _onTouched: () => void;
  private _onChange: (value: string) => void;

  get element(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  get value(): string {
    if (this.html) {
      return this.element.innerHTML;
    } else {
      return this.element.textContent;
    }
  }

  set value(value: string) {
    if (this.element.innerHTML !== value) {
      if (this.html) {
        this.element.innerHTML = value;
      } else {
        this.element.textContent = value;
      }
    }
  }

  @HostListener('input')
  input(): void {
    this.changed(this.value);
  }

  touched(): void {
    if (this._onTouched) {
      this._onTouched();
    }
  }

  changed(value: string): void {
    if (this._onChange) {
      this._onChange(value);
    }
  }

  @HostListener('blur')
  blur(): void {
    this.touched();
  }

  registerOnChange(fn: (value: string) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  writeValue(value: string): void {
    this.value = value;
  }

}
