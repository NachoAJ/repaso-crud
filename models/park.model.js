const mongoose = require('mongoose')
const Schema = mongoose.Schema

const parkSchema = new Schema(
	{
		name: String,
		description: String,
		active: Boolean
	},
	{ timestamps: true }
)

const Park = mongoose.model('Park', parkSchema)

module.exports = Park
