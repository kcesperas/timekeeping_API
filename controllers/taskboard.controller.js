 const asyncHandler = require("express-async-handler");
 const Taskboard = require("../models/taskboard.model");

 


    //CREATE TASKBOARD INPUTboard
 const createTask = asyncHandler ( async (req, res) => {
      const {_id, subject, content, status, start_date, end_date, assigned_to, notes} = req.body
      //validation
      if (!subject || !content || !status || !assigned_to || !notes) {     
      res.status(400)
      throw new Error("Please fill out all required fields")
  }






    // CHECK IF ROLE EXISTS
    const taskboardExists = await Taskboard.findOne({_id})

    if(taskboardExists) {
        res.status(400)
        throw new Error("")
    }




                                  // CREATE TASKBOARD


    const taskboard = await Taskboard.create({
        subject, 
        content, 
        status, 
        start_date, 
        end_date, 
        assigned_to, 
        notes
    });;



        if (taskboard) {
            const {_id, subject, content, status, start_date, end_date, assigned_to, notes} = taskboard
            res.status(201).json({
                _id, 
                subject, 
                content, 
                status, 
                start_date, 
                end_date, 
                assigned_to, 
                notes
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