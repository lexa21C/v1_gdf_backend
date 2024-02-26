var mongoose = require('mongoose')
var Schema = mongoose.Schema

var Formation_programs = Schema({
    program_name: String,
    program_code: Number,
    total_duration: Number,
    program_version:String,
    competence : [{
        ref: "Competences",
        type: mongoose.Types.ObjectId,
    }],

    program_level:{
        ref:'Program_levels',
        type:mongoose.Schema.Types.String,
    },
    thematic_line: {
       ref: 'Thematic_lines',
       type: mongoose.Schema.Types.String,
    }
    // user : [{
    //     ref: "Users",
    //     type: mongoose.Schema.Types.ObjectId,
    // }]
},{
    timestamps : true,
    versionKey: false
})

module.exports = mongoose.model('Formation_programs', Formation_programs)