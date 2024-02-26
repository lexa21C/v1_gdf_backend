var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var Quarter = Schema({
    number:Number,

    competence: [{
        ref: "Competences",
        type:mongoose.Types.ObjectId,
    }],
    // artiffact:[{
    //     ref:"Artiffacts",
    //     type:Schema.Types.ObjectId
    // }],
    formation_program: [{
        ref: "Formation_progrmas",
        type: mongoose.Types.ObjectId,
    }],
}, { 
    timestamps: true,
    versionKey: false
})

module.exports = mongoose.model('Quarters', Quarter)
