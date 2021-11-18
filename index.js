
//Import
const path = require('path')
const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

//Instaciar
const app = express()

//Ligar server
const port = process.env.PORT || 3000

//Incluir
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))

//ROTAS

//Set
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

//Get
app.get('/', (req, res) => {

    let contas = []
    if('contas' in req.cookies){
        contas = req.cookies.contas
    }
    
    res.render('index', {
        contas
    })
})

//Post
app.post('/calc', (req, res) => {
    
    let { num1, num2, op } = req.body
    num1 = parseInt(num1)
    num2 = parseInt(num2)
    let total = 0

    if(op==='+'){
        total = num1+num2
    }else if(op==='-'){
        total = num1-num2
    }else if(op==='*'){
        total = num1*num2
    }else if(op==='/'){
        total = num1/num2
    }

    let contas = []
    if('contas' in req.cookies){
        contas = req.cookies.contas
    }
    contas.push({
        num1, num2, op, total
    })
    res.cookie('contas', contas, { maxAge: 1000 })
    res.redirect('/')
})

//Conexão com nosso server
app.listen(port, () => console.log('Running... ...'))