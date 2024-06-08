import TaskModel from "../model/TaskModel.js";


class TaskController {
    constructor() {
        //iniciala el modelo
      this.Taskmodel = new TaskModel();

      //Inicializa las variables dentro del contructor para que los metodos lo acepten
      this.add = this.add.bind(this);
      this.get = this.get.bind(this);
      this.update = this.update.bind(this);
      this.delete = this.delete.bind(this);
    }

    //Metodo que Muestra La vista 
    viewIndex(req, res){
        res.render("index.ejs");
    }
  
    //Metodo para crear una tarea
    async add(req, res) {
  
      const { tarea, descripcion} = req.body;
  
      if (!tarea || !descripcion ) {
        res.status(400).send("Faltan campos requeridos");
        return;
      }else{
        console.log('excelente')
      }
    
      await this.Taskmodel.crearTaks(tarea,descripcion);

      res.redirect("/");
    }
    
    //Metodo para Obtener todas las tareas
    async get(req, res){
        const tasks = await this.Taskmodel.obtenerAlltaks();
        console.log(tasks);
        return res.status(200).json(tasks)
    }

    //Metodo para actualizar las tareas
    async update(req, res){
        const {id, tarea, descripcion} = req.body;
      
        await this.Taskmodel.updateTask(id,tarea,descripcion);
  
        res.redirect("/");
    }

    //Metodo para Eliminar las Tareas
    async delete(req, res){
        const {id} = req.body;
  
        if (!id) {
          res.status(400).send("Faltan campos requeridos");
          return;
        }else{
          console.log('excelente')
        }
      
        await this.Taskmodel.deleteTask(id);
  
    }
  }

export default TaskController;