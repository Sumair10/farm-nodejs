const fs = require('fs');
const Tour = require('../models/tourModel');   



exports.getAllTours = async (req , res)=>{
    try {

        const queryObj = {...req.query}
        const excludedParams = ['page', 'sort' , 'limit' , 'fields']

        excludedParams.forEach(element => delete queryObj[element]);

        let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g , match => `$${match}`)


        console.log(req.query)

        
        let query = Tour.find(JSON.parse(queryStr))

        if(req.query.sort){
            const sortBy = req.query.sort.split(',').join(' ')
            query= query.sort(sortBy )
        }
        else{
            query = query.sort('createdAt')
        }

        if(req.query.fields){
            const fields = req.query.fields.split(',').join(' ')
            console.log(fields)
            query = query.select(fields)
        }
        else{
            query = query.select('-__v')
        }

        const page = req.query.page * 1 || 1;
        const limit = req.query.limit * 1 || 100;
        const skip = (page - 1) * limit;
        
        query = query.skip(skip).limit(limit);
        
        if (req.query.page) {
            const numTours = await Tour.countDocuments();
            if (skip >= numTours) {
                throw new Error("This page doesn't exist");
            }
        }

        const tours = await query

        res.status(200).json({
            status : 'success',
            results : tours.length,
            data :{tours}
        })
    } catch (error) {
        console.log(error)
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