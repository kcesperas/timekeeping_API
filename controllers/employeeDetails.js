 const asyncHandler = require("express-async-handler");
 const EmployeeDetails = require("../models/EmployeeDetails");

 


    //CREATE EMPLOYEE DETAIL INPUTboard
 const createEmployeeDetails = asyncHandler ( async (req, res) => {
      const {_id, employee_name, employee_position, contact_number, assigned_email, address, date_hired, employment_period, employment_status, salary, notes} = req.body
      //validation
      if (!employee_name || !employee_position || !assigned_email || !contact_number|| !notes || !address || !date_hired || !employment_period) {     
      res.status(400)
      throw new Error("Please fill out all required fields")
  }






    // CHECK IF EMPLOYEE DETAILS EXISTS
    const employeeDetailsExists = await EmployeeDetails.findOne({_id})

    if(employeeDetaisExists) {
        res.status(400)
        throw new Error("")
    }




                                  // CREATE EMPLOYEE DETAILS


    const employeeDetails = await EmployeeDetails.create({
        employee_name, 
        employee_position, 
        contact_number, 
        assigned_email,
        address,
        date_hired,
        employment_period,
        employment_status,
        salary, 
        notes
    });


        if (employeeDetails) {
            const {_id, employee_name, employee_position, contact_number, assigned_email, address, date_hired, employment_period, employment_status, salary, notes} = employeeDetails
            res.status(201).json({
        _id,      
        employee_name, 
        employee_position, 
        contact_number, 
        assigned_email,
        address,
        date_hired,
        employment_period,
        employment_status,
        salary, 
        notes
        })
        }else {
            res.status(400)
            throw new Error("invalid data")
        }

 });





                            // GET ROLE


    const getEmployeeDetails = asyncHandler (async (req, res) => {
        try{
            let { id } = req.params;
      const taskboard = await EmployeeDetails.findById(id);
      res.status(200).json({message: "Fetch Success", data: taskboard});
    } catch(err) {
        
        res.status(400).json({message: "Something went wronged!", errors: err});
    }

    });

      
    


                                     //UPDATE EMPLOYEE DETAILS


  const updateEmployeeDetails = asyncHandler (async(req, res) => {
    let { id } = req.params;
      const employeeDetails = await EmployeeDetails.findById(id);

        if (employeeDetails) {
          const {employee_name, employee_position, contact_number, assigned_email, address, date_hired, employment_period, employment_status, salary, notes} = employeeDetails
          employeeDetails.employee_name = req.body.employee_name || employee_name;
          employeeDetails.employee_position = req.body.employee_position || employee_position;
          employeeDetails.assigned_email = req.body.assigned_email || assigned_email;
          employeeDetails.contact_number= req.body.contact_number|| contact_number;
          employeeDetails.address= req.body.address|| address;
          employeeDetails.date_hired= req.body.date_hired|| date_hired;
          employeeDetails.employment_period= req.body.employment_period|| employment_period;
          employeeDetails.employment_status= req.body.employment_status|| employment_status;
          employeeDetails.salary= req.body.salary|| salary;
          employeeDetails.notes = req.body.notes || notes;
      

          const updatedEmployeeDetails = await employeeDetails.save()
            res.status(200).json({ 
                message: "EmployeeDetails DATA UPDATED SUCCESFULLY",
                _id: updatedEmployeeDetails._id,
                employee_name: updatedEmployeeDetails.employee_name,
                employee_position: updatedEmployeeDetails.employee_position,
                contact_number: updatedEmployeeDetails.contact_number,
                assigned_email: updatedEmployeeDetails.assigned_email, 
                address: updatedEmployeeDetails.address,
                date_hired: updatedEmployeeDetails.date_hired,
                employment_period: updatedEmployeeDetails.employment_period,
                employment_status: updatedEmployeeDetails.employment_status,
                salary: updatedEmployeeDetails.salary,
                notes: updatedEmployeeDetails.notes

        })
        } else {
          res.status(404)
          throw new Error("EmployeeDetails not found")
        }
      

    
  });


                                    //DELETE ROLE


        const deleteEmployeeDetails = asyncHandler (async(req, res) => {
        let { id } = req.params;
        let resp = await EmployeeDetails.findByIdAndUpdate(id, { isDeleted: true });
        res.status(200)
        .json({message: "EmployeeDetails DELETED SUCCESFULLY"})
     });


 module.exports = {
    createEmployeeDetails,
    getEmployeeDetails,
    updateEmployeeDetails,
    deleteEmployeeDetails
}