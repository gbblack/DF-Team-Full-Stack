const chai = require("chai");
const { expect } = require("chai");
const chaiHttp = require("chai-http");
const bcrypt = require("bcrypt");

const server = require("../../../server.js");

const User = require("../../models/User.model.js");
const IndustryPartner = require("../../models/IndustryPartner.model.js");

const DBService = require("../../utils/DBService/DBService.js");

const testUsers = require("../../utils/data/testData/testUsers.json");
const testIndustryPartners = require("../../utils/data/testData/testIndustryPartners.json");

chai.use(chaiHttp);

describe("Auth Routes Tests", () => {
  let users;
  let industryPartners;

  before(async () => await DBService.connect(process.env.DB_URI));

  beforeEach(async () => {
    if (!DBService.isConnected()) await DBService.connect(process.env.DB_URI);
    await DBService.depopulate(User);
    await DBService.depopulate(IndustryPartner);

    const hashedUsers = testUsers.map((user) => ({...user, password: bcrypt.hashSync(user.password,8)}));
    users = await DBService.populate(User, hashedUsers);
    users = users.map((user) => JSON.parse(JSON.stringify(user)));

    industryPartners = await DBService.populate(
      IndustryPartner,
      users.map((user, i) => ({ ...testIndustryPartners[i], userId: user._id }))
    );
    industryPartners = industryPartners.map((partner) =>
      JSON.parse(JSON.stringify(partner))
    );
  });

  after(async () => {
    if (!DBService.isConnected()) await DBService.connect(process.env.DB_URI);
    await DBService.depopulate(User);
    await DBService.depopulate(IndustryPartner);
  });

  describe("POST 'auth/signup'", () => {
    const validSignUp = {
      companyName: "Apple",
      email: "test.email@email.com",
      password: "password123",
      
    };

    describe("success", () => {
      it("should return 201", async () => {
        const res = await chai
          .request(server)
          .post("/auth/signup")
          .type("form")
          .send(validSignUp);

        expect(res).to.have.status(201);
      });

      it("should add a new User to the database", async () => {
        await chai
          .request(server)
          .post("/auth/signup")
          .type("form")
          .send(validSignUp);

        const newUser = await User.findOne({ email: validSignUp.email });

        expect(newUser).to.be.instanceOf(User);
      });

      it("should add a new IndustryPartner to the database", async () => {
        await chai
          .request(server)
          .post("/auth/signup")
          .type("form")
          .send(validSignUp);

        const newUser = await User.findOne({ email: validSignUp.email });
        const newIP = await IndustryPartner.findOne({ userId: newUser._id });

        expect(newIP).to.be.instanceOf(IndustryPartner);
      });
    });

    describe("failure", () => {
      it("should return 400 if the supplied email is invalid format", async () => {
        const res = await chai
          .request(server)
          .post("/auth/signup")
          .type("form")
          .send({ ...validSignUp, email: "not@valid" });

        expect(res).to.have.status(400);
      });

      it("should return 400 if the supplied password is too short", async () => {
        const res = await chai
          .request(server)
          .post("/auth/signup")
          .type("form")
          .send({ ...validSignUp, password: "1234567" });

        expect(res).to.have.status(400);
      });

      it("should return 400 if the supplied password is invalid format", async () => {
        const res = await chai
          .request(server)
          .post("/auth/signup")
          .type("form")
          .send({ ...validSignUp, password: "12345678\n" });

        expect(res).to.have.status(400);
      });

      it("should return 400 if the supplied company name is too short", async () => {
        const res = await chai
          .request(server)
          .post("/auth/signup")
          .type("form")
          .send({ ...validSignUp, companyName: "" });

        expect(res).to.have.status(400);
      });

      it("should return 400 if the supplied company name is invalid format", async () => {
        const res = await chai
          .request(server)
          .post("/auth/signup")
          .type("form")
          .send({ ...validSignUp, companyName: "HSBC\r" });

        expect(res).to.have.status(400);
      });

      it("should return 400 if a User already exists with the supplied email", async () => {
        const res = await chai
          .request(server)
          .post("/auth/signup")
          .type("form")
          .send({ ...validSignUp, email: users[0].email });

        expect(res).to.have.status(400);
      });
    });

  });

  describe("POST auth/login", () => {
    const validLogin = {
      email: "hsbc@hotmail.co.uk",
      password: "password123",
    };

    describe("success", () => {
      it("should return 200", async () => {
        const res = await chai
          .request(server)
          .post("/auth/login")
          .type("form")
          .send(validLogin);

        expect(res).to.have.status(200);
      });

      describe("failure", () => {

        it("should return 400 if login details are incorrect", async () => {
          const res = await chai
            .request(server)
            .post("/auth/login")
            .type("form")
            .send({ ...validLogin, email: "not@valid" });
  
          expect(res).to.have.status(400);
        });

        it("should return 400 if user does not exist", async () => {
          const res = await chai
            .request(server)
            .post("/auth/login")
            .type("form")
            .send({ ...validLogin, email: "user@boogaloo.com"})

          expect(res).to.have.status(400);
        });

        it("should return 400 if password is invalid", async () => {
          const res = await chai
            .request(server)
            .post("/auth/login")
            .type("form")
            .send({ ...validLogin, password: "passwordFail"})
            
          expect(res).to.have.status(400);
        });
      })
    })
  })
});
