import { NextFunction, Response, Request } from "express";

export class ExpressError extends Error {
    constructor(
        public status: number,
        public message: string
    ) { super(message) };
}

export function asyncWrap(fn: Function) {
    return function (req: Request, res: Response, next: NextFunction) {
        fn(req, res, next).catch((err: Error) => next(err));
    }
}