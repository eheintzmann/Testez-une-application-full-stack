import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';
import { expect } from '@jest/globals';

import { AppComponent } from './app.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SessionService } from './services/session.service';
import { Observable, of } from 'rxjs';


describe('AppComponent Unit test suite', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  class mockSessionService {
    $isLogged(): Observable<boolean> {
      return of<boolean>(true);
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MatToolbarModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: SessionService, useClass: mockSessionService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });

  it('should create the app', () => {

    expect(app).toBeTruthy();
  });

  it('should return true', () => {
    app.$isLogged().subscribe((bool: boolean) => {
      expect(bool).toEqual(true);
    });
  });
})
