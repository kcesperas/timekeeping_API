 const asyncHandler = require("express-async-handler");
 const Role = require("../models/role.model");
 const jwt = require("jsonwebtoken");
 
 
 const Token = require("../models/token.model");
 const crypto = require("crypto");

 const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "1d"})
 }

    //create ROLE

 const createRole = asyncHandler ( async (req, res) => {
      const {_id, name, notes} = req.body
      //validation
      if (!name ||!notes) {     
      res.status(400)
      throw new Error("Please fill out all required fields")
  }






    // CHECK IF ROLE EXISTS
    const roleExists = await Role.findOne({_id})

    if(roleExists) {
        res.status(400)
        throw new Error("")
    }




                                  // CREATE ROLE


    const role = await Role.create({
        name,
        notes
    });;

    // GENERATE TOKEN
    const token = generateToken(role._id)

    // SEND HTTP COOKIE
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400), //1 day
      sameSite: "none",
      secure: true
    })

        if (role) {
            const {_id, name, notes} = role
            res.status(201).json({
                _id, 
                name,
                notes,
                token
        })
        }else {
            res.status(400)
            throw new Error("invalid data")
        }

 });





                            // GET ROLE


    const getRole = asyncHandler (async (req, res) => {
        try{
            let { id } = req.params;
      const role = await Role.findById(id);
      res.status(200).json({message: "Fetch Success", data: role});
    } catch(err) {
        
        res.status(400).json({message: "Something went wronged!", errors: err});
    }

    });

      
    


                                     //UPDATE ROLE


  const updateRole = asyncHandler (async(req, res) => {
    let { id } = req.params;
      const role = await Role.findById(id);

        if (role) {
          const {name, notes} = role;
          role.name = req.body.name || name;
          role.notes = req.body.notes || notes;
      

          const updatedRole = await role.save()
            res.status(200).json({ 
                message: "ROLE DATA UPDATED SUCCESFULLY",
                _id: updatedRole._id,
                name: updatedRole.name, 
                notes: updatedRole.notes

        })
        } else {
          res.status(404)
          throw new Error("Role not found")
        }
      

    
  });


                                    //DELETE ROLE


        const deleteRole = asyncHandler (async(req, res) => {
        let { id } = req.params;
        let resp = await Role.findByIdAndUpdate(id, { isDeleted: true });
        res.status(200)
        .json({message: "ROLE DELETED SUCCESFULLY"})
     });


 module.exports = {
    createRole,
    getRole,
    updateRole,
    deleteRole
}