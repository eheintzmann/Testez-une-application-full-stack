import { TestBed } from '@angular/core/testing';
import { expect } from '@jest/globals';

import { SessionApiService } from './session-api.service';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { Session } from '../interfaces/session.interface';

describe('SessionApiService Unit test suite', () => {
  const session1 : Session  = {
    id: 1,
    name: "session1",
    description: "session1",
    date: new Date("2001/01/01"),
    teacher_id: 1,
    users: [ 1 ],
    createdAt: new Date("2001/01/01"),
    updatedAt: new Date("2011/01/01")
  };
  const session2 : Session  = {
    id: 1,
    name: "session2",
    description: "session2",
    date: new Date("2002/02/02"),
    teacher_id: 1,
    users: [ 1 ],
    createdAt: new Date("2002/02/02"),
    updatedAt: new Date("2022/02/02")
  }
  let sessionApiService: SessionApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule
      ]
    });
    sessionApiService = TestBed.inject(SessionApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(sessionApiService).toBeTruthy();
  });

  it('should return all expected sessions', () => {
    const expectedSessions: Session[] = [ session1, session2 ];

    sessionApiService.all()
      .subscribe((sessions : Session[]) =>
        expect(sessions).toEqual(expectedSessions))

    // The following `expectOne()` will match the request's URL.
    const req : TestRequest = httpTestingController.expectOne('api/session');

    // Assert that the request is a GET.
    expect(req.request.method).toEqual('GET');

    // Respond with mock data, causing Observable to resolve.
    req.flush(expectedSessions);
  });

  it('should return expected session', () => {
    const expectedSession: Session = session1;

    sessionApiService.detail('1')
      .subscribe((session : Session) =>
        expect(session).toEqual(expectedSession))

    // The following `expectOne()` will match the request's URL.
    const req : TestRequest = httpTestingController.expectOne('api/session/1');

    // Assert that the request is a GET.
    expect(req.request.method).toEqual('GET');

    // Respond with mock data, causing Observable to resolve.
    req.flush(expectedSession);
  });

  it('should return anything', () => {
    sessionApiService.delete('1')
      .subscribe((next: any) =>
        expect(next).toEqual(expect.anything())
      );

    // The following `expectOne()` will match the request's URL.
    const req : TestRequest = httpTestingController.expectOne('api/session/1');

    // Assert that the request is a DELETE.
    expect(req.request.method).toEqual('DELETE');

    // Respond with mock data, causing Observable to resolve.
    req.flush({});
  });

  it('should return created session', () => {
    const createdSession: Session = session1;

    sessionApiService.create(session1)
      .subscribe((session : Session) =>
        expect(session).toEqual(createdSession))

    // The following `expectOne()` will match the request's URL.
    const req : TestRequest = httpTestingController.expectOne('api/session');

    // Assert that the request is a POST.
    expect(req.request.method).toEqual('POST');

    //  Assert that the request body is session1.
    expect(req.request.body).toEqual(session1);

    // Respond with mock data, causing Observable to resolve.
    req.flush(createdSession);
  });

  it('should return updated session', () => {
    const updatedSession: Session = session1;

    sessionApiService.update('1', session1)
      .subscribe((session : Session) =>
        expect(session).toEqual(updatedSession))

    // The following `expectOne()` will match the request's URL.
    const req : TestRequest = httpTestingController.expectOne('api/session/1');

    // Assert that the request is a PUT.
    expect(req.request.method).toEqual('PUT');

    //  Assert that the request body is session1.
    expect(req.request.body).toEqual(session1);

    // Respond with mock data, causing Observable to resolve.
    req.flush(updatedSession);
  });

  // it('should return void', () => {
  //   sessionApiService.participate('1', '1')
  //     .subscribe( n =>
  //       expect(n).toBeUndefined());
  //
  //   // The following `expectOne()` will match the request's URL.
  //   const req : TestRequest = httpTestingController.expectOne('api/session/1/participate/1');
  //
  //   // Assert that the request is a GET.
  //   expect(req.request.method).toEqual('POST');
  //
  //   //  Assert that the request body is session1.
  //   expect(req.request.body).toEqual(null);
  //
  //   // Respond with mock data, causing Observable to resolve.
  //   req.flush()
  // });

});
