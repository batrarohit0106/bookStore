import { Router } from "express";
import { getBooks, createBook, editBook, deleteBook} from "../controllers/books.js";

const router = Router();
import authentication from "../middlewares/authentication.js";

router.get("/:userId", getBooks);
router.post("/", authentication, createBook);
router.patch("/:id", authentication, editBook);
router.delete("/:id", authentication, deleteBook);

export default router;