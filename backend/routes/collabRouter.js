import express from "express";
import { getAllCollabs, getmyCollabs , postCollabs , updatePost  ,deletePost, getSinglePost} from "../controllers/collabController.js";
import { isAuthenticated } from "../middlewares/auth.js";


const router = express.Router();

router.get("/getall", getAllCollabs);
router.post("/post", isAuthenticated ,postCollabs);
router.get("/getmyPosts", isAuthenticated ,getmyCollabs);
router.put("/update/:id", isAuthenticated , updatePost);
router.delete("/delete/:id", isAuthenticated , deletePost);
router.get("/:id", isAuthenticated , getSinglePost);


export default router;