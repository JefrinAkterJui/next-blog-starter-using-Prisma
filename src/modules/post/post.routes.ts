import  express  from "express"
import { PostController } from "./post.controller";

const router = express.Router()


router.get("/", PostController.getAllPost)
router.get("/stats", PostController.getBlogStat)
router.get("/:id", PostController.getSinglePost)
router.post("/", PostController.createPost)
router.delete("/:id", PostController.deletePost)
router.patch("/:id", PostController.updatePost)

export const postRouter = router;