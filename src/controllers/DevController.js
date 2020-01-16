const Dev = require('../models/Dev')
const axios = require('axios');
const parseStringAsArray = require('../utils/parseStrAsArray')
module.exports = {
    async index(req, res) {
        const devs = await Dev.find();

        return res.json(devs)
    },
    async store(req, res) {
        const { github_username, techs, latitude, longitude } = req.body;
        const devExists = await Dev.findOne({ "github_username": github_username });

        if (devExists) {
            return res.json({ message: "Usuário já cadastrado!" });
        }

        const github_response = await axios.get(`https://api.github.com/users/${github_username}`);

        const { name = login, avatar_url, bio } = github_response.data;

        const techArrays = parseStringAsArray(techs);

        const location = {
            type: 'Point',
            coordinates: [longitude, latitude],
        }

        const dev = await Dev.create({ github_username, name, avatar_url, bio, techs: techArrays, location })

        return res.json(dev)
    }
}
