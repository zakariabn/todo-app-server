const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// todoSchema.methods = {
//   findActive : function () {

//   }
// }

module.exports = todoSchema;
