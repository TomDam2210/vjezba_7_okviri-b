const mongoose = require('mongoose')

const password = process.env.ATLAS_PASS
console.log(password)
const dbname = 'poruke2021'
const url = `mongodb+srv://tomod:${password}@cluster0.dkf4b.mongodb.net/${dbname}?retryWrites=true&w=majority`

const porukaSchema = new mongoose.Schema({
  sadrzaj: String,
  datum: Date,
  vazno: Boolean
})

porukaSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.id = doc._id.toString()
        delete ret._id
        delete ret.__v
        return ret
    }
})

const Poruka = mongoose.model('Poruka', porukaSchema, 'Poruke')

console.log("Spajamo se na bazu") 

mongoose.connect(url)  
    .then(result => {
        console.log("Spojeni smo na bazu");
    })  
    .catch(error => {
        console.log("Greška pri spajanju", error.message);
    })

module.exports = Poruka;
