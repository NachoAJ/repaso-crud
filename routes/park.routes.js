const express = require('express')
const router = express.Router()
const Park = require('../models/park.model')

router.get('/', (req, res, next) => {
	Park.find({})
		.then(allParks => res.render('parks/parks-index', { parks: allParks }))
		.catch(err => console.log('Ha habido un error: ', err))
})

router.get('/new', (req, res, next) => res.render('parks/new-park'))
router.post('/new', (req, res, next) => {
	const { name, description } = req.body

	Park.create({ name, description })
		.then(() => res.redirect('/parks'))
		.catch(err => console.log('Ha habido un error: ', err))
})

router.get('/:id', (req, res, next) => {
	const parkId = req.params.id
	Park.findById(parkId)
		.then(theWholePark => res.render('parks/park-details', { park: theWholePark }))
		.catch(err => console.log('Ha habido un error: ', err))
})

router.post('/:id/delete', (req, res, next) => {
	const parkId = req.params.id
	Park.findByIdAndRemove(parkId)
		.then(() => res.redirect('/parks'))
		.catch(err => console.log('Ha habido un error: ', err))
})

router.get('/:id/edit', (req, res, next) => {
	const parkId = req.params.id
	Park.findById(parkId)
		.then(theWholePark => res.render('parks/park-edit', { park: theWholePark }))
		.catch(err => console.log('Ha habido un error: ', err))
})

router.post('/:id/edit', (req, res, next) => {
	const parkId = req.params.id
	const { name, description } = req.body
	Park.findByIdAndUpdate(parkId, { $set: { name, description } })
		.then(() => res.redirect('/parks'))
		.catch(err => console.log('Ha habido un error: ', err))
})

module.exports = router
