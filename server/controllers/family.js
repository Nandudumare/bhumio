const familyModel = require("../models/family");

const Poster = async (req, res) => {
  try {
    const newFamily = new familyModel({ ...req.body });
    await newFamily.save();

    return res.send(newFamily);
  } catch (err) {
    console.log("err:", err);
    return res.status(500).send(new Error("Something Went Wrong"));
  }
};

const Getter = async (req, res) => {
  try {
    const families = await familyModel.find();
    return res.send(families);
  } catch (error) {
    return res.status(500).send(new Error("Something Went Wrong"));
  }
};

const Patcher = async (req, res) => {
  try {
    let { id } = req.params;

    let update = await familyModel.updateOne(
      { _id: id },
      { $set: { ...req.body } }
    );

    return res.status(200).send(update);
  } catch (err) {
    console.log("err:", err);
    return res.status(500).send(new Error("Something Went Wrong"));
  }
};

module.exports = { Poster, Getter, Patcher };
