
const alert = require('alert-node')
const express = require('express')
const gtts = require('gtts.js').gTTS
const bodyparser = require('body-parser')
var PORT = process.env.PORT || 5000;
const app = express()

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index')
})


app.post('/', (req, res) => {
    var text = req.body.text
    
    
    if (!text) {
        alert('Please enter text.')
    } else {
        const speech = new gtts(text)
        var filename = "Audio" + Date.now() + ".mp3"
        speech.save(filename)
            .then(function () {
                res.download(filename)
            }).catch(function (err) {

            })
    }
})

app.listen(PORT, function () {
    console.log("Server is listening on Port " + PORT)
})
