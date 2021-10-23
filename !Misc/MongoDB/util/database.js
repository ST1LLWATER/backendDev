const mongodb = require("mongodb");
require("dotenv").config();
const MongoClient = mongodb.MongoClient;

let _db;
const connectString = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@stillwater.m2gwr.mongodb.net/shop?retryWrites=true&w=majority`;

const mongoConnect = (callback) => {
  MongoClient.connect(connectString)
    .then((client) => {
      console.log("Connected!");
      _db = client.db();
      callback(client);
    })
    .catch((err) => {
      console.log(err);
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No Database Found";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
