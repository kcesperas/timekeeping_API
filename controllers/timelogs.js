 const asyncHandler = require("express-async-handler");
 const Timelogs = require("../models/Timelogs");

 


    //CREATE Timelogs INPUTboard
 const createTimelogs = asyncHandler ( async (req, res) => {
      const {_id, date, time_in, time_out, type, status, total_hours, notes} = req.body
      //validation
      if (!date || !time_in || !time_out || !type || !status ) {     
      res.status(400)
      throw new Error("Please fill out all required fields")
  }






    // CHECK IF timelog
    const timelogsExists = await Timelogs.findOne({_id})

    if(timelogsExists) {
        res.status(400)
        throw new Error("")
    }




                                  // CREATE Timelogs


    const timelogs = await Timelogs.create({
        date,
        time_in,
        time_out, 
        type,
        status,
        total_hours, 
        notes
    });


        if (timelogs) {
            const {_id, date, time_in, time_out, type, status, total_hours, notes} = timelogs
            res.status(201).json({
                _id, 
                date,
                time_in,
                time_out, 
                type,
                status,
                total_hours, 
                notes
        })
        }else {
            res.status(400)
            throw new Error("invalid data")
        }

 });





                            // GET TIMELOGS


    const getTimelogs = asyncHandler (async (req, res) => {
        try{
            let { id } = req.params;
      const timelogs = await Timelogs.findById(id);
      res.status(200).json({message: "Fetch Success", data: timelogs});
    } catch(err) {
        
        res.status(400).json({message: "Something went wronged!", errors: err});
    }

    });

      
    


                                     //UPDATE TIMELOGS


  const updateTimelogs = asyncHandler (async(req, res) => {
    let { id } = req.params;
      const timelogs = await Timelogs.findById(id);

        if (timelogs) {
          const {subject, content, status, assigned_to, notes} = timelogs
          timelogs.date = req.body.date || date;
          timelogs.time_in = req.body.time_in || time_in;
          timelogs.time_out = req.body.time_out || time_out;
          timelogs.type = req.body.type || type;
          timelogs.status = req.body.status || status;
          timelogs.total_hours = req.body.total_hours || total_hours;
          timelogs.notes = req.body.notes || notes;
      

          const updatedTimelogs = await timelogs.save()
            res.status(200).json({ 
                message: "Timelogs DATA UPDATED SUCCESFULLY",
                _id: updatedTimelogs._id,
                subject: updatedTimelogs.subject,
                content: updatedTimelogs.content,
                status: updatedTimelogs.status,
                assigned_to: updatedTimelogs.assigned_to, 
                notes: updatedTimelogs.notes

        })
        } else {
          res.status(404)
          throw new Error("Role not found")
        }
      

    
  });


                                    //DELETE ROLE


        const deleteTimelogs = asyncHandler (async(req, res) => {
        let { id } = req.params;
        let resp = await Timelogs.findByIdAndUpdate(id, { isDeleted: true });
        res.status(200)
        .json({message: "Timelogs DELETED SUCCESFULLY"})
     });


 module.exports = {
    createTimelogs,
    getTimelogs,
    updateTimelogs,
    deleteTimelogs
}