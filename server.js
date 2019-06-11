import express from 'express';
import bodyParser from 'body-parser';
import midleware from './midleware/mongo_midleware.js';
const jwt=require('jsonwebtoken');
const key=require("./config/key");

const app = express();

//midlewares
//<--parsear datos codificados en data
app.use(bodyParser.json());
//-->
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function(req,res,next){
  try{
  const token = req.headers.authorization.split(" ")[1]
  jwt.verify(token, key.tokenKey, function (err, payload) {
      //console.log(payload)
      if (payload) {
        //alguna funcion de logue extra(?)
          next()
      } else {
         next()
      }
  })
}catch(e){
  next()
}
})

//endpoints
app.post('/mgoup/v1/signin',function(req,res){
  if(true){ //autenticacion
    var token=jwt.sign({/*payload json*/},key.tokenKey);
    res.status(200).json({
      'login':'correct login',
      token
    })
  }else{
    res.status(400).json({message:'Invalid autentication'});
  }

})


app.get('/mgoup/v1/ping', (req, res) => {
  res.status(200).send({
    success: 'true',
    message: 'ping retrieved successfully',
    todos: 'pong madafaka'
  })
});

/**
 * endpoint para guardar imagenes en la base de datos
 */
app.post('/mgoup/v1/uploadImg', (req, res) => {
  if(!req.body.imageData) {
    return res.status(400).send({
      success: 'false',
      message: 'imageData is required'
    });
  } else if(!req.body.collectionName) {
    return res.status(400).send({
      success: 'false',
      message: 'collectionName is required'
    });
  }
    //save in db req.body.[..]
    var resp = midleware.insertDocumentChunks(req.body)
    if (resp.error){
      return res.status(500).send({
        success: 'false',
        message: 'an error ocurred',
        info : resp.error
      })
    }else{
      return res.status(201).send({
        success: 'true',
        message: 'process complete!',
        info: resp.msg
      })
    }
 
});


const PORT = 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});