var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var myobjID = [
        { custId: "111", password: "111" },
        { custId: "113", password: "113" },
        { custId: "211", password: "211" },
        { custId: "212", password: "212" },

    ];
    var myobjPrepaid = [
        {
            custId: "111", balance: "100", Today_view: { calls: 30, sms: 10, data: 10 },
            Monthly_view: { calls: [65, 59, 40, 31], sms: [28, 48, 40, 19], data: [10, 48, 20, 39] }
        },

        {
            custId: "113",  balance: "800", Today_view: { calls: 24, sms: 50, data: 4.5 },
            Monthly_view: { calls: [42, 84, 65, 77], sms: [40, 56, 94, 31], data: [5, 5.2, 6, 10] }
        },
        {
            custId: "211",  balance: "350", Today_view: { calls: 80, sms: 40, data: 2 },
            Monthly_view: { calls: [75, 100, 85, 95], sms: [50, 64, 76, 98], data: [3, 5, 8, 6] }
        },
        {
            custId: "212",  balance: "910", Today_view: { calls: 70, sms: 30, data: 3 },
            Monthly_view: { calls: [75, 84, 95, 105], sms: [51, 43, 32, 58], data: [8, 5, 12, 16 ] }
        },

    ];

    var myobjPostpaid = [
        {
            custId: "111", bill: "560", Today_view: { calls: 20, sms: 20, data: 1.5 },
            Monthly_view: { calls: [64, 57, 85, 91], sms: [61, 74, 95, 56], data: [4, 10, 9, 7.5] }
        },
        {
            custId: "113", bill: "2160", Today_view: { calls: 55, sms: 78, data: 5 },
            Monthly_view: { calls: [190, 119, 95, 82 ], sms: [100, 120, 99, 84], data: [6, 7, 8, 7.5] }
        },

        {
            custId: "211", bill: "450", Today_view: { calls: 10, sms: 16, data: 2.5 },
            Monthly_view: { calls: [25, 36, 44, 58], sms: [27, 57, 65, 19], data: [5.5, 8.6, 12, 11] }
        },
        {
            custId: "212", bill: "1580", Today_view: { calls: 40, sms: 150, data: 3.8 },
            Monthly_view: { calls: [110, 190, 119, 84], sms: [300, 470, 510, 298], data: [8.8, 14, 10, 11] }
        },

    ];

    var myobjLandline = [
        {
            custId: "111", bill: "1147" ,Today_view: { calls: 55 },
            Monthly_view: { calls: [81, 95, 74, 45] }
        },

        {
            custId: "113", bill: "1315", Today_view: { calls: 28 },
            Monthly_view: { calls: [31, 28, 63, 75] }
        },

        {
            custId: "211", bill: "875", Today_view: { calls: 36 },
            Monthly_view: { calls: [36, 81, 63, 72] }
        },
        {
            custId: "212", bill: "1568", Today_view: { calls: 18 },
            Monthly_view: { calls: [31, 25, 67, 100] }
        }
    ];

    var myobjInternet = [
        {
            custId: "111", bill: "180", Today_view: { data: 7 },
            Monthly_view: { data: [10, 48, 20, 39] }
        },

        {
            custId: "113", bill: "400", Today_view: { data: 5 },
            Monthly_view: { data: [12, 21, 18, 30] }
        },

        {
            custId: "211", bill: "295" ,Today_view: { data: 10 },
            Monthly_view: { data: [15, 28, 8, 40] }
        },
        {
            custId: "212", bill: "550" ,Today_view: { data: 15 },
            Monthly_view: { data: [36, 58, 20, 21] }
        }
    ];
    dbo.collection("customer").insertMany(myobjID, function (err, res) {
        if (err) throw err;
        console.log("Number of documents inserted(myobjID): " + res.insertedCount);
        //console.log(res)
        db.close();
    });
    dbo.collection("prepaid").insertMany(myobjPrepaid, function (err, res) {
        if (err) throw err;
        console.log("Number of documents inserted(myobj1): " + res.insertedCount);
        //console.log(res)
        db.close();
    });
    dbo.collection("postpaid").insertMany(myobjPostpaid, function (err, res) {
        if (err) throw err;
        console.log("Number of documents inserted(myobj2): " + res.insertedCount);
        //console.log(res)
        db.close();
    });
    dbo.collection("landline").insertMany(myobjLandline, function (err, res) {
        if (err) throw err;
        console.log("Number of documents inserted(myobj3): " + res.insertedCount);
        //console.log(res)
        db.close();
    });
    dbo.collection("internet").insertMany(myobjInternet, function (err, res) {
        if (err) throw err;
        console.log("Number of documents inserted(myobj4): " + res.insertedCount);
        //console.log(res)
        db.close();
    });
});