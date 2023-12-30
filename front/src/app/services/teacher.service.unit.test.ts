import { TestBed } from '@angular/core/testing';
import { expect } from '@jest/globals';

import { TeacherService } from './teacher.service';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { Teacher } from '../interfaces/teacher.interface';

describe('TeacherService Unit test suite', () => {
  const teacher1 : Teacher = {
    id: 1,
    lastName: "lastname1",
    firstName: "firstname1",
    createdAt: new Date("2001/01/01"),
    updatedAt: new Date("2011/01/01")
  };
  const teacher2: Teacher = {
    id: 2,
    lastName: "lastname2",
    firstName: "firstname2",
    createdAt: new Date("2002/02/02"),
    updatedAt: new Date("2022/02/02")
  };
  let teacherService: TeacherService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[ HttpClientTestingModule ]
    });
    teacherService = TestBed.inject(TeacherService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(teacherService).toBeTruthy();
  });

  it('should return all expected teachers', () => {
    const expectedTeachers: Teacher[] = [ teacher1, teacher2 ];

    teacherService.all()
      .subscribe((teachers : Teacher[]) =>
      expect(teachers).toEqual(expectedTeachers))

    // The following `expectOne()` will match the request's URL.
    const req : TestRequest = httpTestingController.expectOne('api/teacher');

    // Assert that the request is a GET.
    expect(req.request.method).toEqual('GET');

    // Respond with mock data, causing Observable to resolve.
    req.flush(expectedTeachers);
  });

  it('should return expected teacher', () => {
    const expectedTeacher: Teacher = teacher1;

    teacherService.detail('1')
      .subscribe((teacher : Teacher) =>
        expect(teacher).toEqual(expectedTeacher));

    // The following `expectOne()` will match the request's URL.
    const req : TestRequest = httpTestingController.expectOne('api/teacher/1');

    // Assert that the request is a GET.
    expect(req.request.method).toEqual('GET');

    // Respond with mock data, causing Observable to resolve.
    req.flush(expectedTeacher);
  })
});
