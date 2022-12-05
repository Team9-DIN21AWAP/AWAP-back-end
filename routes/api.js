/**
 * This file contains routes for getting visualizations data
 */
let express = require('express')
let {
    getVisualizationData,
    getVisualizations,
    addDIYVisualization,
} = require('../controllers/visualizations')
const authorizer = require('../middleware/authorizer')
let router = express.Router()

/* GET visualizations data */
router.get('/visualizations', async function (req, res, next) {
    try {
        let data = await getVisualizations()
        return res.status('200').json(data)
    } catch (e) {
        console.error(e)
        return res.status('500').json({ message: 'Im not working' })
    }
})

/* GET visualization x data */
router.get('/visualization', async function (req, res, next) {
    try {
        let data = await getVisualizationData(req.query.id)
        return res.status('200').json(data)
    } catch (e) {
        console.error(e)
        return res.status('500').json({ message: 'Im not working' })
    }
})

/* GET visualization x data */
router.post('/diy', authorizer, async function (req, res, next) {
    try {
        await addDIYVisualization(req.user.username, req.body.configuration)
        return res.status('200').json({ message: 'OK' })
    } catch (e) {
        console.error(e)
        return res.status('500').json({ message: 'Im not working' })
    }
})

module.exports = router
