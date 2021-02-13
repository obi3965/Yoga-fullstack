const lodash = require("lodash");
const formidable = require("formidable");
const Category = require('../models/category')
const fs = require('fs')

exports.create = async (req,res)=>{
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        }
        // check for all fields
        const { name } = fields;

        if (!name ) {
            return res.status(400).json({
                error: 'All fields are required'
            });
        }

        let cat =  new Category(fields);

        // 1kb = 1000
        // 1mb = 1000000

        if (files.photo) {
            // console.log("FILES PHOTO: ", files.photo);
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: 'Image should be less than 1mb in size'
                });
            }
            cat.photo.data = fs.readFileSync(files.photo.path);
            cat.photo.contentType = files.photo.type;
        }

        cat.save((err, result) => {
            if (err) {
                console.log('PRODUCT CREATE ERROR ', err);
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(result);
        });
    });
}


exports.categories = async(req,res) => {
   
    try {
     const categories = await Category.find()
      
     res.status(200).json(categories)  
    } catch (error) {
        res.status(500).json({
            error:error
        })
    }
    

}


//get the category By Id
exports.categoryById = async(req,res, next, id) => {
    try {
      const category = await Category.findById(id)
      
      req.category = category 
      
      next()
    } catch (error) {
        res.status(500).json({error:error})
    }
    


}

//read the category by id
exports.singleCategory = (req, res) => {
    return res.status(200).json(req.category);
  }



  //update the category
  exports.updateCategory =  (req,res) =>{
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
      if (err) {
        return res.status(400).json({
          error: "Image could not be uploaded",
        });
      }
  
      let category = req.category;
      category = lodash.extend(category, fields);
      if (files.photo) {
        category.photo.data = fs.readFileSync(files.photo.path);
        category.photo.contentType = files.photo.type;
      }
  
      category.save((err, result) => {
        if (err) {
          return res.status(400).json({
            error: 'category is not updated'
          });
        }
        res.json({
          result:result
        });
      });
    });
  }