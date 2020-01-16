const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStrAsArray')
module.exports = {
    async index(req, res) {
        // Buscar todos Devs num raio de 10km
        // Filtrar por Techs

        const { techs, latitude, longitude } = req.query;

        const techsArray = parseStringAsArray(techs);

        const devs = await Dev.find({
            techs: {
                $in: techsArray,
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude]
                    },
                    $maxDistance: 10000,
                },
            }
        });

        console.log(devs)


        return res.json({ devs })

    }
}