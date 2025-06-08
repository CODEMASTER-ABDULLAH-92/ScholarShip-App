import express from 'express'
import { loginRecruiter, logoutRecruiter, registerRecruiter } from '../controllers/recruiterControllers.js';
const recruiterRouter = express.Router();

recruiterRouter.post("/recruiter-register", registerRecruiter)
recruiterRouter.post("/recruiter-login", loginRecruiter)
recruiterRouter.post("/recruiter-logout", logoutRecruiter)

export default recruiterRouter;