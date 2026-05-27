import { NextFunction, Response, Request } from "express";
import { prisma } from "./../lib/prisma.js";
import { createMatchSchema, listMatchesQuerySchema } from "../validation/matches.js";
import { getMatchStatus } from "../utils/match-status.js";
import { ExpressError } from "../utils/utility.js";

export const createMatch = async (req: Request, res: Response, next: NextFunction) => {
    const parsed = createMatchSchema.parse(req.body);

    const match = await prisma.match.create({
        data: {
            ...parsed,
            startTime: new Date(parsed.startTime),
            endTime: new Date(parsed.endTime),
            status: getMatchStatus(parsed.startTime, parsed.endTime)
        }
    });
    res.status(201).json({ success: true, data: match });
}

export const getMatches = async (req: Request, res: Response, next: NextFunction) => {
    const parsed = listMatchesQuerySchema.safeParse(req.query);

    if(parsed.error) {
        throw new ExpressError(422, parsed.error.issues[0].message);
    }
    
    const matches = await prisma.match.findMany({
        take : parsed.data.limit || 50,
        orderBy : { startTime : 'desc'}
    })

    res.status(200).json({success : true, data : matches});
}