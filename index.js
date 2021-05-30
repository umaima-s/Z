const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()
const PORT = 3000
const { mogoUrl } = require('./keys')


require('./models/Calc');
const Calc = mongoose.model("Calc")

const requireToken = require('./middleware/requireToken')
app.use(bodyParser.json())

const authRoutes = require('./routes/calcRoutes')
app.use(authRoutes)

mongoose.connect(mogoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected', () => {
    console.log("connected to mongo database")
})

mongoose.connection.on('error', (err) => {
    console.log("this is error==>", err)
})



app.get('/', (req, res) => {
    Calc.find({})
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            console.log(err)
        })
    // res.send("Gold="+req.calc.gold)
})
app.post('/history', (req, res) => {
    const calc = new Calc({
        gold: req.body.gold,
        silver: req.body.silver,
        cash_in_hand: req.body.cash_in_hand,
        cash_in_bank: req.body.cash_in_bank,
        loans: req.body.loans,
        property: req.body.property,
        business_assets: req.body.business_assets
    })
    calc.save()
    console.log(req.body)
        .then(data => {
            console.log(data)
            res.send(data)
        })
        .catch(err => {
            console.log(err)
        })
})

app.post('/delete', (req, res) => {
    Calc.findByIdAndRemove(req.body.id)
        .then(data => {
            console.log(data)
            res.send(data)
        })
        .catch(err => {
            console.log(err)
        })
})

app.post('/update', (req, res) => {
    Calc.findByIdAndUpdate(req.body.id, {
        gold: req.body.gold,
        silver: req.body.silver,
        cash_in_hand: req.body.cash_in_hand,
        cash_in_bank: req.body.cash_in_bank,
        loans: req.body.loans,
        property: req.body.property,
        business_assets: req.body.business_assets,
        total: req.body.total,
        zak: req.body.zak,

    }).then(data => {
        console.log(data)
        res.send(data)
    })
        .catch(err => {
            console.log(err)
        })
})

app.listen(PORT, () => {
    console.log("server running " + PORT)
})
