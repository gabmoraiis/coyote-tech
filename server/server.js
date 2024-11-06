const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());

app.use(express.json());

let cursos = [];

app.get('/cursos/:id?', (req, res) => {
    const { id } = req.params;
  
    if (id) {
      const curso = cursos.find(curso => curso.id == id);
  
      if (!curso) {
        return res.status(404).json({ message: 'Curso não encontrado' });
      }
  
      return res.json(curso);
    }
    res.json(cursos);
  });

app.post('/cursos', (req, res) => {
    const { nomeCurso, modulo, disciplinas, cargaHoraria } = req.body;
    const novoCurso = { 
        id: cursos.length + 1, 
        nomeCurso, 
        modulo, 
        disciplinas, 
        cargaHoraria 
    };
    cursos.push(novoCurso);
    res.status(201).json(novoCurso);
});

app.put('/cursos/:id', (req, res) => {
    const { id } = req.params;
    const { nomeCurso, modulo, disciplinas, cargaHoraria } = req.body;

    const cursoIndex = cursos.findIndex(curso => curso.id == id);
    if (cursoIndex === -1) {
        return res.status(404).json({ message: 'Curso não encontrado' });
    }

    cursos[cursoIndex] = { id: Number(id), nomeCurso, modulo, disciplinas, cargaHoraria };
    res.json(cursos[cursoIndex]);
});

app.delete('/cursos/:id', (req, res) => {
    const { id } = req.params;

    const cursoIndex = cursos.findIndex(curso => curso.id == id);
    if (cursoIndex === -1) {
        return res.status(404).json({ message: 'Curso não encontrado' });
    }

    cursos.splice(cursoIndex, 1);
    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
