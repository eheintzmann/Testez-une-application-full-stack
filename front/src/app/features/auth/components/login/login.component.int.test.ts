import { LoginComponent } from './login.component';
import { ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
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



describe('LoginComponent Integration test suite', () => {
  let fixture: ComponentFixture<LoginComponent>;
  let loginElement: HTMLElement;
  let emailElement: HTMLInputElement | null;
  let passwordElement: HTMLInputElement | null;
  let submitButton: HTMLButtonElement | null;

  const setValues = (email: string, password: string) => {
    emailElement!.setRangeText(email);
    passwordElement!.setRangeText(password);

    emailElement!.dispatchEvent(new Event('input'));
    passwordElement!.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    flush();
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

    loginElement = fixture.nativeElement;
    emailElement = loginElement.querySelector('input[formControlName="email"]');
    passwordElement = loginElement.querySelector('input[formControlName="password"]');
    submitButton = loginElement.querySelector('button[type="submit"]');
  });

  it('should hide #Submit if #Email is empty', fakeAsync(() => {
    setValues('', 'password')

    expect(submitButton!.disabled).toBeTruthy();
  }));

  it('should hide #Submit if #Email is invalid',fakeAsync(() => {
    setValues('invalid', 'password')

    expect(submitButton!.disabled).toBeTruthy();
  }));

  it('should hide #Submit if #Password is empty',fakeAsync(() => {
    setValues('test@test.com', '');
    expect(submitButton!.disabled).toBeTruthy();
  }));

  it('should hide #Submit if #Password is too short', fakeAsync(() => {
    setValues('test@test.com', '1');

    expect(submitButton!.disabled).toBeTruthy();
  }));

  it('should not hide #Submit', fakeAsync(() => {
    setValues('test@test.com', 'password')

    expect(submitButton!.disabled).toBeFalsy();
  }));
});
