const {app} = require('./app')
const port = 8002;


app.get('/', (req, res) => {
  res.json(`Welcome to email app!`);
})

app.listen(process.env.PORT || port, ()=>{
  console.log(`Listening on port: ${port}`)
})
