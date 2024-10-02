const { response } = require('express');
const { sequelizeDB } = require('../database/config');
const DailyClosing = require('../database/entity/DailyClosing');
const { Op } = require('sequelize');

const doDailyClosing = async (req, res = response) => {
    try {

        const id_user = req.uid;
        if( req.role !== 'admin')
            return res.status(403).json({ok:false, msg:'No tiene permisos para realizar la acción'});

        const { date } = req.body;

        const result = await sequelizeDB.query(
            'CALL sp_closing_day(:date, :userId, @p_result_code, @p_result_desc)',
            {
                replacements: {
                    date,
                    userId: id_user,
                },
                type: sequelizeDB.QueryTypes.RAW,
            }
        );

        console.log('resultado', result);
        

        const result_code = result[0].result_code;
        const result_desc = result[0].result_desc;

        console.log(result_code, result_desc);

        if( result_code != 0) {
            res.json({
                ok: false,
                result_code,
                msg: result_desc || 'Error al realizar el cierre diariooo'
            });    
        } else 
        res.json({
            ok: true,
            result_code,
            result_desc
        });

        console.log('termino normal');
        
    } catch (error) {
        console.log('error:',error);
        res.status(500).json({
            ok: false,
            msg: error.message || 'Error al realizar el cierre diario',
        });
    }
};

const getAllDailyClosing = async ( req, res = response) =>{
    try {
        const result = await DailyClosing.findAll();
        res.json({
            ok:true,
            result
        })
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:error
        })
    }
};

const alreadyDailyClosing = async (req, res = response) => {
    try {

        const { time } = req.body;

        const result = await DailyClosing.findAll({
            where: {
                [Op.and]: [
                    sequelizeDB.where(
                        sequelizeDB.fn('DATE', sequelizeDB.col('date_process')),
                        sequelizeDB.fn('DATE', time)
                    )
                ]
            }
        });

        console.log(result);
        
        if (result.length > 0)
            return res.json({
                ok:false
            })

        return res.json({
            ok: true, 
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
    getAllDailyClosing,
    alreadyDailyClosing
};
