import { LoginComponent } from './login.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SessionService } from '../../../../services/session.service';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { expect } from '@jest/globals';
import { HarnessLoader } from '@angular/cdk/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { LoginRequest } from '../../interfaces/loginRequest.interface';
import { Observable, of } from 'rxjs';
import { SessionInformation } from '../../../../interfaces/sessionInformation.interface';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

describe('LoginComponent Integration test suite', () => {
  let loader: HarnessLoader;
  let fixture: ComponentFixture<LoginComponent>;

  let emailInput: MatInputHarness;
  let passwordInput: MatInputHarness;
  let submitButton: MatButtonHarness;


  describe('when user is filling login form', () => {

    const setValues = async (email: string, password: string) => {
      await emailInput.setValue(email);
      await passwordInput.setValue(password);

      return
    }

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [LoginComponent],
        providers: [SessionService],
        imports: [
          RouterTestingModule,
          BrowserAnimationsModule,
          HttpClientModule,
          MatCardModule,
          MatIconModule,
          MatFormFieldModule,
          MatInputModule,
          ReactiveFormsModule]
      }).compileComponents();

      fixture = TestBed.createComponent(LoginComponent);
      fixture.detectChanges();
      loader = TestbedHarnessEnvironment.loader(fixture);

      emailInput = await loader.getHarness<MatInputHarness>(MatInputHarness.with({selector: 'input[formControlName="email"]'}));
      passwordInput = await loader.getHarness<MatInputHarness>(MatInputHarness.with({selector: 'input[formControlName="password"]'}));
      submitButton = await loader.getHarness<MatButtonHarness>(MatButtonHarness.with({selector: 'button[type="submit"]'}));
    });

    it('should disable #Submit button if #Email is empty', async () => {
      expect(await submitButton.isDisabled()).toBeTruthy();

      await setValues('', 'password')
      expect(await submitButton.isDisabled()).toBeTruthy();
    });

    it('should disable #Submit button if #Email is invalid', async () => {
      expect(await submitButton.isDisabled()).toBeTruthy();

      await setValues('invalid', 'password')
      expect(await submitButton.isDisabled()).toBeTruthy();
    });

    it('should disable #Submit button if #Password is empty', async () => {
      expect(await submitButton.isDisabled()).toBeTruthy();

      await setValues('test@test.com', '');
      expect(await submitButton.isDisabled()).toBeTruthy();
    });

    it('should disable #Submit button if #Password is too short', async () => {
      expect(await submitButton.isDisabled()).toBeTruthy();

      await setValues('test@test.com', '1');
      expect(await submitButton.isDisabled()).toBeTruthy();
    });

    it('should enable #Submit button', async () => {
      expect(await submitButton.isDisabled()).toBeTruthy();

      await setValues('test@test.com', 'password')
      expect(await submitButton.isDisabled()).toBeFalsy();
    });
  })


  describe('when user is connecting', () => {
    let spyRouter: jest.SpyInstance<Promise<boolean>>;

    const mockAuthService = {
      login(loginRequest: LoginRequest): Observable<SessionInformation> {
        return of<SessionInformation>(
          {
            token: 'token',
            type: 'type',
            id: 0,
            username: loginRequest.email,
            firstName: 'FirstName',
            lastName: 'LastName',
            admin: false
          }
        )
      }
    }

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [LoginComponent],
        providers: [
          { provide: AuthService, useValue: mockAuthService },
          SessionService
        ],
        imports: [
          RouterTestingModule,
          BrowserAnimationsModule,
          HttpClientModule,
          MatCardModule,
          MatIconModule,
          MatFormFieldModule,
          MatInputModule,
          ReactiveFormsModule]
      }).compileComponents();

      const router: Router = TestBed.inject(Router);
      spyRouter = jest.spyOn(router, 'navigate');

      fixture = TestBed.createComponent(LoginComponent);
      fixture.detectChanges();
      loader = TestbedHarnessEnvironment.loader(fixture);

      emailInput = await loader.getHarness<MatInputHarness>(MatInputHarness.with({selector: 'input[formControlName="email"]'}));
      passwordInput = await loader.getHarness<MatInputHarness>(MatInputHarness.with({selector: 'input[formControlName="password"]'}));
      submitButton = await loader.getHarness<MatButtonHarness>(MatButtonHarness.with({selector: 'button[type="submit"]'}));
    });
    it('should connect user', async () => {
      expect(await submitButton.isDisabled()).toBeTruthy();

      await emailInput.setValue('test@test.com');
      await passwordInput.setValue('password');
      expect(await submitButton.isDisabled()).toBeFalsy();

      await submitButton.click();
      expect(spyRouter).toHaveBeenCalledWith(['/sessions'])
    });
  })
});
