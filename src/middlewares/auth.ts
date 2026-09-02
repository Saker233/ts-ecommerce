import type { NextFunction, Request, Response } from "express"
import { UnauthorizedException } from "../exceptions/unauthorized.js"
import { ErrorCode } from "../exceptions/root.js"
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../secrets.js"
import { prisma } from "../lib/prisma.js"

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const [scheme, token] = (req.headers.authorization ?? "").split(" ")

  if (scheme !== "Bearer" || !token) {
    return next(new UnauthorizedException("Unauthorized", ErrorCode.UNAUTHORIZED))
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as { userId: number }
    const user = await prisma.user.findFirst({ where: { id: payload.userId } })

    if (!user) {
      return next(new UnauthorizedException("Unauthorized", ErrorCode.UNAUTHORIZED))
    }

    req.user = user
    next()
  } catch {
    next(new UnauthorizedException("Unauthorized", ErrorCode.UNAUTHORIZED))
  }
}

export default authMiddleware