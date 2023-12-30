import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { expect } from '@jest/globals';

import { RegisterComponent } from './register.component';

describe('RegisterComponent Integration test suite', () => {
  let fixture: ComponentFixture<RegisterComponent>;
  let registerElement: HTMLElement;
  let firstNameElement: HTMLInputElement | null;
  let lastNameElement: HTMLInputElement | null;
  let emailElement: HTMLInputElement | null;
  let passwordElement: HTMLInputElement | null;
  let submitButton: HTMLButtonElement | null;

  const setValues = (firstName: string, lastName: string, email: string, password: string) => {
    firstNameElement!.setRangeText(firstName);
    lastNameElement!.setRangeText(lastName);
    emailElement!.setRangeText(email);
    passwordElement!.setRangeText(password);

    firstNameElement!.dispatchEvent(new Event('input'));
    lastNameElement!.dispatchEvent(new Event('input'));
    emailElement!.dispatchEvent(new Event('input'));
    passwordElement!.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    flush();
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [
        BrowserAnimationsModule,
        HttpClientModule,
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    fixture.detectChanges();

    registerElement = fixture.nativeElement;
    firstNameElement = registerElement.querySelector('input[formControlName="firstName"]');
    lastNameElement = registerElement.querySelector('input[formControlName="lastName"]');
    emailElement = registerElement.querySelector('input[formControlName="email"]');
    passwordElement = registerElement.querySelector('input[formControlName="password"]');
    submitButton = registerElement.querySelector('button[type="submit"]');
  });

  it('should hide #Submit if #FistName is empty', fakeAsync(() => {
    setValues( '', 'LastName', 'test@test.com', 'password')
    expect(submitButton!.disabled).toBeTruthy();
  }));

  it('should hide #Submit if #FirstName is too short', fakeAsync(() => {
    setValues('1', 'LastName', 'test@test.com', 'password')
    expect(submitButton!.disabled).toBeTruthy();
  }));

  it('should hide #Submit if #FirstName is too long', fakeAsync(() => {
    setValues('123456789012345678901', 'LastName', 'test@test.com', 'password')
    expect(submitButton!.disabled).toBeTruthy();
  }));

  it('should hide #Submit if #LastName is empty', fakeAsync(() => {
    setValues( 'FirstName', '', 'test@test.com', 'password')
    expect(submitButton!.disabled).toBeTruthy();
  }));

  it('should hide #Submit if #LastName is too short', fakeAsync(() => {
    setValues('FirstName', '1', 'test@test.com', 'password')
    expect(submitButton!.disabled).toBeTruthy();
  }));

  it('should hide #Submit if #LastName is too long', fakeAsync(() => {
    setValues('FirstName', '123456789012345678901', 'test@test.com', 'password')
    expect(submitButton!.disabled).toBeTruthy();
  }));

  it('should hide #Submit if #Email is empty',  fakeAsync(() => {
    setValues( 'FirstName', 'LastName', '', 'password')
    expect(submitButton!.disabled).toBeTruthy();
  }));

  it('should hide #Submit if #Email is not valid',  fakeAsync(() => {
    setValues( 'FirstName', 'LastName', 'Invalid', 'password')
    expect(submitButton!.disabled).toBeTruthy();
  }));


  it('should hide #Submit if #Password is empty',  fakeAsync(() => {
    setValues( 'FirstName', 'LastName', 'test@test.com', '')
    expect(submitButton!.disabled).toBeTruthy();
  }));

  it('should hide #Submit if #Password is too short',  fakeAsync(() => {
    setValues( 'FirstName', 'LastName', 'test@test.com', '1')
    expect(submitButton!.disabled).toBeTruthy();
  }));

  it('should not hide #Submit',  fakeAsync(() => {
    setValues( 'FirstName', 'LastName', 'test@test.com', 'password')
    expect(submitButton!.disabled).toBeFalsy();
  }));

});

