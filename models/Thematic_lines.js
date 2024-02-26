var mongoose = require('mongoose')
var Schema = mongoose.Schema

var thematic_line = Schema({
    _id: String,
    thematic_line: String,
    thematic_line_description: String,
    
})

module.exports = mongoose.model('Thematic_lines', thematic_line)    
