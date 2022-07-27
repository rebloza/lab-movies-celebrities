const router = require("express").Router();
const Celebrities = require("../models/Celebrity.model")

// ruta tipo GET ("/celebrities/create")

router.get("/create", (req, res, next ) => {
 //creamos la vista
    res.render("celebrities/new-celebrity.hbs")

})

router.post("/create", (req, res, next )=> {
     // destructuramos, recibimos la data
    const {name, occupation, catchPhrase } = req.body 

     // creamos el formulario
    Celebrities.create({
        name,
        occupation, 
        catchPhrase,
    })
    .then(() => {
       res.redirect("/celebrities")   
     })
    .catch((err) => {
        next(err)
    })
})

//creamos la ruta tipo GET  

router.get("/", (req, res, next) => {

    //obtener 
    Celebrities.find()

    .then((oneCelebrities)=> {
        res.render("celebrities/celebrities.hbs",{
            oneCelebrities
        })
    })
    .catch((err) =>{
        next(err)
    })
})




module.exports = router;