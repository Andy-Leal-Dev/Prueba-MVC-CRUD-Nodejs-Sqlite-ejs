import express  from 'express'

import TaskController from '../Controller/Task.controller.js';

const router = express.Router();
const taskController = new TaskController();

//Ruta para Obtener la vista 
router.get('/',taskController.viewIndex)

//Ruta para Obtener Las tareas de la base de datos mediante el contoller
router.get('/getTask', taskController.get)
//Ruta para Crear Las tareas de la base de datos mediante el contoller
router.post('/taksPost', taskController.add)
//Ruta para Actualizar Las tareas de la base de datos mediante el contoller
router.put('/UpdateTask', taskController.update)
//Ruta para Eliminar Las tareas de la base de datos mediante el contoller
router.delete('/Deteletask', taskController.delete)

export default router;