import sqlite3 from "sqlite3"; //Importando la libreria de la Base de Datos
import { promisify } from "util";

class TaskModel {
  constructor() {
    //inicializacion y conexion a la base de Datos
    this.db = new sqlite3.Database("./config/Database.db", (err) => {
      if (err) {
        console.error(err.message);
        return
      }
      console.log("Conectado a la base de datos SQLite.");
    });

    this.db.run(
      "CREATE TABLE IF NOT EXISTS task (taks TEXT, description TEXT, id INTEGER PRIMARY KEY AUTOINCREMENT)",
      (err) => {
        if (err) {
          console.error(err.message);
        }
      }
    );
  }

  //Metodo Del Modelo para crear las Tareas de tareas
  crearTaks(taks, description ) {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO task (taks, description) VALUES (?, ?)`;
      this.db.run(sql, [taks, description], function (err) {
        if (err) {
          console.error(err.message);
          reject(err);
        }
        console.log(`Se ha insertado una fila con el ID ${this.lastID}`);
        resolve(this.lastID);
      });
    });
  }

  //Metodo Del Modelo de Obterncion de tareas
  async obtenerAlltaks() {
    const sql = `SELECT * FROM task`;
    const all = promisify(this.db.all).bind(this.db);
    return await all(sql);
  }

  //Metodo Del Modelo de Edcicion de tareas
  async updateTask(id, newTask, newDescription) {
    // Validate input data (optional)
    if (newTask) {
      const sql = `UPDATE task SET taks = ? WHERE id = ?`;
      const run = promisify(this.db.run).bind(this.db);
      try {
        await run(sql, [newTask, id]);
        console.log(`Tarea con ID ${id} actualizada exitosamente.`);
      } catch (err) {
        console.error("Error al actualizar la tarea:", err.message);
        throw err; 
      }
    } else if(newDescription){
      const sql = `UPDATE task SET description = ? WHERE id = ?`;
      const run = promisify(this.db.run).bind(this.db);
      try {
        await run(sql, [newDescription, id]);
        console.log(`Tarea con ID ${id} actualizada exitosamente.`);
      } catch (err) {
        console.error("Error al actualizar la tarea:", err.message);
        throw err;
      }
    } else{

    const sql = `UPDATE task SET taks = ?, description = ? WHERE id = ?`;
    const run = promisify(this.db.run).bind(this.db);

    try {
      await run(sql, [newTask, newDescription, id]);
      console.log(`Tarea con ID ${id} actualizada exitosamente.`);
    } catch (err) {
      console.error("Error al actualizar la tarea:", err.message);
      throw err; 
    }
    }
  }

  //Metodo Del Modelo de eliminacion de tareas
  async deleteTask(id) {

    if (!id) {
      throw new Error("Missing required field: id");
    }

    const sql = `DELETE FROM task WHERE id = ?`;
    const run = promisify(this.db.run).bind(this.db);

    try {
      await run(sql, [id]);
      console.log(`Tarea con ID ${id} eliminada exitosamente.`);
    } catch (err) {
      console.error("Error al eliminar la tarea:", err.message);
      throw err; 
    }
  }
}

export default TaskModel;