const { response } = require('express');
const { sequelizeDB } = require('../database/config');

const doDailyClosing = async (req, res = response) => {
    try {
        const { date } = req.body;

        // Definir los parámetros de salida como variables de Sequelize
        const p_result_code = { type: sequelizeDB.INTEGER, dir: sequelizeDB.OUT };
        const p_result_desc = { type: sequelizeDB.STRING, dir: sequelizeDB.OUT };

        // Llamada al procedimiento almacenado
        const result = await sequelizeDB.query(
            'CALL sp_closing_day(:date, :userId, @p_result_code, @p_result_desc)',
            {
                replacements: {
                    date,
                    userId: 1, // Puedes pasar el ID del usuario como desees
                },
                type: sequelizeDB.QueryTypes.RAW,
            }
        );

        console.log(result);
        

        const result_code = result.result_code;
        const result_desc = result.result_desc;

        res.json({
            ok: true,
            result_code,
            result_desc
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: error.message || 'Error al realizar el cierre diario',
        });
    }
};

module.exports = {
    doDailyClosing,
};
