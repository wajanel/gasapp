const {response} = require('express'); 
const { Translation } = require('../database/entityMDB/translationSchema');

const translations = async(req, res = response) =>{
    const { locale } = req.params;

    try {
        const dataTranslations = await Translation.find();

        const translationsMap = {};
        dataTranslations.forEach(item => {
            translationsMap[item.key] = item.translations[locale];
        });

        res.json({ok:true, translation:translationsMap});
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'es' == locale ? 'Error al obtener los datos' : 'Error fetching translations'
        })
    }

};

module.exports = {
    translations,
}