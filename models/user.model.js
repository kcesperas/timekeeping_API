const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"]
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        uniqe: true,
        trim: true,
        match: [
             /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
             "please enter a valid email"
        ]
    },
    password: {
        type: String,
        required: [true, "please enter your password"],
        minLength: [6, "Password must be a minimum of 6 characters"],
        maxLength: [80, "Password must be a maximum of 20 characters"],
    },
    photo: {
        type: String,
        required: [true, "Please add photo"],
        default: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAH0AfQMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABAUBAwYCB//EADUQAAICAQIBCAgFBQAAAAAAAAABAgMEBREhEhMUMVFhksFBUlNxcoGhsSIyQmLRIyQzNEP/xAAWAQEBAQAAAAAAAAAAAAAAAAAAAQL/xAAWEQEBAQAAAAAAAAAAAAAAAAAAARH/2gAMAwEAAhEDEQA/APogANsgAAAAAAAAAAAAAAAABkDAAAAAAAAALDG0q22PKtkq12dbJa0fH24zsb95NVSbgtrtHSW9Fjb7JFZbVZTNwti4yRdHgABAAAAAAAAAAACz0fEU5dImk1F7RXf2lWzpsGvm8WqP7VuSq3gyDKsETUcVZNO6S5yPFPyJhhgcmDfmwVeXbFbJcrdbGg3qAACAAAAAAAAMSOqp41Qa9VHLF/pN6txIx/VX+F+RKqcADKhh9Rk82TjCEpye0Yrdgc/qjTz7Nu77EQ9XTdt07PWlueTUQABUAAAAAAAADfiZMsW5WR6uqS7UaAKrqaLoX1qdct0zYcpCc6nvXOUX3MkrU8vbbnF4UZxXQt7LdlJqudzr5mp71r8z9Yh25N1z/q2Sl3dSNSLIgACoAAAAAAAAGyiiy+fIqju/oj1iY8sm5QjwXW32I6LGx68etQrXvfpZLVQMfSIR43zc32LgiYsHFS2VEPmtyQDKtHQsb2FfhMdCxfYV+EkACP0LF9hX4TDwcV/8IfJbEkAQLNKxpL8HKg+5/wAlflaZdQuXB85Bdi4r5F+C6OSBa6tgqKeRStl+uK+5VGkAAEADZRBWX1wfVKaX1CrzSsbmMZSf57OL7iaEDCgAAAAAAAAAAw0mmmt0zmcuno+TOr0J8Pd6Dpyi1uO2ZGXbBfcsSq8AGkCRgLfNp+IjkjT/APdp+IVXSgAwoAAAAAAAAAABSa6v7iv4PMuym17/ACUvufkWCrABpH//2Q=="
    },
    phone: {
        type: String,
        default: "+63"
    },
    bio: {
        type: String,
        maxLength: [250, "bio characters must be a maximum of 250"],
        default: "bio"
    },
},

{
    timestamps: true,
}
);

    //encrypt password
    userSchema.pre("save", async function(next) {
        if(!this.isModified("password")) {
            return next()
        } 

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword
    })

const User = mongoose.model("User", userSchema);
module.exports = User;