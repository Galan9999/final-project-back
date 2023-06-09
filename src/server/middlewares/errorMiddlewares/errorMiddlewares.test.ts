import { type NextFunction, type Request, type Response } from "express";
import CustomError from "../../../CustomError/CustomError";
import { generalError, notFoundError } from "./errorMiddlewares";
import statusCodes from "../../utils/statusCodes";
import { type errors, ValidationError } from "express-validation";
const {
  clientError: { notFound, badRequest },
  serverError: { internalServer },
} = statusCodes;

beforeEach(() => jest.clearAllMocks());

const request: Partial<Request> = {};

const response = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
} as Partial<Response>;

const next = jest.fn() as NextFunction;

describe("Given the 'notFoundError' middleware", () => {
  describe("When it receives a request", () => {
    test("Then it should call its next method with a status code 404, and a message and public message 'Endpoint not found'", () => {
      const expectedError = new CustomError(
        "Path not found",
        notFound,
        "Endpoint not found"
      );

      notFoundError(request as Request, response as Response, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});

describe("Given the 'generalError' middleware", () => {
  describe("When it receives an error with statusCode 400 and a public message 'Something went wrong'  ", () => {
    test("Then it should call its response status method with a 400 and json method with the public message received", () => {
      const error = new CustomError(
        "Bad request",
        badRequest,
        "Something went wrong"
      );
      generalError(error, request as Request, response as Response, next);

      expect(response.status).toHaveBeenCalledWith(badRequest);
      expect(response.json).toHaveBeenCalledWith({
        error: error.publicMessage,
      });
    });
  });

  describe("When the error received is not a custom error", () => {
    test("Then it should call its response status method with 500 and public message 'Something went wrong'", () => {
      const error = new Error();
      const expectedPublicMessage = "Something went wrong";

      generalError(
        error as CustomError,
        request as Request,
        response as Response,
        next
      );

      expect(response.status).toHaveBeenCalledWith(internalServer);
      expect(response.json).toHaveBeenCalledWith({
        error: expectedPublicMessage,
      });
    });
  });

  describe("When it receives a validation error", () => {
    test("Then it should emit a response with the error status ", async () => {
      const error: errors = {
        body: [
          {
            name: "ValidationError",
            isJoi: true,
            annotate(stripColors) {
              return "";
            },
            _original: "",
            message: "'email' is not allowed to be empty",
            details: [
              {
                message: "",
                path: [""],
                type: "",
              },
            ],
          },
        ],
      };
      const expectedStatus = badRequest;
      const publicMessage = "'email' is not allowed to be empty";
      const validationError = new ValidationError(error, { statusCode: 400 });

      generalError(
        validationError as unknown as CustomError,
        request as Request,
        response as Response,
        next
      );

      expect(response.json).toHaveBeenCalledWith({ error: publicMessage });
      expect(response.status).toBeCalledWith(expectedStatus);
    });
  });
});
