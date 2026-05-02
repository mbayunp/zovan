const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Respondent = sequelize.define('Respondent', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

    // Data Demografi
    gender: { type: DataTypes.STRING },
    usia: { type: DataTypes.STRING },
    edu: { type: DataTypes.STRING },
    income: { type: DataTypes.STRING },

    // Skor Rata-rata
    x1_score: { type: DataTypes.FLOAT },
    x2_score: { type: DataTypes.FLOAT },
    x3_score: { type: DataTypes.FLOAT },
    x4_score: { type: DataTypes.FLOAT },
    y_score: { type: DataTypes.FLOAT },

    // Jawaban Mentah (JSON String)
    raw_answers: { type: DataTypes.TEXT }
}, { timestamps: true });

module.exports = Respondent;