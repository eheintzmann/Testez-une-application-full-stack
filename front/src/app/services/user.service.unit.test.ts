import { TestBed } from '@angular/core/testing';
import { expect } from '@jest/globals';

import { UserService } from './user.service';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { User } from '../interfaces/user.interface';

describe('UserService Unit test suite', () => {
  const user1 : User = {
    id: 1,
    email: "email@one.com",
    lastName: "ln1",
    firstName: "fn1",
    admin : false,
    password : "passwd",
    createdAt: new Date('2001/01/01'),
    updatedAt: new Date('2011/01/01')
  };
  let userService: UserService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule
      ]
    });
    userService = TestBed.inject(UserService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(userService).toBeTruthy();
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('should return expected user', () => {
    const expectedUser: User = user1;

    userService.getById('1')
      .subscribe( (user : User) =>
        expect(user).toEqual(expectedUser));

    // The following `expectOne()` will match the request's URL.
    const req : TestRequest = httpTestingController.expectOne('api/user/1');

    // Assert that the request is a GET.
    expect(req.request.method).toEqual('GET');

    // Respond with mock data, causing Observable to resolve.
    req.flush(expectedUser);
  })

  it('should return deleted user', () => {

    userService.delete('1')
      .subscribe(next =>
        expect(next).toEqual(expect.anything())
      );

    // The following `expectOne()` will match the request's URL.
    const req : TestRequest = httpTestingController.expectOne('api/user/1');

    // Assert that the request is a DELETE.
    expect(req.request.method).toEqual('DELETE');

    // Respond with mock data, causing Observable to resolve.
    req.flush({});
  })

});
