import mongoose from 'mongoose'

// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema


	
const skillSchema = new Schema({
  title: String,
  yearsExp: Number,
  level: String,
  reference: [String],
  learnedFromGA: Boolean,

})

const Skill = mongoose.model('Skill', skillSchema)

export {
  Skill
}