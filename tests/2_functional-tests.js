const chaiHttp = require("chai-http");
const chai = require("chai");
let assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", function() {
  test("Convert a valid input such as 10L: GET request to /api/convert", done => {
    chai
      .request(server)
      .get("/api/convert?input=10L")
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.string, "10 liters converts to 2.64172 gallons");
        done();
      });
  });

  test("Convert an invalid input such as 32g: GET request to /api/convert.", done => {
    chai
      .request(server)
      .get("/api/convert?input=32g")
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body, "invalid unit");
        done();
      });
  });

  test("Convert an invalid number such as 3/7.2/4kg: GET request to /api/convert.", done => {
    chai
      .request(server)
      .get("/api/convert?input=3/7.2/4kg")
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body, "invalid number");
        done();
      });
  });

  test("Convert an invalid number AND unit such as 3/7.2/4kilomegagram: GET request to /api/convert.", done => {
    chai
      .request(server)
      .get("/api/convert?input=3/7.2/4kilomegagram")
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body, "invalid number and unit");
        done();
      });
  });

  test("Convert with no number such as kg: GET request to /api/convert.", done => {
    chai
      .request(server)
      .get("/api/convert?input=kg")
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.string, "1 kilograms converts to 2.20462 pounds");
        done();
      });
  });
});