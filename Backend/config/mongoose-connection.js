const mongoose = require('mongoose');




mongoose.connect(`mongodb://localhost:27017/Hackathon`,({
    useNewUrlParser:true,
    useUnifiedTopology:true
})).then(()=>{console.log("The database is connected")})
   .catch(()=>{console.log("There is a problem in connecting")});


module.exports = mongoose.connection;
