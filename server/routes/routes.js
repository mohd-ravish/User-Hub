const {Router} = require("express")
const {getUsers, saveUsers, updateUsers, deleteUsers} = require("../controllers/controllers.js")
const router = Router()

router.get("/get", getUsers);
router.post("/save", saveUsers);
router.put("/update/:id", updateUsers);
router.delete("/delete/:id", deleteUsers);

module.exports = router;