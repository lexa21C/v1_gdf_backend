var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var Competences = Schema(
  {
   
    labor_competition: String,
    labor_competence_code: Number,
    program_competition: String,
    labor_competition_version: String,
    estimated_duration: String,
    quarter: Number,
    
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Competences", Competences);
