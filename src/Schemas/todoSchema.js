const mongoose = require("mongoose");
const { formatISO9075 } = require("date-fns");

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
    require: true,
    enum: ["active", "inactive", "complied", "bin"],
  },
  date: {
    type: String,
    default: formatISO9075(new Date(), { representation: "date" }),
  },
  time: [
    {
      start: [{ type: String }, { type: String }],
      end: [{ type: String }, { type: String }],
      _id: false,
    },
  ],
  entryTime: {
    type: Date,
    default: new Date(),
  },
});

// todoSchema.methods = {
//   findActive : function () {

//   }
// }

module.exports = todoSchema;
