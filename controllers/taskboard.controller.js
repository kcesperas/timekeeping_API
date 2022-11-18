 const asyncHandler = require("express-async-handler");
 const Taskboard = require("../models/Taskboard");

 


    //CREATE TASKBOARD INPUTboard
 const createTaskboard = asyncHandler ( async (req, res) => {
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
        assigned_to, 
        notes
    });


        if (taskboard) {
            const {_id, subject, content, status, assigned_to, notes} = taskboard
            res.status(201).json({
                _id, 
                subject, 
                content, 
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
          const {subject, content, status, assigned_to, notes} = taskboard
          taskboard.subject = req.body.subject || subject;
          taskboard.content = req.body.content || content;
          taskboard.status = req.body.status || status;
          taskboard.assigned_to = req.body.assigned_to || assigned_to;
          taskboard.notes = req.body.notes || notes;
      

          const updatedTaskboard = await taskboard.save()
            res.status(200).json({ 
                message: "Taskboard DATA UPDATED SUCCESFULLY",
                _id: updatedTaskboard._id,
                subject: updatedTaskboard.subject,
                content: updatedTaskboard.content,
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
    createTaskboard,
    getTaskboard,
    updateTaskboard,
    deleteTaskboard
}