const { Schema, model } = require('mongoose');


const translationSchema = Schema({
    key: { type: String, required: true},
    translations:{
        en:{ type: String, required:true},
        es:{ type: String, required:true}
    }
});

const Translation = model('Translation', translationSchema);

module.exports = { Translation };