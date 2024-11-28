const router = require('express').Router();
const {
    employeeAuth,
    employeeLogin,
    checkRole,
    employeeSignup,
    jwtauth
  } = require("../Controller/authFunctions");

router.post("/register-se", (req, res) => {
    employeeSignup(req.body, "se", res);
 });
 

 router.post("/register-marketer", async (req, res) => {
   await employeeSignup(req.body, "marketer", res);
 });
 

 router.post("/register-hr", async (req, res) => {
   await employeeSignup(req.body, "hr", res);
 });
 
 

 router.post("/Login-se", async (req, res) => {
   await employeeLogin(req.body, "se", res);
 });
 

 router.post("/Login-hr", async (req, res) => {
   await employeeLogin(req.body, "hr", res);
 });
 

 router.post("/Login-marketer", async (req, res) => {
   await employeeLogin(req.body, "marketer", res);
 });
 

 router.get(
   "/se-protected",
   employeeAuth,
   checkRole(["se"]),
   async (req, res) => {
     return res.json(`welcome ${req.body.name}`);
   }
 );
 
 

 router.get(
   "/marketers-protected",
   employeeAuth,
   checkRole(["marketer"]),
   async (req, res) => {
     return res.json(`welcome ${req.body.name}`);
   }
 );
 
 

 router.get(
   "/hr-protected",
   employeeAuth,
   checkRole(["hr"]),
   async (req, res) => {
     return res.json(`welcome ${req.body.name}`);
   }
 );
 
 router.post("/protected", jwtauth, (req, res) => {
   res.status(200).send("Here's the info you requested ");
 });

 module.exports = router;