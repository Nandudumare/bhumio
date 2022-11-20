const { Router } = require("express");
const { Getter, Poster, Patcher } = require("../controllers/family");

const familyRouter = Router();

familyRouter.get("/", Getter);
familyRouter.post("/", Poster);
familyRouter.patch("/:id", Patcher);

module.exports = familyRouter;
