const express = require('express')
const bodyparser = require('body-parser')
const cors =  require('cors')
const morgan = require('morgan')


const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))
app.set('views' ,  __dirname + '/public')
app.use(express.static(__dirname + '/public'))
app.engine('ejs' , require('ejs').renderFile)

app.use(bodyparser.urlencoded({ extended : false }))
app.use(bodyparser.json())

app.get('/' , (req , res ) => {
    res.render('index.html')
    
})

app.listen(process.env.PORT || 3333)