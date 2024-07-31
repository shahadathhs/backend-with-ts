import express from "express";
import { deleteUsers, getAllUsers, updateUsers } from "../controllers/users";
import { isAuthenticated, isOwner } from "./../middlewares/index";

export default ( router: express.Router ) => {
  router.get('/users', isAuthenticated, getAllUsers)
  router.delete('/users/:id', isAuthenticated, isOwner, deleteUsers)
  router.patch('/users/:id', isAuthenticated, isOwner, updateUsers)
}