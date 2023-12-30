import { HttpClientTestingModule, HttpTestingController, TestRequest } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { AuthService } from "./auth.service";
import { expect } from "@jest/globals";
import { SessionInformation } from "../../../interfaces/sessionInformation.interface";
import { LoginRequest } from "../interfaces/loginRequest.interface";

describe('AutService Unit test suite', () => {
  let authService: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    authService = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('should return expected session information', () => {
    const loginRequest: LoginRequest = {
      email: "email1",
      password: "passwd1"
    };
    const expectedSessionInfo: SessionInformation = {
      token: "token1",
      type: "type1",
      id: 1,
      username: "email1",
      firstName: "firstname1",
      lastName: "lastname1",
      admin: false,
    }

    authService.login(loginRequest)
      .subscribe((sessionInfo: SessionInformation) =>
        expect(sessionInfo).toEqual(expectedSessionInfo))

    // The following `expectOne()` will match the request's URL.
    const req: TestRequest = httpTestingController.expectOne('api/auth/login');

    // Assert that the request is a POST.
    expect(req.request.method).toEqual('POST');

    //  Assert that the request body is session1.
    expect(req.request.body).toEqual(loginRequest);

    // Respond with mock data, causing Observable to resolve.
    req.flush(expectedSessionInfo);
  });
})
