const { Router } = require('express')
const router = Router();

const juegos = require('./data.json');

router.post('/leaderboard', (req,res) => {
    const {usuario, partida, posiciones} = req.body;
    const filtrado = require('./filtrado.json');

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
    var cont=0;
    for(i1=0;i1<juegos.length;i1++){
        if(usuario!=""  && partida!=""){
            if(juegos.at(i1).usuario == usuario && juegos.at(i1).partida == partida){
                response = response+"\n"+juegos.at(i1).usuario+" | "+juegos.at(i1).partida+" | "+juegos.at(i1).puntaje;
                cont++;
            }
        }
        else if(usuario!=""){
            if(juegos.at(i1).usuario == usuario){
                response = response+"\n"+juegos.at(i1).usuario+" | "+juegos.at(i1).partida+" | "+juegos.at(i1).puntaje;
                cont++;
            }
        }
        else if(partida!=""){
            if(juegos.at(i1).partida == partida){
                response = response+"\n"+juegos.at(i1).usuario+" | "+juegos.at(i1).partida+" | "+juegos.at(i1).puntaje;
                cont++;
            }
        }
        else {
            response = response+"\n"+juegos.at(i1).usuario+" | "+juegos.at(i1).partida+" | "+juegos.at(i1).puntaje;
            cont++;
        }
        
        if(cont==parseInt(posiciones)){
            i1=juegos.length
        }
    }

    res.send(response);
})


router.get('/report/:usuario/:partida/:puntaje', (req,res) => {
    const {usuario, partida, puntaje} = req.params;

    if(usuario && partida && puntaje){
        const nuevoJuego = {...req.params};
        juegos.push(nuevoJuego);
        res.status(200).json(juegos)
        //res.status(200).json("ok")
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