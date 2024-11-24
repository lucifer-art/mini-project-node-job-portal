import { body, validationResult } from "express-validator";
import { getJobById } from "./../models/jobs.model.js";

export let errorMessage = '';

const validateRequest = async (req, res, next) => {
  // 1. Setup rules for validation.
  const rules = [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").notEmpty().withMessage("Email is required"),
    body("contact").isLength({ min: 10, max: 10 }).withMessage('Phone number must be exactly 10 characters long'),
    body("resume").custom((value, { req }) => {
      if (!req.file) {
        throw new Error("Resume is required");
      }
      if (req.file.mimetype!== "application/pdf") {
        throw new Error("Resume must be in PDF format");
      }
      return true;
    }),
  ];
  console.log("sdfwefvwew", req.body, req.file);
  // 2. run those rules.
  await Promise.all(rules.map((rule) => rule.run(req)));

  // 3. check if there are any errors after running the rules.
  var validationErrors = validationResult(req);
  // 4. if errros, return the error message
  if (!validationErrors.isEmpty()) {
    const jobId = parseInt(req.params.jobId);
    const job = getJobById(jobId);
    if (!job) {
      return res.status(404).send("Job not found");
    }
    // console.log("sbwwefw", validationErrors, validationErrors.array());
    const formData = {
      name: req.body.name,
      email: req.body.email,
      contact: req.body.contact,
      resume: req.file,
    }
    return res.render("job", {
      job,
      formData: formData,
      showModal: true,
      userEmail: req.session.userEmail,
      userName: req.session.userName,
      errorMessage: validationErrors.array()[0].msg
    });
    // errorMessage = validationErrors.array()[0].msg;
    // return res.status(403).send(validationErrors.array()[0].msg);
  }
  next();
};

export default validateRequest;
