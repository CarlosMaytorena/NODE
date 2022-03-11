const { Router } = require('express')
const router = Router();


const juegos = require('./data.json');
console.log(juegos)

router.get('/report', (req,res) => {
    res.json(juegos);
})

router.get('/leaderboard', (req,res) => {
    const data = {
       "usuario":"",
       "partida":"Gun Game",
       "posiciones":"10",
    }
    res.json(data);
})

router.get('/:id', (req,res) => {
    const id = req.params.id;

    juegos.forEach(juego =>{
        if(juego.usuario == id){
            console.log(juego.usuario + juego.puntaje);
            res.json(juego)
        }
    })
})

router.post('/', (req,res) => {
    const {usuario, partida, puntaje} = req.body;
    if(usuario && partida && puntaje){
        const id = juegos.length + 1;
        const nuevoJuego = {...req.body,id};
        juegos.push(nuevoJuego);
        console.log(nuevoJuego);
        res.status(200).json(juegos)

    }
    else{
        res.status(500).json({error:'no data'})
    }

})

module.exports = router;