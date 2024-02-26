var mongoose = require('mongoose')
var Schema = mongoose.Schema;


var Artiffact = Schema({
    name: String,
    description: String,
    // quarter: Number,
    competence: [{
        ref: "Competences",
        type: mongoose.Types.ObjectId,
    }],
 
    quarter: [{
        ref: "Quarters",
        type: Schema.Types.ObjectId
        
    }]
}, {
    timestamps: true,
    versionKey: false
})

module.exports = mongoose.model('Artiffacts', Artiffact)