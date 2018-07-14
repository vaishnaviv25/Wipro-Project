var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  var myobj1 = [
      {custId: "111", password: "111"},
      { custId: "112", password: "112" },
      { custId: "113", password: "113" },
      { custId: "114", password: "114"},
      { custId: "115", password: "115"  },
      { custId: "116", password: "116" }
  ];
  dbo.collection("customers2").insertMany(myobj1, function(err, res) {
    if (err) throw err;
    console.log("Number of documents inserted(myobj2): " + res.insertedCount);
    //console.log(res)
    db.close();
  });
});
