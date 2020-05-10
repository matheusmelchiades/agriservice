
module.exports.main = (_, response) => {

    try {

        return response.json({ status: 'running' })

    } catch (err) {

        return response.status(500).json({ error: 'Error internaval' })
    }
}
