const Celebrities = require("./Celebrity.model.js")
//modelo de las peliculas
const {Schema, model} = require("mongoose")

// crear movies

const moviesSchema = new Schema(
    
  {
    title: String,
    genre: String,
    plot: String,
    cast: [{
        type: Schema.Types.ObjectId,
        ref: "Celebrities"
    }],
  }
    // {
    //    timestamps: true, 
    // }
)

const Movies = model("Movies", moviesSchema)
module.exports = Movies



