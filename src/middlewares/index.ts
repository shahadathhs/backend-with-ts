import express from "express";
import { get, merge } from "lodash";
import { getUserBySessionToken } from "./../db/users";
import { ObjectId } from 'mongodb';

export const isOwner = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { id } = req.params;
    const currentUserId = get(req, 'identity._id') as string;

    console.log('Current User ID:', currentUserId.toString());
    console.log('Request ID:', id);

    if (!currentUserId) {
      return res.status(403).json({ message: 'User not authenticated' });
    }

    if (currentUserId.toString() !== id) {
      return res.status(403).json({ message: 'User is not authorized' });
    }

    next()
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}

export const isAuthenticated = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const sessionToken = req.cookies["BACKEND-TS-AUTH"];

    if (!sessionToken) {
      return res.sendStatus(403);
    }

    const existingUser = await getUserBySessionToken(sessionToken);

    if (!existingUser) {
      return res.sendStatus(403);
    }

    merge(req, { identity: existingUser });

    return next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
