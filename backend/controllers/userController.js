import userModel from "../model/userModel.js";
import bcrypt from "bcrypt";
import { createToken } from "../lib/auth.js";

// POST / REGISTER

export async function createUserController(req, res) {
   try {
      const saltRound = 12;
      const salt = await bcrypt.genSalt(saltRound);
      const hashedSaltedPassword = await bcrypt.hash(req.body.password, salt);
      req.body.password = hashedSaltedPassword;

      const newUser = userModel(req.body);
      const savedUser = await newUser.save();
      res.status(200).json(savedUser);
   } catch (error) {
      res.json(error);
   }
}

// LOGIN
export async function loginUserController(req, res) {
   try {
      const user = await userModel.findOne({ email: req.body.email });
      console.log({ user });
      if (user) {
         const isMatch = await bcrypt.compare(req.body.password, user.password);
         if (isMatch) {
            // return res.status(200).cookie("kundennummer", user.customerId, { httpOnly: true, maxAge: 10000, secure: true }).send(user);
            const token = await createToken({customerId:user.customerId, userId:user._id});
            return res.status(200).cookie("jwt", token, {httpOnly:true, sameSite:"lax"}).send({msg:"Anmeldung erfolgreich"});
            // return res.status(200).json({msg: "Anmeldung erfolgreich", token});
         }
         throw new Error("Zugriff verweigert! Die Anmeldedaten sind falsch.");
      }
      res.status(400).json("Benutzer nicht gefunden!");
   } catch (error) {
      res.status(400).json(error);
   }
}

// GET SOME MONEY
export async function chargeOffController(req, res) {
   try {
      const response = await userModel.findOneAndUpdate({customerId:req.user.customerId},{balance:+req.body.balance});
      console.log(response);
      // console.log("userId", req.user.userId, req.user.customerId);
      res.status(200).json({ msg: "Geld wurde erfolgreich abgebucht!" });
   } catch (error) {
      res.json(error);
   }
}

// POST SOME MONEY
export async function payInController(req, res) {
   try {
      const response = await userModel.findOneAndUpdate({customerId:req.user.customerId},{balance:+req.body.balance});
      // console.log(response);
      // console.log("userId", req.user.userId, req.user.customerId);
      res.status(200).json({ msg: "Geld wurde erfolgreich eingezahlt!" });
   } catch (error) {
      res.json(error);
   }
}

// GET USER DATA
export async function getUserDataController(req, res) {
   try {
      const allUsers = await userModel.findOne({customerId:req.user.customerId});
      console.log(allUsers);
      res.status(200).json(allUsers);
   } catch (error) {
      res.json(error);
   }
}

// GET ALL TASKS
export async function getAllUsersController(req, res) {
   try {
      const allUsers = await userModel.find();
      console.log(allUsers);
      res.status(200).json(allUsers);
   } catch (error) {
      res.json(error);
   }
}

// DELETE ALL TASKS

export async function deleteAllUsersController(req, res) {
   try {
      await userModel.deleteMany({});
      res.status(200).json("Alle user wurden gelöscht!");
   } catch (error) {
      res.json(error);
   }
}
