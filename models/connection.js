var mongoose = require('mongoose');

var options = {
    connectTimeoutMS: 5000,
    useUnifiedTopology: true,
    useNewUrlParser: true,
}

mongoose.connect('mongodb+srv://Clabb:Clarouche@cluster0.agzxd.mongodb.net/weatherapp?retryWrites=true&w=majority',
    options,
        function(err){
            console.log(err);
        }
)

module.exports = mongoose