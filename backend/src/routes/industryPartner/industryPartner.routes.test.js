const chai = require("chai");
const { expect } = require("chai");
const chaiHttp = require("chai-http");

const server = require("../../../server.js");

const User = require("../../models/User.model.js");
const IndustryPartner = require("../../models/IndustryPartner.model.js");
const Vacancy = require("../../models/Vacancy.model.js");

const DBService = require("../../utils/DBService/DBService.js");
const JWTService = require("../../utils/JWTService/JWTService.js");

const testUsers = require("../../utils/data/testData/testUsers.json");
const testIndustryPartners = require(`../../utils/data/testData/testIndustryPartners.json`);
const testVacancies = require("../../utils/data/testData/testVacancy.json");

chai.use(chaiHttp);

describe("Industry Partners Route Tests", () => {
  let users;
  let industryPartners;
  let vacancies;

  before(async () => await DBService.connect(process.env.DB_URI));

  beforeEach(async () => {
    if (!DBService.isConnected()) await DBService.connect(process.env.DB_URI);
    await DBService.depopulate(User);
    await DBService.depopulate(IndustryPartner);
    await DBService.depopulate(Vacancy);

    users = await DBService.populate(User, testUsers);

    industryPartners = await DBService.populate(
      IndustryPartner,
      users.map((user, i) => ({ ...testIndustryPartners[i], userId: user._id }))
    );
    industryPartners = industryPartners.map((partner) => ({
      ...JSON.parse(JSON.stringify(partner)), logo: `${process.env.ORIGIN}${partner.logo}`
      }));

    vacancies = await DBService.populate(
      Vacancy,
      industryPartners.map(({ _id }, i) => ({
        ...testVacancies[i],
        partnerId: _id,
      }))
    );
    vacancies = vacancies.map((vacancy) => JSON.parse(JSON.stringify(vacancy)));
  });

  after(async () => {
    if (!DBService.isConnected()) await DBService.connect(process.env.DB_URI);
    await DBService.depopulate(User);
    await DBService.depopulate(IndustryPartner);
    await DBService.depopulate(Vacancy);
    await DBService.disconnnect();
  });

  describe("GET '/'", () => {
    describe("success", () => {
      it("should return 200", async () => {
        const accessToken = JWTService.generateAccessToken(users[1]._id);

        const res = await chai
          .request(server)
          .get("/industryPartner")
          .set("x-access-token", accessToken);

        expect(res).to.have.status(200);
      });

      it("should return the authenticated IndustryPartner's model", async () => {
        const accessToken = JWTService.generateAccessToken(users[1]._id);
        const expected = industryPartners[1];

        const res = await chai
          .request(server)
          .get("/industryPartner")
          .set("x-access-token", accessToken);

        const actual = res.body.payload;

        expect(expected._id).to.equal(actual._id);
      });

      it("should attach the partner's vacancies to the response", async () => {
        const accessToken = JWTService.generateAccessToken(users[1]._id);

        const expected = {
          ...industryPartners[1],
          vacancies: [vacancies[1]],
        };

        const res = await chai
          .request(server)
          .get("/industryPartner")
          .set("x-access-token", accessToken);

        expect(expected).to.deep.equal(res.body.payload);
      });
    });

    describe("failure", () => {
      it("should return 403 if the User is not an IndustryPartner", async () => {
        const graduate = await new User({
          email: "iptest@email.com",
          password: "password123",
          role: "GRADUATE",
        }).save();

        const accessToken = JWTService.generateAccessToken(graduate.id);

        const res = await chai
          .request(server)
          .get("/industryPartner")
          .set("x-access-token", accessToken);

        expect(res).to.have.status(403);
      });
    });
  });

  describe("POST /vacancies", () => {
    
    const validVacancy = {
      partnerId: "partId",
      position: "Engineer",
      location: "London",
      startDate: "2022-04-01"
    };

    describe("success", () => {
      it("should return 201", async () => {
        const accessToken = JWTService.generateAccessToken(users[1]._id);
        
        const res = await chai
          .request(server)
          .post("/industryPartner/vacancies")
          .set("x-access-token", accessToken)
          .type("form")
          .send({...validVacancy});

        expect(res).to.have.status(201);
      });
    });

    describe("failure", () => {

      it("should return 400 if vacancy details are incorrect", async () => {
        const accessToken = JWTService.generateAccessToken(users[1]._id);

        const res = await chai
          .request(server)
          .post("/industryPartner/vacancies")
          .set("x-access-token", accessToken)
          .type("form")
          .send({ ...validVacancy, position: [] });

        expect(res).to.have.status(400);
      });

      it("should return 500 if vacancy cannot be created", async () => {
        const accessToken = JWTService.generateAccessToken(users[1]._id);

        const res = await chai
          .request(server)
          .post("/industryPartner/vacancies")
          .set("x-access-token", accessToken)
          .type("form")
          .send({...validVacancy, position: null});

        expect(res).to.have.status(500);
      });

    });

  });
  
});
