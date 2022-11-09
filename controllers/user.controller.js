 const asyncHandler = require("express-async-handler")
 const User = require("../models/user.model")
 const bcrypt = require("bcrypt")
 const jwt = require("jsonwebtoken")
 

 const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "1d"})
 }


 const registerUser = asyncHandler ( async (req, res) => {
      const {name, email, password} = req.body
      //validation
      if (!name || !email || !password) {     
      res.status(400)
      throw new Error("Please fill in all required fields")
  }
  if (password.length < 6) {
      res.status(400)
      throw new Error("Password must be a minimum of 6 characters")
  }





    // CHECK IF USER EXISTS
    const userExists = await User.findOne({email})

    if(userExists) {
        res.status(400)
        throw new Error("duplicate email")
    }




    // CREATE USER
    const user = await User.create({
        name,
        email, 
        password
    });;


    // GENERATE TOKEN
    const token = generateToken(user._id)

        if (user) {
            const {_id, name, email, photo, phone, bio} = user
            res.status(201).json({
                _id, 
                name, 
                email, 
                photo, 
                phone, 
                bio,
                token,
        })
        }else {
            res.status(400)
            throw new Error("invalid data")
        }

 });


  const isPasswordLength = (string, val) => {
        if (String(string).length < val ) return true;
        else return false;
    };





    //LOGIN DATA VALIDATION
  const validateLoginData = (data) => {
    let errors = {};
  
  

    if (isPasswordLength(data.password, 8)) errors.password = 'Password must be 8 characters';
    
  
  
    return {
      errors,
      valid: Object.keys(errors).length === 0 ? true : false
    };
  };    
  
    //USER DATA VALIDATION
const validateUserData = (data) => {
  let errors = {};

  if (isEmpty(data.email_address)) errors.email_address = 'email must not be empty';

  if (isEmpty(data.password)) errors.password = 'password must not be empty';
        
  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false
  };
};



  const loginUser = asyncHandler ( async (req, res) => {

  let { valid, errors } = validateLoginData(req.body);
  if(!valid) return res.status(404).json({ message: { text: 'Something went wrong!', type: 'error' }, errors });

   User.findOne({
    username: req.body.email
  })
   
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!user) {
        return res.status(404).send({ message: { text: "User Not found.", type: 'warning'} });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: { text: "Invalid Password!", type: 'error'}
        });
      }
      var jwt = ({ id: user.id }, process.env.JWT_TOKEN, {
        expiresIn: "1d"
      });

      res.status(200).send({
        id: user._id,
        name: user.name,
        email_address: user.email,
        accessToken: jwt,
        photo: user.photo,
        phone: user.phone,
        bio: user.bio
      });
    });
});

  



 module.exports = {
    registerUser,
    loginUser
}