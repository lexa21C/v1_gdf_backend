var mongoose = require('mongoose')

var Schema = mongoose.Schema

var Result = Schema({
    learning_result_code:Number,
    learning_result: String,
    competence:[{
        res:"Competence",
        type: mongoose.Types.ObjectId,
    }],

},{
    timestamps : true,
    versionKey: false
})
module.exports = mongoose.model('Learning_results', Result)