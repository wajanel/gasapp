const {response} = require('express');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const User = require('../database/entity/User');

const crearUsuario = async (req, res = response) =>{

        try {
            const role = 'usuario';
            const status_id = 2;
            const {user_name, password, name, cod_employee} = req.body;
            let usuario = await User.findAll({
                where:{
                    user_name
                }
            })
            console.log({usuario})

            if ( usuario.length > 0 ) {
                return res.status(400).json({
                    ok:false,
                    msg:'usuario ya existe'
                })
            }


            const salt = bcryptjs.genSaltSync();
            const newPassword = bcryptjs.hashSync(password, salt);

            const user = await User.create({user_name, password:newPassword, name, cod_employee, status_id, role});
            console.log(user);
            console.log(user.dataValues);
            const token = await generarJWT(user.dataValues.id, name);

            res.json({
                ok: true,
                uid:user.dataValues.id,
                name:user.dataValues.name,
                role:user.dataValues.role,
                token
            })

        } catch (error) {
            console.log(error);

            res.status(500).json({
                ok:false,
                msg:'comuniquese con el administrador'
            })
        }
    }


const loginUsuario = async (req, res = response) =>{

    try {
            const {userName, password} = req.body

            const usuario = await User.findOne({where:{user_name:userName, status_id:1}});
            console.log(usuario);
            if(!usuario) {
                return res.status(400).json({
                    ok:false,
                    msg:'Usuario no existe'
                })
            }

            console.log({userName, password});
            const validacionPass = bcryptjs.compareSync(password, usuario.dataValues.password);

            if(!validacionPass) {
                return res.status(400).json({
                    ok:false,
                    msg:'password incorrecto'
                })
            }

            const token = await generarJWT(usuario.dataValues.id, usuario.dataValues.name, usuario.dataValues.role);

            res.json({
                ok:true,
                msg: 'login usuario',
                uid: usuario.dataValues.id,
                name: usuario.dataValues.name,
                role: usuario.dataValues.role,
                token
            })
    } catch (error) {
        console.log(error);

        res.status(500).json({
            ok:false,
            msg:'comuniquese con el administrador'
        })
    }
}

const revalidarToken = async (req, res = response) =>{

    try {
        const { uid, name, role } = req;
        const token = await generarJWT(uid, name, role);
    
        res.json({
            ok:true,
            msg:'revalidar token',
            token,
            uid,
            name,
            role
        })

    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:'No se pudo regenerar token'
        })
    }
}

const updateUser = async (req, res = response) => {
    const { name, cod_employee, status_id, role} = req.body;
    const { id } = req.params;

    try{
        const result = await User.update({name, cod_employee, status_id, role}, {
            where:{
                id
            }
        })
        ;

        if (result[0] === 0) {
            throw new Error('No se encontró la empleado para actualizar.');
        } 

        return res.json({
            ok:true,
            msg:'Empleado actualizado exitosamente.'
        })
    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg:error
        })
    }

}

const listarUsers = async (req, res = response) => {
    try {
        const result = await User.findAll();
        res.json(
            {
                ok:true,
                result
            }
        )
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'Error al listar usuarios'
        })
    }

}


module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken,
    updateUser,
    listarUsers
}