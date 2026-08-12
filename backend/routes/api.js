const express = require('express');
const router = express.Router();

const Extintor = require('../models/Extintor');
const Inspecao = require('../models/Inspecao');
const Manutencao = require('../models/Manutencao');

// Helper para tratar erros de forma padronizada
function handleError(res, err) {
  console.error(err);
  res.status(500).json({ erro: 'Erro no servidor', detalhe: err.message });
}

/* ============================================================
   EXTINTORES
   ============================================================ */
router.get('/extintores', async (req, res) => {
  try {
    const extintores = await Extintor.find().sort({ createdAt: -1 });
    res.json(extintores);
  } catch (err) { handleError(res, err); }
});

router.post('/extintores', async (req, res) => {
  try {
    const novo = await Extintor.create(req.body);
    res.status(201).json(novo);
  } catch (err) { handleError(res, err); }
});

router.put('/extintores/:id', async (req, res) => {
  try {
    const atualizado = await Extintor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!atualizado) return res.status(404).json({ erro: 'Extintor não encontrado' });
    res.json(atualizado);
  } catch (err) { handleError(res, err); }
});

router.delete('/extintores/:id', async (req, res) => {
  try {
    const removido = await Extintor.findByIdAndDelete(req.params.id);
    if (!removido) return res.status(404).json({ erro: 'Extintor não encontrado' });
    res.json({ ok: true });
  } catch (err) { handleError(res, err); }
});

/* ============================================================
   INSPEÇÕES
   ============================================================ */
router.get('/inspecoes', async (req, res) => {
  try {
    const inspecoes = await Inspecao.find().sort({ createdAt: -1 });
    res.json(inspecoes);
  } catch (err) { handleError(res, err); }
});

router.post('/inspecoes', async (req, res) => {
  try {
    const nova = await Inspecao.create(req.body);
    res.status(201).json(nova);
  } catch (err) { handleError(res, err); }
});

router.delete('/inspecoes/:id', async (req, res) => {
  try {
    const removida = await Inspecao.findByIdAndDelete(req.params.id);
    if (!removida) return res.status(404).json({ erro: 'Inspeção não encontrada' });
    res.json({ ok: true });
  } catch (err) { handleError(res, err); }
});

/* ============================================================
   MANUTENÇÕES
   ============================================================ */
router.get('/manutencoes', async (req, res) => {
  try {
    const manutencoes = await Manutencao.find().sort({ createdAt: -1 });
    res.json(manutencoes);
  } catch (err) { handleError(res, err); }
});

router.post('/manutencoes', async (req, res) => {
  try {
    const nova = await Manutencao.create(req.body);
    res.status(201).json(nova);
  } catch (err) { handleError(res, err); }
});

router.patch('/manutencoes/:id', async (req, res) => {
  try {
    const atualizada = await Manutencao.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!atualizada) return res.status(404).json({ erro: 'Manutenção não encontrada' });
    res.json(atualizada);
  } catch (err) { handleError(res, err); }
});

router.delete('/manutencoes/:id', async (req, res) => {
  try {
    const removida = await Manutencao.findByIdAndDelete(req.params.id);
    if (!removida) return res.status(404).json({ erro: 'Manutenção não encontrada' });
    res.json({ ok: true });
  } catch (err) { handleError(res, err); }
});

module.exports = router;
