const router = require("express").Router();
const Movies = require("../models/movies.model")
const Celebrities = require("../models/Celebrity.model")


// all your routes here

// ruta tipo GET  "/movies/create" 
//---------- CREA NUEVAS PELICULAS ------------
router.get("/create", (req, res, next ) => {
    Celebrities.find().select("name")
    .then((celebrities)=> {
        res.render("movies/new-movie.hbs", {
            celebrities
        })
    })
    .catch((err)=>{
        next(err)
    })    
})

router.post("/create", (req, res, next) => {
    
    const { title, geren, pliot, cast } = req.body

    Movies.create({
        title,
        geren, 
        pliot, 
        cast
    })
    .then(()=> {
        res.redirect("/movies")

    })
    .catch((err)=> {
        next(err)
    })

})

//-------- LISTA DE PELICULAS ---------

router.get("/" ,(req, res, next ) => {
     
    Movies.find()

    .then((unapelicula) => {
        res.render("movies/movies.hbs", {
            unapelicula
        })
    })
})


//------ DETALLE DE LA PELICULA--------
 
// ruta tipo Get "/movies/:id"

router.get("/:moviesId", (req, res, next ) => {

    const { moviesId } = req.params
 // obtener 
 Movies.findById(moviesId).populate("cast")
 .then((moviesDetalles) => {
    res.render("movies/movie-details.hbs",{
        moviesDetalles
    })
 })
.catch((err)=>{
    next(err)
 })
})

// ------- ELIMINAR  --------------

router.post("/:moviesId/delete", (req, res, next ) => {

    const { moviesId } = req.params

    Movies.findByIdAndRemove(moviesId)
    .then((moviesEliminar) => {
        res.render("movies/movie-details.hbs", {
            moviesEliminar
        })
    })
    .catch((err) => {
        next(err)
    })
})

router.get("/:moviesId/edit", async (req, res, netx ) => {
    const { moviesId } = req.params

    try {
        
       const  pelis = await Movies.findById(moviesId).populate("cast") //
        
       const celebrities = Celebrities.findOne()

       res.render("movies/edit-movie" ,{
        pelis, celebrities
       })
    
    }catch (err) {
        next(err)
    }

    
})


// router.get("/:moviesId", (req, res, next) => {
//     const { moviesId } = req.params;
//     Movies.findById(moviesId)
//       .populate("cast")
//       .then((moviesDetalles) => {
//         res.render("movies/movie-details.hbs", { moviesDetalles });
//       })
//       .catch((err) => {
//         next(err);
//       });
//   });
module.exports = router;
