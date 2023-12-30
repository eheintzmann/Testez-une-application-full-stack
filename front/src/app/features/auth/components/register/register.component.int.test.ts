import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { expect } from '@jest/globals';

import { RegisterComponent } from './register.component';
import { HarnessLoader } from "@angular/cdk/testing";
import { MatButtonHarness } from "@angular/material/button/testing";
import { MatInputHarness } from "@angular/material/input/testing";
import { TestbedHarnessEnvironment } from "@angular/cdk/testing/testbed";

describe('RegisterComponent Integration test suite', () => {
  let loader: HarnessLoader;
  let fixture: ComponentFixture<RegisterComponent>;

  let firstNameInput: MatInputHarness;
  let lastNameInput: MatInputHarness;
  let emailEInput: MatInputHarness;
  let passwordInput: MatInputHarness;
  let submitButton: MatButtonHarness;

  const setValues = async (firstName: string, lastName: string, email: string, password: string) => {
    await firstNameInput.setValue(firstName);
    await lastNameInput.setValue(lastName);
    await emailEInput.setValue(email);
    await passwordInput.setValue(password);

    return;
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
    loader = TestbedHarnessEnvironment.loader(fixture);

    firstNameInput = await loader.getHarness<MatInputHarness>(MatInputHarness.with({selector: 'input[formControlName="firstName"]'}));
    lastNameInput = await loader.getHarness<MatInputHarness>(MatInputHarness.with({selector: 'input[formControlName="lastName"]'}));
    emailEInput= await loader.getHarness<MatInputHarness>(MatInputHarness.with({selector: 'input[formControlName="email"]'}));
    passwordInput = await loader.getHarness<MatInputHarness>(MatInputHarness.with({selector: 'input[formControlName="password"]'}));
    submitButton = await loader.getHarness<MatButtonHarness>(MatButtonHarness.with({selector:'button[type="submit"]'}));
  });

  it('should hide #Submit if #FistName is empty', async () => {
    expect(await submitButton.isDisabled()).toBeTruthy();

    await setValues('', 'LastName', 'test@test.com', 'password')
    expect(await submitButton.isDisabled()).toBeTruthy();
  });

  it('should hide #Submit if #FirstName is too short', async () => {
    expect(await submitButton.isDisabled()).toBeTruthy();

    await setValues('1', 'LastName', 'test@test.com', 'password')
    expect(await submitButton.isDisabled()).toBeTruthy();
  });

  it('should hide #Submit if #FirstName is too long', async () => {
    expect(await submitButton.isDisabled()).toBeTruthy();

    await setValues('123456789012345678901', 'LastName', 'test@test.com', 'password')
    expect(await submitButton.isDisabled()).toBeTruthy();
  });

  it('should hide #Submit if #LastName is empty', async () => {
    expect(await submitButton.isDisabled()).toBeTruthy();

    await setValues('FirstName', '', 'test@test.com', 'password')
    expect(await submitButton.isDisabled()).toBeTruthy();
  });

  it('should hide #Submit if #LastName is too short', async () => {
    expect(await submitButton.isDisabled()).toBeTruthy();

    await setValues('FirstName', '1', 'test@test.com', 'password')
    expect(await submitButton.isDisabled()).toBeTruthy();
  });

  it('should hide #Submit if #LastName is too long', async () => {
    expect(await submitButton.isDisabled()).toBeTruthy();

    await setValues('FirstName', '123456789012345678901', 'test@test.com', 'password')
    expect(await submitButton.isDisabled()).toBeTruthy();
  });

  it('should hide #Submit if #Email is empty',  async () => {
    expect(await submitButton.isDisabled()).toBeTruthy();

    await setValues('FirstName', 'LastName', '', 'password')
    expect(await submitButton.isDisabled()).toBeTruthy();
  });

  it('should hide #Submit if #Email is not valid',  async () => {
    expect(await submitButton.isDisabled()).toBeTruthy();

    await setValues('FirstName', 'LastName', 'Invalid', 'password')
    expect(await submitButton.isDisabled()).toBeTruthy();
  });

  it('should hide #Submit if #Password is empty', async () => {
    expect(await submitButton.isDisabled()).toBeTruthy();

    await setValues('FirstName', 'LastName', 'test@test.com', '')
    expect(await submitButton.isDisabled()).toBeTruthy();
  });

  it('should hide #Submit if #Password is too short', async () => {
    expect(await submitButton.isDisabled()).toBeTruthy();

    await setValues('FirstName', 'LastName', 'test@test.com', '1')
    expect(await submitButton.isDisabled()).toBeTruthy();
  });

  it('should not hide #Submit',  async () => {
    expect(await submitButton.isDisabled()).toBeTruthy();

    await setValues('FirstName', 'LastName', 'test@test.com', 'password')
    expect(await submitButton.isDisabled()).toBeFalsy();
  });
});
