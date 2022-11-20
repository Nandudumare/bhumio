const { Schema, model } = require("mongoose");

const familySchema = new Schema({
  id: { type: String, required: false },
  details: { type: Object, required: true },
  isFolder: { type: Boolean, required: true, default: false },
  items: {
    type: [Object],
    required: false,
  },
});

const familyModel = model("family", familySchema);

module.exports = familyModel;
