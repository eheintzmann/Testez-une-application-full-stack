import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormComponent } from './form.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { expect } from '@jest/globals';
import { SessionService } from '../../../../services/session.service';
import { SessionApiService } from '../../services/session-api.service';
import { TeacherService } from '../../../../services/teacher.service';
import { Teacher } from '../../../../interfaces/teacher.interface';
import { Observable, of } from 'rxjs';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatOptionHarness } from '@angular/material/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputHarness } from '@angular/material/input/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatSelectHarness } from '@angular/material/select/testing';
import { Router } from '@angular/router';
import { Session } from '../../interfaces/session.interface';

describe('FormComponent Integration test suite', () => {
  let loader: HarnessLoader;
  let fixture: ComponentFixture<FormComponent>;

  let nameInput: MatInputHarness;
  let dateInput: MatInputHarness;
  let descriptionInput: MatInputHarness;
  let submitButton: MatButtonHarness;
  let teacherSelect: MatSelectHarness;
  let option: MatOptionHarness;

  const mockSessionService = {
    sessionInformation: {
      admin: true
    }
  }

  const mockTeacherService = {
    all(): Observable<Teacher[]> {
      return of<Teacher[]>(
        [
          {
            id: 0,
            lastName: 'lastName',
            firstName: 'firstName',
            createdAt: new Date('2001-01-01'),
            updatedAt: new Date('2011-01-01')
          }
        ]
      )
    }
  }

  const setValues = (async (name: string, date: string, description: string) => {
    await nameInput.setValue(name);
    await dateInput.setValue(date);
    await descriptionInput.setValue(description)

    await teacherSelect.open();
    option = (await teacherSelect.getOptions())[0];
    await option.click();
    return
  });

  describe('when creating new session', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [FormComponent],
        imports: [
          RouterTestingModule,
          HttpClientModule,
          MatCardModule,
          MatIconModule,
          MatFormFieldModule,
          MatInputModule,
          ReactiveFormsModule,
          MatSnackBarModule,
          MatSelectModule,
          NoopAnimationsModule
        ],
        providers: [
          { provide: TeacherService, useValue: mockTeacherService },
          { provide: SessionService, useValue: mockSessionService },
          SessionApiService
        ]
      })
        .compileComponents();

      fixture = TestBed.createComponent(FormComponent);
      fixture.detectChanges();
      loader = TestbedHarnessEnvironment.loader(fixture);

      nameInput = await loader.getHarness<MatInputHarness>(MatInputHarness.with({selector: 'input[formControlName="name"]'}));
      dateInput = await loader.getHarness<MatInputHarness>(MatInputHarness.with({selector: 'input[formControlName="date"]'}));
      descriptionInput = await loader.getHarness<MatInputHarness>(MatInputHarness.with({selector: 'textarea[formControlName="description"]'}));
      submitButton = await loader.getHarness<MatButtonHarness>(MatButtonHarness.with({selector: 'button[type="submit"]'}));
      teacherSelect = await loader.getHarness<MatSelectHarness>(MatSelectHarness);
    });

    it('should hide #Submit if #Name is empty', async () => {
      expect(await submitButton.isDisabled()).toBeTruthy();
      await setValues('', '2031-01-01', 'description')

      expect(await submitButton.isDisabled()).toBeTruthy();
    });

    it('should hide #Submit if #Date is empty', async () => {
      expect(await submitButton.isDisabled()).toBeTruthy();
      await setValues('name', '', 'description')

      expect(await submitButton.isDisabled()).toBeTruthy();
    });

    it('should hide #Submit if #Description is empty', async () => {
      expect(await submitButton.isDisabled()).toBeTruthy();
      await setValues('name', '2031-01-01', '')

      expect(await submitButton.isDisabled()).toBeTruthy();
    });

    it('should not hide #Submit', async () => {
      expect(await submitButton.isDisabled()).toBeTruthy();
      await setValues('name', '2001-01-01', 'description');

      expect(await submitButton.isDisabled()).toBeFalsy();
    });
  });

  describe('when updating an existing session', () => {
    let router: Router;

    const mockSessionApiService = {
      detail(id: string): Observable<Session> {
        return of<Session>(
          {
            id: 0,
            name: 'Session0',
            description: 'description',
            date: new Date('2001/01/01'),
            teacher_id: 0,
            users: [0]
          }
        )
      }
    }

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [FormComponent],
        imports: [
          RouterTestingModule.withRoutes([{path: 'sessions/update/:id', component: FormComponent}]),
          HttpClientModule,
          MatCardModule,
          MatIconModule,
          MatFormFieldModule,
          MatInputModule,
          ReactiveFormsModule,
          MatSnackBarModule,
          MatSelectModule,
          NoopAnimationsModule
        ],
        providers: [
          { provide: TeacherService, useValue: mockTeacherService },
          { provide: SessionService, useValue: mockSessionService },
          { provide: SessionApiService, useValue: mockSessionApiService }
        ]
      })
        .compileComponents();

      router = TestBed.inject(Router);
      jest.spyOn(router, 'url', 'get').mockReturnValue('/sessions/update/0')

      fixture = TestBed.createComponent(FormComponent);
      fixture.detectChanges();
      loader = TestbedHarnessEnvironment.loader(fixture);

      nameInput = await loader.getHarness<MatInputHarness>(MatInputHarness.with({selector: 'input[formControlName="name"]'}));
      dateInput = await loader.getHarness<MatInputHarness>(MatInputHarness.with({selector: 'input[formControlName="date"]'}));
      descriptionInput = await loader.getHarness<MatInputHarness>(MatInputHarness.with({selector: 'textarea[formControlName="description"]'}));
      submitButton = await loader.getHarness<MatButtonHarness>(MatButtonHarness.with({selector: 'button[type="submit"]'}));
      teacherSelect = await loader.getHarness<MatSelectHarness>(MatSelectHarness);
    });

    it('should hide #Submit if #Name is empty', async () => {
      expect(await submitButton.isDisabled()).toBeFalsy();

      await setValues('', '2031-01-01', 'description')
      expect(await submitButton.isDisabled()).toBeTruthy();
    });

    it('should hide #Submit if #Date is empty', async () => {
      expect(await submitButton.isDisabled()).toBeFalsy();

      await setValues('name', '', 'description')
      expect(await submitButton.isDisabled()).toBeTruthy();
    });

    it('should hide #Submit if #Description is empty', async () => {
      expect(await submitButton.isDisabled()).toBeFalsy();

      await setValues('name', '2031-01-01', '')
      expect(await submitButton.isDisabled()).toBeTruthy();
    });

    it('should not hide #Submit', async () => {
      expect(await submitButton.isDisabled()).toBeFalsy();

      await setValues('name', '2001-01-01', 'description');
      expect(await submitButton.isDisabled()).toBeFalsy();
    });
  })
})
