const mongoose = require('mongoose');

const InspecaoSchema = new mongoose.Schema(
  {
    numCilindro: { type: String, required: true, trim: true },
    local: { type: String, required: true, trim: true },
    dataInspeccao: { type: String, required: true }, // formato ISO (YYYY-MM-DD)
    aparencia: { type: String, required: true },
    manometro: { type: String, required: true },
    lacre: { type: String, required: true },
    obs: { type: String, default: '' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Inspecao', InspecaoSchema);
