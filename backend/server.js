const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Crear tabla si no existe
const crearTabla = `
  CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    edad INT NOT NULL,
    correo VARCHAR(255) NOT NULL UNIQUE,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`;

db.query(crearTabla, (err) => {
  if (err) console.error('Error creando tabla:', err);
  else console.log('Tabla usuarios lista');
});

// RUTAS

// Obtener todos los usuarios
app.get('/api/usuarios', (req, res) => {
  db.query('SELECT * FROM usuarios ORDER BY id DESC', (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener usuarios' });
    }
    res.json(results);
  });
});

// Crear nuevo usuario
app.post('/api/usuarios', (req, res) => {
  const { nombre, edad, correo } = req.body;
  
  if (!nombre || !edad || !correo) {
    return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }

  const query = 'INSERT INTO usuarios (nombre, edad, correo) VALUES (?, ?, ?)';
  
  db.query(query, [nombre, edad, correo], (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ error: 'El correo ya está registrado' });
      }
      return res.status(500).json({ error: 'Error al crear usuario' });
    }
    
    res.status(201).json({
      id: result.insertId,
      nombre,
      edad,
      correo,
      mensaje: 'Usuario creado exitosamente'
    });
  });
});

// Eliminar usuario
app.delete('/api/usuarios/:id', (req, res) => {
  const { id } = req.params;
  
  db.query('DELETE FROM usuarios WHERE id = ?', [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error al eliminar usuario' });
    }
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    
    res.json({ mensaje: 'Usuario eliminado exitosamente' });
  });
});

app.listen(PORT, () => {
  console.log(` Servidor corriendo en http://localhost:${PORT}`);
});