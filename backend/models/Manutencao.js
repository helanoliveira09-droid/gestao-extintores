const mongoose = require('mongoose');

const ManutencaoSchema = new mongoose.Schema(
  {
    numCilindro: { type: String, required: true, trim: true },
    local: { type: String, required: true, trim: true },
    motivo: { type: String, required: true },
    dataEnvio: { type: String, required: true }, // formato ISO (YYYY-MM-DD)
    status: { type: String, enum: ['Pendente', 'Concluído'], default: 'Pendente' },
    dataRetorno: { type: String, default: null },
    obs: { type: String, default: '' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Manutencao', ManutencaoSchema);
