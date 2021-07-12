var admin = require("firebase-admin");
var serviceAccount = require("../config/work-tracker-1303e-firebase-adminsdk-zb7f4-4f89fd7586.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://work-tracker-1303e-default-rtdb.firebaseio.com/'
});


const database = admin.database();

exports.GetAllNotes = (req, res, next) => {
  try {
    database.ref('notes').once('value', (snapshot) => {
      console.log(snapshot.val());
      res.status(200).json({
        status: 1,
        code: 200,
        message: "Notes fetch successfully",
        data: snapshot.val()
      })
    }, (errorObject) => {
      res.status(500).json({
        status: 0,
        code: 200,
        message: "Something went wrong, please try again"
      })
    });
  } catch (error) {
    res.status(500).json({
      status: 0,
      code: 200,
      message: "Something went wrong, please try again"
    });
  }
}

exports.AddNote = (req, res, next) => {
    let data = req.body;
    console.log(data);

    try {
      console.log("Add Note")
      database.ref('notes').push(data, (err) => {
        if(err) {
          console.log("Add Note Error");

          res.status(400).json({
            status: 0,
            code: 400,
            message: "Bad Request"
          })
        }
        console.log("Add Note Success")

        res.status(201).json({
          status: 1,
          code: 201,
          message: "Note Saved Succesffuly."
        })
      })
    } catch(err) {
      console.log(err);
      res.status(500).json({
        status: 0,
        code: 500,
        message: "Something went wrong, please try again."
      })
    }
}

exports.SyncNotes = async (req, res, next) => {
  let data = req.body;

  try {
    for await (note of data.notes) {
      database.ref('notes').push(note, (err) => {
        if(err) {
          throw err
        }
      });
    }

    res.status(201).json({
      status: 1,
      code: 201,
      message: "Note Synced Succesffuly."
    });
  } catch(err) {
    res.status(500).json({
      status: 0,
      code: 500,
      message: "Something went wrong, please try again."
    })
  }
}
