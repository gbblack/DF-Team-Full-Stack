const chai = require("chai");
const { expect } = require("chai");
const chaiHttp = require("chai-http");

const server = require("../../../server.js");

const Graduate = require("../../models/Graduate.model.js");

const DBService = require("../../utils/DBService/DBService.js");
const testGraduates = require("../../utils/data/testData/testGraduates.json");

chai.use(chaiHttp);

describe("Graduates Route Tests", () => {
  let graduates;

  before(async () => await DBService.connect(process.env.DB_URI));

  beforeEach(async () => {
    if (!DBService.isConnected()) await DBService.connect(process.env.DB_URI);
    await DBService.depopulate(Graduate);

    graduates = await DBService.populate(
      Graduate,
      testGraduates.map((graduate, i) => ({
        ...graduate,
        userId: `test-id-${i}`,
      }))
    );
    graduates = graduates.map((graduate) => ({
      ...JSON.parse(JSON.stringify(graduate)), imagePath: `${process.env.ORIGIN}${graduate.imagePath}`,
    }));
  });

  after(async () => {
    if (!DBService.isConnected()) await DBService.connect(process.env.DB_URI);
    await DBService.depopulate(Graduate);
    await DBService.disconnnect();
  });

  describe("GET '/'", () => {
    describe("success", () => {
      it("should return 200", async () => {
        const res = await chai.request(server).get("/graduates");

        expect(res).to.have.status(200);
      });

      it("should return all the Graduates from the database", async () => {
        const res = await chai.request(server).get("/graduates");

        expect(res.body.payload).to.deep.equal(graduates);
      });
    });

    describe("failure", () => {
      it("should return 500 if the database query fails", async () => {
        await DBService.disconnnect();

        const res = await chai.request(server).get("/graduates");

        expect(res).to.have.status(500);
      });
    });
  });
});
