const { UserS, Criminal } = require("./modal"); // Import models
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

// Function to get all crime data
const getdata = async (req, res) => {
  try {
    const data = await Criminal.find(); // Fetch all criminal data
    res.send(data);
  } catch (error) {
    res.send(error);
  }
};

// Function to add new crime data
const adddata = async (req, res) => {
  const { SrNo, UniqueNo, FName, LName, Crime, Gender, Age, Group } = req.body;

  try {
    // Create new criminal data
    const data = new Criminal({
      SrNo,
      UniqueNo,
      FName,
      LName,
      Crime,
      Gender,
      Age,
      Group,
    });
    const response = await data.save(); // Save the new data to the database

    res.send(response);
  } catch (error) {
    res.send(error);
  }
};

// Function to get crime data by ID
const getdatabyid = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Criminal.find({ _id: id }); // Find crime data by its ID
    res.send(data);
  } catch (err) {
    res.send(err);
  }
};

// Function to delete crime data by ID
const deletedatabyid = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Criminal.findByIdAndDelete({ _id: id }); // Delete data by ID
    res.send("Deleted Successfully");
  } catch (err) {
    res.send(err);
  }
};

// Function to update crime data by ID
const updatedatabyid = async (req, res) => {
  const { id } = req.params;
  const { SrNo, UniqueNo, FName, LName, Crime, Gender, Age, Group } = req.body;
  try {
    const data = await Criminal.findByIdAndUpdate(
      { _id: id }, // Find by ID and update fields
      {
        SrNo,
        UniqueNo,
        FName,
        LName,
        Crime,
        Gender,
        Age,
        Group,
      }
    );
    res.send(data);
  } catch (err) {
    res.send(err);
  }
};

// Function to handle user login
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserS.findOne({ email }); // Find user by email
    if (!user) {
      return res.status(400).json({ msg: "Invalid email" });
    }

    const isMatch = await bcrypt.compare(password, user.password); // Compare passwords
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid password" });
    }

    const token = jwt.sign(
      { userId: user._id }, // Generate JWT token
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token, message: "Login successful" }); // Send the token in response
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// Function to handle user registration
const register = async (req, res) => {
  const { fname, monumber, email, password } = req.body;
  try {
    let user = await UserS.findOne({ email }); // Check if user already exists
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10); // Generate salt for hashing
    const hashedPassword = await bcrypt.hash(password, salt); // Hash password

    user = new UserS({
      fname,
      monumber,
      email,
      password: hashedPassword,
    });

    await user.save(); // Save the new user to the database
    res.json({ msg: "User Registered Successfully", user });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  getdata,
  adddata,
  getdatabyid,
  deletedatabyid,
  updatedatabyid,
  login,
  register,
};












// const Crimee = require("./modal");
// const UserS = require("./modal")

// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
// require("dotenv").config();

// const getdata = async (req, res) => {
//   try {
//     const data = await Crimee.find();
//     res.send(data);
//   } catch (error) {
//     res.send(error);
//   }
// };

// const adddata = async (req, res) => {
//   const { SrNo, UniqueNo, FName, LName, Crime, Gender, Age, Group } = req.body;

//   try {
//     const data = new Crimee({
//       SrNo,
//       UniqueNo,
//       FName,
//       LName,
//       Crime,
//       Gender,
//       Age,
//       Group,
//     });
//     const response = await data.save();

//     res.send(response);
//   } catch (error) {
//     res.send(error);
//   }
// };

// const getdatabyid = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const data = await Crimee.find({ _id: id });
//     res.send(data);
//   } catch (err) {
//     res.send(err);
//   }
// };

// const deletedatabyid = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const data = await Crimee.findByIdAndDelete({ _id: id });
//     res.send("Deleted Successfully");
//   } catch (err) {
//     res.send(err);
//   }
// };

