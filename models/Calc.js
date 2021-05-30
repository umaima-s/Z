const mongoose = require('mongoose');
// const bcrypt = require('bcrypt')
const calcSchema = new mongoose.Schema({
    gold:{
        type:Number,
    },
    silver:{
        type:Number,
    },
    cash_in_hand:{
        type:Number,
    },
    cash_in_bank:{
        type:Number,
    },
    loans:{
        type:Number,
    },
    property:{
        type:Number,
    },
    business_assets:{
        type:Number,
    },
    total:{
        type:Number,
    },
    zak:{
        type:Number,
    },
    
})
mongoose.model('Calc',calcSchema);