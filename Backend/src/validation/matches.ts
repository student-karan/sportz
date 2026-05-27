import { z } from "zod";
import { NextFunction, Response, Request } from "express";
import { ExpressError } from "../utils/utility.js";

export const listMatchesQuerySchema = z.object({
  limit: z.coerce.number().int().positive().max(100).optional(),
});

export const matchIdParamSchema = z.object({
  id: z.coerce.number().int().positive(),
});

const isoString = z.string().datetime().refine((val) => {
  return !isNaN(Date.parse(val))
}, { message: 'Invalid ISO date string' });

export const createMatchSchema = z.object({
  sport: z.string().min(1),
  homeTeam: z.string().min(1),
  awayTeam: z.string().min(1),
  startTime: isoString,
  endTime: isoString,
  homeScore: z.number().int().nonnegative().default(0),
  awayScore: z.number().int().nonnegative().default(0),
}).superRefine((data, ctx) => {
  const start = new Date(data.startTime);
  const end = new Date(data.endTime);
  if (end <= start) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'endTime must be after startTime',
      path: ['endTime'],
    });
  }
});

export const validateCreateMatch = (req: Request, res: Response, next: NextFunction) => {
  const result = createMatchSchema.safeParse(req.body);
  if (result.error) {
    next(new ExpressError(422, result.error.issues[0].message));
  } else {
    next();
  }
}

export const updateScoreSchema = z.object({
  homeScore: z.number().int().nonnegative(),
  awayScore: z.number().int().nonnegative(),
});