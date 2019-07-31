const express = require('express')
const router = express.Router()
const Park = require('../models/park.model')
const Coaster = require('../models/coaster.model')

router.get('/new', (req, res, next) => {
	Park.find({})
		.then(allParks => res.render('coasters/new-coaster', { parks: allParks }))
		.catch(err => console.log('Ha habido un error: ', err))
})
router.post('/new', (req, res, next) => {
	const { name, description, inversions, length, park_id } = req.body

	Coaster.create({ name, description, inversions, length, park_id })
		.then(() => res.redirect('/coasters'))
		.catch(err => console.log('Ha habido un error: ', err))
})

router.get('/', (req, res, next) => {
	Coaster.find({})
		.populate('park_id') //Pasas el nombre de la propiedad del modelo que quieres popular
		.then(allCoasters => res.render('coasters/coasters-index', { coasters: allCoasters }))
		.catch(err => console.log('Ha habido un error: ', err))
})

router.get('/:id', (req, res, next) => {
	const coasterId = req.params.id
	Coaster.findById(coasterId)
		.populate('park_id') //Pasas el nombre de la propiedad del modelo que quieres popular
		.then(theWholeCoaster => res.render('coasters/coaster-details', { coaster: theWholeCoaster }))
		.catch(err => console.log('Ha habido un error: ', err))
})

router.post('/:id/delete', (req, res, next) => {
	const coasterId = req.params.id
	Coaster.findByIdAndRemove(coasterId)
		.then(() => res.redirect('/coasters'))
		.catch(err => console.log('Ha habido un error: ', err))
})

router.get('/:id/edit', (req, res, next) => {
	const coasterId = req.params.id
	Coaster.findById(coasterId)
		.populate('park_id') //Pasas el nombre de la propiedad del modelo que quieres popular
		.then(theWholeCoaster => {
			Park.find({})
				.then(allParks => res.render('coasters/coaster-edit', { coaster: theWholeCoaster, parks: allParks }))
				.catch(err => console.log('Ha habido un error: ', err))
		})
		.catch(err => console.log('Ha habido un error: ', err))
})

router.post('/:id/edit', (req, res, next) => {
	const coasterId = req.params.id
	const { name, description, inversions, length, park_id } = req.body
	Coaster.findByIdAndUpdate(coasterId, { $set: { name, description, inversions, length, park_id } })
		.populate('park_id')
		.then(() => res.redirect('/coasters'))
		.catch(err => console.log('Ha habido un error: ', err))
})

module.exports = router
