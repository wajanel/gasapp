const { response } = require('express');
const { Provider } = require('../database/entity/Provider')

const crearProvider = async (req, res = response) => {
    const { name, address, phone_number, description } = req.body;

    if( req.role !== 'admin' && req.role !== 'usuario')
        return res.status(403).json({ok:false, msg:'No tiene permisos para realizar la acción'});

    try {
        const response = await Provider.create({ name, address, phone_number, description });
        console.log(response);
        return res.json({
            ok: true,
            msg: 'Provider creado',
            provider: response,
            id:response.id
        });
    } catch (error) {
        console.log(error.message);
        
        return res.status(500).json({
            ok: false,
            msg: 'Error al guardar el proveedor'
        });
    }
};

const listadoProvider = async (req, res) => {
    try {
        const listado = await Provider.findAll();
        console.log(listado)
        return res.json({
            ok: true,
            msg: 'Listado de providers',
            listado
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Error al listar los proveedores'
        });
    }
};

const updateProvider = async (req, res = response) => {
    const id = req.params.id;
    const { name, address, phone_number, description } = req.body;

    if( req.role !== 'admin' && req.role !== 'usuario')
        return res.status(403).json({ok:false, msg:'No tiene permisos para realizar la acción'});

    try {
        const result = await Provider.update(
            { name, address, phone_number, description },
            { where: { id } }
        );

        if (result[0] === 0) {
            throw new Error('No se encontró el proveedor para actualizar.');
        }

        return res.json({
            ok: true,
            msg: 'Proveedor actualizado exitosamente.'
        });
    } catch (error) {
        console.log(error.message);
        
        return res.status(500).json({
            ok: false,
            msg: 'Error al actualizar el proveedor'
        });
    }
};

const deleteProvider = async (req, res) => {
    const id = req.params.id;

    if( req.role !== 'admin' && req.role !== 'usuario')
        return res.status(403).json({ok:false, msg:'No tiene permisos para realizar la acción'});
    
    try {
        const result = await Provider.destroy({ where: { id } });

        if (result === 0) {
            throw new Error('No se encontró el proveedor para eliminar.');
        }

        return res.json({
            ok: true,
            msg: 'Proveedor eliminado exitosamente.'
        });
    } catch (error) {
        console.log(error.message);
        
        return res.status(500).json({
            ok: false,
            msg: 'Error al eliminar el proveedor'
        });
    }
};

module.exports = {
    crearProvider,
    listadoProvider,
    updateProvider,
    deleteProvider
};
