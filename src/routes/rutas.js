const { Router } = require('express')
const router = Router();

const juegos = require('./data.json');

router.post('/leaderboard', (req,res) => {
    const {usuario, partida, posiciones} = req.body;
    const filtrado = require('./filtrado.json');
    console.log(juegos.at(0))
    console.log("indicador")

    for(var i1=0;i1<juegos.length;i1++){
        for(var i2=i1+1;i2<juegos.length;i2++){
            if(parseInt(juegos.at(i1).puntaje)<parseInt(juegos.at(i2).puntaje)){
                const temp = juegos.at(i2);
                juegos.splice(i2,1);
                juegos.splice(i2,0,juegos.at(i1));
                juegos.splice(i1,1);
                juegos.splice(i1,0,temp)
            }
        }
    }

    var response = "";
    var limit = juegos.length;
    if(posiciones != "" && juegos.length>parseInt(posiciones)){
        limit=parseInt(posiciones);
    }
    console.log(limit)

    for(i1=0;i1<limit;i1++){
        if(usuario!=""  && partida!=""){
            if(juegos.at(i1).usuario == usuario && juegos.at(i1).partida == partida){
                response = response+"\n"+juegos.at(i1).usuario+" | "+juegos.at(i1).partida+" | "+juegos.at(i1).puntaje;
            }
        }
        else if(usuario!=""){
            if(juegos.at(i1).usuario == usuario){
                response = response+"\n"+juegos.at(i1).usuario+" | "+juegos.at(i1).partida+" | "+juegos.at(i1).puntaje;
            }
        }
        else if(partida!=""){
            if(juegos.at(i1).partida == partida){
                response = response+"\n"+juegos.at(i1).usuario+" | "+juegos.at(i1).partida+" | "+juegos.at(i1).puntaje;
            }
        }
        else if(i1<parseInt(posiciones)){
            response = response+"\n"+juegos.at(i1).usuario+" | "+juegos.at(i1).partida+" | "+juegos.at(i1).puntaje;
        }
    }

    res.send(response);
})


router.get('/report/:usuario/:partida/:puntaje', (req,res) => {
    const {usuario, partida, puntaje} = req.params;
    console.log(req.params)
    console.log(usuario)

    if(usuario && partida && puntaje){
        const nuevoJuego = {...req.params};
        juegos.push(nuevoJuego);
        console.log(nuevoJuego);
        //res.status(200).json(juegos)
        res.status(200).json("ok")
    }
    else{
        res.status(500).json({error:'no data'})
    }

})

router.get('/leaderboardEjemplo', (req,res) => {
    const data = {
       "usuario":"",
       "partida":"Gun Game",
       "posiciones":"10",
    }
    
    res.json(data);
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