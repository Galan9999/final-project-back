import { Router } from "express";
import { loginUser } from "../../controllers/usersControllers/usersControllers.js";

const usersRouter = Router();

usersRouter.post("/login", loginUser);

export default usersRouter;
