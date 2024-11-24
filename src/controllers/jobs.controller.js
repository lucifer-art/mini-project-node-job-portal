import { errorMessage } from "../middlewares/validation.middleware.js";
import {
  getJobs,
  getJobById,
  addJob,
  deleteJob,
  updateJob,
} from "../models/jobs.model.js";
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'shivangfuture@gmail.com',
    pass: 'ynrtbzyztvlpvnho',
  },
})

export default class Jobs {
  getJobsPage(req, res, next) {
    return res.render("jobs", {
      jobs: getJobs(),
      userEmail: req.session.userEmail,
      userName: req.session.userName,
    });
  }

  getNewJobs(req, res, next) {
    if (req.session.userEmail) {
      return res.render("modifiyJob", {
        userEmail: req.session.userEmail,
        userName: req.session.userName,
      });
    } else {
      return res.redirect("/login");
    }
  }

  getJob(req, res, next) {
    const jobId = parseInt(req.params.jobId);
    const job = getJobById(jobId);
    if (!job) {
      return res.status(404).send("Job not found");
    }
    return res.render("job", {
      job,
      userEmail: req.session.userEmail,
      userName: req.session.userName,
      errorMessage: '',
      formData: {},
      showModal: false
    });
  }

  addJob(req, res, next) {
    addJob(req.body);
    return res.status(201).redirect("/jobs");
  }

  updateJobByIdPage(req, res, next) {
    const jobId = req.params.jobId;
    const job = getJobById(Number(jobId));
    return res.render("updateJob", {
      job,
      userEmail: req.session.userEmail,
      userName: req.session.userName,
    });
  }

  updateJobById(req, res, next) {
    const jobId = Number(req.params.jobId);
    updateJob(jobId, req.body);
    return res.status(201).redirect("/jobs");
  }

  deleteJobById(req, res, next) {
    const jobId = parseInt(req.params.jobId);
    deleteJob(jobId);
    return res.status(201).redirect("/jobs");
  }

  getApplicant(req, res, next) {
    const jobId = parseInt(req.params.jobId);
    const job = getJobById(jobId);
    if (!job) {
      return res.status(404).send("Job not found");
    }
    return res.render("applicants", {job, userEmail: req.session.userEmail, userName: req.session.userName,
    });
  }

  addApplicant(req, res, next) {
    const jobId = parseInt(req.params.jobId);
    const job = getJobById(jobId);
    const applicant = {
      applicantid: new Date().getTime(),
      name: req.body.name,
      email: req.body.email,
      contact: req.body.contact,
      resumePath: req.body.file,
    };
    if (!job) {
      return res.status(404).send("Job not found");
    }
    const mailOptions = {
      from: 'shivangfuture@gmail.com',
      to: req.body.email,
      subject: 'Confirmation for job on Job Search',
      text: 'Congratulations! Your application has been sent to recruiter successfully.'
    }
    transporter.sendMail(mailOptions, (err, data) => {
      if (err) {
        console.log('Error occurred while sending mail:', err);
      } else {
        console.log('Mail sent successfully:', data.response);
      }
    })
    job.applicants.push(applicant);
    return res.status(201).redirect("/jobs");
  }
}
