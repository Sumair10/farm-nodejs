const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const Tour = require('../../models/tourModel')

dotenv.config({path : './config.env'})

mongoose.connect(process.env.MONGODB_URI , {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(con =>{
  console.log("Connected to MongoDB")
})

// reaf json file
const tours =JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json` , 'utf-8'))

// import data into database
const importData = async () => {
    try {
        await Tour.create(tours)
        console.log('Successfully created');
    } catch (error) {
        console.log(error)
    }
    process.exit()
}

//delette all data 

const deleteAll = async () => {
    try {
        await Tour.deleteMany()
        console.log('Successfully deleted');
    } catch (error) {
        console.log(error)
    }
    process.exit()
}

if(process.argv[2] === '--import'){
    importData()
}
else if (process.argv[2] === '--delete'){
    deleteAll()

}
else{
    console.log('Error: Unknown')
}