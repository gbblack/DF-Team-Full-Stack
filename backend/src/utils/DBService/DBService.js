const mongoose = require("mongoose");

class DBService {
  static isConnected() {
    return mongoose.connection.readyState === 1;
  }

  static isTestEnv() {
    return ["test", "staging"].includes(process.env.NODE_ENV);
  }

  static async connect(uri) {
    try {
      return await mongoose.connect(uri);
    } catch (err) {
      console.log("Database connection failed.");
      throw err;
    }
  }

  static async disconnnect() {
    try {
      await mongoose.disconnect();
    } catch (err) {
      console.log("Database disconnection failed.");
      throw err;
    }
  }

  static async populate(model, data = []) {
    if (!this.isTestEnv()) throw new Error();

    try {
      await model.insertMany(data);
      return await model.find({});
    } catch (err) {
      console.log("Populating Database failed.");
      throw err;
    }
  }

  static async depopulate(model) {
    if (!this.isTestEnv()) throw new Error();

    try {
      await model.deleteMany({});
    } catch (err) {
      console.log("Depopulating Database failed.");
      throw err;
    }
  }
}

module.exports = DBService;
