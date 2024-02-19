const mongoose = require("mongoose");
const { expect } = require("chai");
const sinon = require("sinon");
const httpMocks = require("node-mocks-http");

const User = require("../../models/User.model.js");
const IndustryPartner = require("../../models/IndustryPartner.model.js");

const DBService = require("../../utils/DBService/DBService.js");
const testUsers = require("../../utils/data/testData/testUsers.json");
const testIndustryPartners = require("../../utils/data/testData/testIndustryPartners.json");

const isIndustryPartner = require("./isIndustryPartner.js");

describe("isIndustryPartner Middleware Tests", () => {
  let users;
  let industryPartners;

  beforeEach(async () => {
    if (!DBService.isConnected()) await DBService.connect(process.env.DB_URI);
    await DBService.depopulate(User);
    await DBService.depopulate(IndustryPartner);

    users = await DBService.populate(User, testUsers);

    industryPartners = await DBService.populate(
      IndustryPartner,
      users.map((user, i) => ({ ...testIndustryPartners[i], userId: user._id }))
    );
  });

  after(async () => {
    if (!DBService.isConnected()) await DBService.connect(process.env.DB_URI);
    await DBService.depopulate(User);
    await DBService.depopulate(IndustryPartner);
  });

  describe("success", () => {
    it("should call next() once", async () => {
      const request = httpMocks.createRequest({
        user: users[0],
      });

      const next = sinon.spy();

      await isIndustryPartner(request, {}, next);

      sinon.assert.calledOnce(next);
    });

    it("should attach the IndustryPartner to the request", async () => {
      const request = httpMocks.createRequest({
        user: users[0],
      });

      await isIndustryPartner(request, {}, () => {});

      expect(request.industryPartner).to.deep.equal(industryPartners[0]);
    });
  });

  describe("failure", () => {
    it("should return 500 if there is no User attached to the request", async () => {
      const request = httpMocks.createRequest();

      const response = httpMocks.createResponse();

      await isIndustryPartner(request, response, () => {});

      expect(response.statusCode).to.equal(500);
    });

    it("should return 403 if the User does not have the INDUSTRY_PARTNER role", async () => {
      const graduate = await new User({
        email: "test@email.com",
        password: "password123",
        role: "GRADUATE",
      }).save();

      const request = httpMocks.createRequest({
        user: graduate,
      });

      const response = httpMocks.createResponse();

      await isIndustryPartner(request, response, () => {});

      expect(response.statusCode).to.equal(403);
    });

    it("should return 404 if the User does not have a matching IndustryPartner", async () => {
      const partner = await new User({
        email: "test@email.com",
        password: "password123",
        role: "INDUSTRY_PARTNER",
      }).save();

      const request = httpMocks.createRequest({
        user: partner,
      });

      const response = httpMocks.createResponse();

      await isIndustryPartner(request, response, () => {});

      expect(response.statusCode).to.equal(404);
    });
  });
});
