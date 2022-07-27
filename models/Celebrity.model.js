//  Add your code here

// modelo de las celebridades
// requerir el modelo
const { Schema, model} = require("mongoose")

// crear el modelo 
const celebritiesSchema = new Schema({
    name: String,
    occupation: String,
    catchPhrase: String
})

const Celebrities = model("Celebrities", celebritiesSchema)
module.exports = Celebrities