// const updatedatabyid = async (req, res) => {
//   const { id } = req.params;
//   const { SrNo, UniqueNo, FName, LName, Crime, Gender, Age, Group } = req.body;
//   try {
//     const data = await Crimee.findByIdAndUpdate(
//       { _id: id },
//       {
//         SrNo: SrNo,
//         UniqueNo: UniqueNo,
//         FName: FName,
//         LName: LName,
//         Crime: Crime,
//         Gender: Gender,
//         Age: Age,
//         Group: Group,
//       }
//     );
//     res.send(data);
//   } catch (err) {
//     res.send(err);
//   }
// };

// // const login = async(req,res) =>{
// //   const {email,password} = req.body;

// //   try{
// //     let Crime = await Crimee.findOne({email})
// //     if(!Crime) {
// //       return res.status(400).json({msg:"invalid email"})
// //     }
// //     const isMatch = await bcrypt.compare(password,Crime.password);
// //     if(!isMatch) {
// //       return res.status(400).json({msg:"invalid password"})
// //     }
// //     const token = jwt.sign(
// //       {CrimeId : Crime_id},
// //       process.env.JWT_SECRET,
// //       {expiresIn:'1h'}
// //     )
// //     res.json({token})
// //   }
// //   catch(error){
// //     console.error(error.message)
// //     res.status(500).send("server Error")
// //   }
// // }

// const login = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await UserS.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ msg: "Invalid email" });
//     }
    
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ msg: "Invalid password" });
//     }

//     const token = jwt.sign(
//       { userId: user._id }, // Corrected _id reference
//       process.env.JWT_SECRET,
//       { expiresIn: "1h" }
//     );

//     res.json({ token, message: "Login successful" });
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send("Server Error");
//   }
// };

// // const register = async(req, res) => {
// //   const { fname, monumber, email, password } = req.body;

// //   try {
// //     let Crime = await Crimee.findOne({ email });
// //     if (Crime) {
// //       return res.status(400).json({ msg: "User already exists" });
// //     }

// //     const salt = await bcrypt.genSalt(10);
// //     const hashedPassword = await bcrypt.hash(password, salt);

// //     Crime = new Crimee({
// //       fname,
// //       monumber,
// //       email,
// //       password: hashedPassword,
// //     });

// //     await Crime.save();
// //     res.json({ msg: "User Registered Successfully", Crime });
// //   } catch (error) {
// //     console.error(error.message);
// //     res.status(500).send("Server Error");
// //   }
// // };

// const register = async (req, res) => {
//   const { fname, monumber, email, password } = req.body;
//   try {
//     let user = await UserS.findOne({ email });
//     if (user) {
//       return res.status(400).json({ msg: "User already exists" });
//     }

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     user = new User({
//       fname,
//       monumber,
//       email,
//       password: hashedPassword,
//     });

//     await user.save();
//     res.json({ msg: "User Registered Successfully", user });
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send("Server Error");
//   }
// };

// module.exports = {
//   getdata,
//   adddata,
//   getdatabyid,
//   deletedatabyid,
//   updatedatabyid,
//   login,
//   register,
// };


// const Crimee = require("./modal");

// const getdata = async (req, res) => {
//   try {
//     const data = await Crimee.find();
//     res.send(data);
//   } catch (error) {
//     res.send(error);
//   }
// };

// const adddata = async (req, res) => {
//   const { SrNo, uniqueno, FName, LName, Crime, Gender, Age } = req.body;

//   if (!uniqueno) {
//     return res.send("Unique number is a required field.");
//   }

//   try {
//     const alreadyexist = await Crimee.findOne({ uniqueno });

//     if (alreadyexist) {
//       return res.send("Unique number already exists.");
//     }

//     const data = new Crimee({ srno, uniqueno, FName, LName, Crime, Gender, Age });
//     const response = await data.save();

//     res.send(response);
//   } catch (error) {
//     res.send(error);
//   }
// };

// module.exports = { getdata, adddata };
