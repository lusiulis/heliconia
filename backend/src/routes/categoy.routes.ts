import { Router } from "express";
import HandleToken from "../middlewares/handleToken";
import { asyncErrorHandler } from "../middlewares/handleError";

const categoryRouter = Router();