import { pool } from "../db.js";

export const getTask = async (req, res) => {
  try {
    const query = 'SELECT * FROM tasks ORDER BY createdAt';
    const [result] = await pool.query(query);
    res.json(result)
  } catch (error) {
    console.log(error);
  }
}

export const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const query = 'SELECT * FROM tasks WHERE id = ?';
    const [result] = await pool.query(query, [id]);
    if(result.length == 0) throw new Error('El id que estas intentando buscar no existe');
    res.json(result)
  } catch (error) {
    res.status(404).json(error.message);
  }
}

export const postTask = async (req, res) => {
  try {
    const {title, description} = req.body;
    const query = 'INSERT INTO tasks(title, description) VALUES(?, ?)';
    const response = await pool.query(query, [title, description]);
    res.json({data: {title, description}})
  } catch (error) {
    res.json(error);
  }
}

export const putTask = async (req, res) => {
  try {
    const { id } = req.params;
    // const query = 'UPDATE tasks SET title = ?, description = ?  WHERE id = ?'; ----> Cualquiera de las dos se puede utilizar
    const query = 'UPDATE tasks SET ? WHERE id = ?';
    const [result] = await pool.query(query, [req.body, id]);
    if(result.length == 0) throw new Error('El id que estas intentando buscar no existe');
    res.json(result)
  } catch (error) {
    res.status(404).json(error.message);
  }
}

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const query = 'DELETE FROM tasks WHERE id = ?';
    const [result] = await pool.query(query, [id]);
    if(result.length == 0) throw new Error('El id que estas intentando buscar no existe');
    res.json("La tarea ha sido eliminada");
  } catch (error) {
    res.status(404).json(error.message);
  }
}