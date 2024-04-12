import express from 'express';
import Role from '../models/Role.js';
import { createRole, deleteRole, getAllRoles, updateRole } from '../controllers/role.controller.js';

const router = express.Router();

//Create Role
router.post('/create', createRole);

//Update role in DB
router.put('/update/:id', updateRole);

//Get All Roles
router.get('/getAll', getAllRoles);

//Delete role
router.delete("/deleteRole/:id", deleteRole);

export default router;