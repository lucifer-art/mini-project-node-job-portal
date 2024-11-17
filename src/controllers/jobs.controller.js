import {
  getJobs,
  getJobById,
  addJob,
  deleteJob,
  updateJob,
} from "../models/jobs.model.js";

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
      resumePath: req.file.path,
    };
    console.log("fyygf", applicant);
    if (!job) {
      return res.status(404).send("Job not found");
    }
    job.applicants.push(applicant);
    return res.status(201).redirect("/jobs");
  }
}
