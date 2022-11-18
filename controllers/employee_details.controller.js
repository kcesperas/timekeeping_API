 const asyncHandler = require("express-async-handler");
 const Employee_details = require("../models/employee_details.model");

 


    //CREATE TASKBOARD INPUTboard
 const createEmplyee_details = asyncHandler ( async (req, res) => {
      const {_id, employee_name, employee_position, contact_number, assigned_email, address, date_hired, employment_period, employment_status, salary, notes} = req.body
      //validation
      if (!employee_name || !employee_position || !assigned_email || !contact_number|| !notes || !address || !date_hired || !employment_period) {     
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
        employee_name, 
        employee_position, 
        status, 
        assigned_to, 
        notes
    });


        if (taskboard) {
            const {_id, employee_name, employee_position, status, assigned_to, notes} = taskboard
            res.status(201).json({
                _id, 
                employee_name, 
                employee_position, 
                status, 
                assigned_to, 
                notes
        })
        }else {
            res.status(400)
            throw new Error("invalid data")
        }

 });





                            // GET ROLE


    const getTaskboard = asyncHandler (async (req, res) => {
        try{
            let { id } = req.params;
      const taskboard = await Taskboard.findById(id);
      res.status(200).json({message: "Fetch Success", data: taskboard});
    } catch(err) {
        
        res.status(400).json({message: "Something went wronged!", errors: err});
    }

    });

      
    


                                     //UPDATE ROLE


  const updateTaskboard = asyncHandler (async(req, res) => {
    let { id } = req.params;
      const taskboard = await Taskboard.findById(id);

        if (taskboard) {
          const {employee_name, employee_position, status, assigned_to, notes} = taskboard
          taskboard.employee_name = req.body.employee_name || employee_name;
          taskboard.employee_position = req.body.employee_position || employee_position;
          taskboard.status = req.body.status || status;
          taskboard.contact_number= req.body.contact_number|| assigned_to;
          taskboard.notes = req.body.notes || notes;
      

          const updatedTaskboard = await taskboard.save()
            res.status(200).json({ 
                message: "Taskboard DATA UPDATED SUCCESFULLY",
                _id: updatedTaskboard._id,
                employee_name: updatedTaskboard.employee_name,
                employee_position: updatedTaskboard.employee_position,
                status: updatedTaskboard.status,
                assigned_to: updatedTaskboard.assigned_to, 
                notes: updatedTaskboard.notes

        })
        } else {
          res.status(404)
          throw new Error("Role not found")
        }
      

    
  });


                                    //DELETE ROLE


        const deleteTaskboard = asyncHandler (async(req, res) => {
        let { id } = req.params;
        let resp = await Taskboard.findByIdAndUpdate(id, { isDeleted: true });
        res.status(200)
        .json({message: "TASKBOARD DELETED SUCCESFULLY"})
     });


 module.exports = {
    createEmployee_details,
    getEmployee_details,
    updateEmployee_details,
    deleteEmployee_details
}