import express from "express";
import {getAllCollabrations, influencerAllCollabrations, influencerDeleteCollabrations, postCollabration} from "../controllers/collabrationController.js";
import {isAuthenticated} from "../middlewares/auth.js"

const router = express.Router();

router.get("/influencer/getAll", isAuthenticated , influencerAllCollabrations);
router.get("/collabrator/getAll", isAuthenticated ,getAllCollabrations );
router.delete("/delete/:id", isAuthenticated ,influencerDeleteCollabrations);
router.post("/post", isAuthenticated, postCollabration);

export default router;