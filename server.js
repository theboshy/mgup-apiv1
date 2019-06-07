import express from 'express';
import bodyParser from 'body-parser';
import midleware from './midleware/mongo_midleware.js';

const app = express();

//parsear datos codificados en data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/mgoup/v1/ping', (req, res) => {
  res.status(200).send({
    success: 'true',
    message: 'ping retrieved successfully',
    todos: 'pong madafaka'
  })
});

/**
 * endpoint para gaurdar imagenes en la abse de datos
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
        message: 'an error ',
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