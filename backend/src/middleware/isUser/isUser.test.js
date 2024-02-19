const mongoose = require("mongoose");
const { expect } = require("chai");
const sinon = require("sinon");
const httpMocks = require("node-mocks-http");

const DBService = require("../../utils/DBService/DBService.js");
const JWTService = require("../../utils/JWTService/JWTService.js");
const testUsers = require("../../utils/data/testData/testUsers.json");

const User = require("../../models/User.model.js");

const isUser = require("./isUser.js");

describe("isUser Middleware Tests", () => {
  let users;

  beforeEach(async () => {
    if (!DBService.isConnected()) await DBService.connect(process.env.DB_URI);
    await DBService.depopulate(User);

    users = await DBService.populate(User, testUsers);
  });

  after(async () => {
    if (!DBService.isConnected()) await DBService.connect(process.env.DB_URI);
    await DBService.depopulate(User);
  });

  describe("success", () => {
    it("should call next() once", async () => {
      const accessToken = JWTService.generateAccessToken(users[0]._id);

      const request = httpMocks.createRequest({
        headers: {
          "x-access-token": accessToken,
        },
      });

      const next = sinon.spy();

      await isUser(request, {}, next);

      sinon.assert.calledOnce(next);
    });

    it("should attach the User to the request", async () => {
      const accessToken = JWTService.generateAccessToken(users[0]._id);

      const request = httpMocks.createRequest({
        headers: {
          "x-access-token": accessToken,
        },
      });

      await isUser(request, {}, () => {});

      expect(request.user).to.deep.equal(users[0]);
    });
  });

  describe("failure", () => {
    it("should return 403 if no access_token cookie is supplied", async () => {
      const request = httpMocks.createRequest();
      const response = httpMocks.createResponse();

      await isUser(request, response);

      expect(response.statusCode).to.equal(403);
    });

    it("should return 403 if the access_token cannot be verified", async () => {
      const request = httpMocks.createRequest({
        headers: {
          "x-access-token": "invalidstring",
        },
      });

      const response = httpMocks.createResponse();

      await isUser(request, response);

      expect(response.statusCode).to.equal(403);
    });

    it("should return 404 if the access_token contains invalid User id", async () => {
      const access_token = JWTService.generateAccessToken("bad_id");

      const request = httpMocks.createRequest({
        headers: {
          "x-access-token": access_token,
        },
      });

      const response = httpMocks.createResponse();

      await isUser(request, response);

      expect(response.statusCode).to.equal(404);
    });

    it("should return 404 if the access_token points to a non-existent User", async () => {
      const access_token = JWTService.generateAccessToken(
        new mongoose.Types.ObjectId()
      );

      const request = httpMocks.createRequest({
        headers: {
          "x-access-token": access_token,
        },
      });

      const response = httpMocks.createResponse();

      await isUser(request, response);

      expect(response.statusCode).to.equal(404);
    });
  });
});
