import { Router, Request, Response } from 'express';
import { validateCreateMatch } from '../validation/matches.js';
import { createMatch, getMatches } from '../controller/matchController.js';
import { asyncWrap } from '../utils/utility.js';

const router = Router();

router.get("/", asyncWrap(getMatches));

router.post("/new", validateCreateMatch, asyncWrap(createMatch));

export default router;