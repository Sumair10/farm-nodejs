const fs = require('fs');
const Tour = require('../models/tourModel');   



exports.getAllTours = async (req , res)=>{
    try {

        const queryObj = {...req.query}
        const excludedParams = ['page', 'sort' , 'limit' , 'fields']

        excludedParams.forEach(element => delete queryObj[element]);

        let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g , match => `$${match}`)





        const query = Tour.find(JSON.parse(queryStr))

        // const query = Tour.find()
        // .where('duration')
        // .equals(5)
        // .where('difficulty')
        // .equals('easy')

        const tours = await query

        res.status(200).json({
            status : 'success',
            results : tours.length,
            data :{tours}
        })
    } catch (error) {
        res.status(400).json({
            status :'fail',
            message :"Invalid data received!"
        })
    }
   
}
exports.getSingleTour =async (req , res)=>{
    try {
        const tour = await Tour.findById(req.params.id)

        res.status(200).json({
            status : 'success',
            data :{tour}
        })
    } catch (error) {
        res.status(400).json({
            status :'fail',
            message :"Invalid data received!"
        })
    }
}

exports.createNewTour = async (req, res)=>{

    try {
        // console.log(req.body)
        const newTour = await Tour.create(req.body);

        res.status(201).json({
            status :'success',
            data : { 
                tour : newTour
            }
        })
    } catch (error) {
        res.status(400).json({
            status :'fail',
            message :error
        })
    }
   
}

exports.updateTour = async(req, res) =>{
    try {
        const tour = await Tour.findByIdAndUpdate(req.params.id ,  req.body , {
            new : true,
            runValidators : true
        });

        res.status(201).json({
            status :'success',
            data : {
                tour
            }
        })
    } catch (error) {
        res.status(400).json({
            status :'fail',
            message :"Something went wrong!"
        })
    }
}

exports.deleteTour =async (req, res) =>{
    try {
        const tour = await Tour.findByIdAndDelete(req.params.id);
        if(!tour){
            return res.status(400).json({
                status :'fail',
                message :"No record found for tour"
            })
        }
        res.status(200).json({
            status : 'success',
            message :"Delete successfully"
        })

    } catch (error) {
        res.status(400).json({
            status :'fail',
            message :"Something went wrong!"
        })
    }
        
}