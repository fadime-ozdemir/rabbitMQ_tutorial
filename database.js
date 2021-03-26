const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const Schema = mongoose.Schema;
const messageSchema = new Schema({
  message: { type: String, required: true }
});
const Message = mongoose.model("Message", messageSchema); // db.collection

const createAndSaveMessage = function( msg) {
  const newMessage = new Message({message: msg});

  newMessage.save(function(err, data) {
    if (err) return console.error(err);
  });
};

const fetchAllDataFromMessageCollection = ()=>{
    Message.find({}, (err, peopleFound)=>{
        if (err) return console.log(err);
        console.log("people: ", peopleFound);
    })

}
exports.createAndSaveMessage = createAndSaveMessage;
exports.fetchAllDataFromMessageCollection = fetchAllDataFromMessageCollection;