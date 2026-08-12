const mongoose = require('mongoose');

const ExtintorSchema = new mongoose.Schema(
  {
    numCilindro: { type: String, required: true, trim: true },
    tipo: { type: String, required: true, trim: true },
    capacidade: { type: Number, required: true },
    unidade: { type: String, required: true, trim: true },
    local: { type: String, required: true, trim: true },
    dataManutencao: { type: String, required: true }, // formato ISO (YYYY-MM-DD)
    obs: { type: String, default: '' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Extintor', ExtintorSchema);
