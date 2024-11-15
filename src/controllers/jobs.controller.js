import { getJobs, getJobById } from '../models/jobs.model.js';

export default class Jobs {
    getJobsPage(req, res, next) {
        return res.render('jobs', {jobs: getJobs()})
    }

    getJob(req, res, next) {
        const jobId = parseInt(req.params.jobId);
        const job = getJobById(jobId);
        if(!job) {
            return res.status(404).send('Job not found');
        }
        return res.render('job', {job});
    }

    addApplicant(req, res, next) {
        const jobId = parseInt(req.params.jobId);
        const job = getJobById(jobId);
        const applicant = {
            name: req.body.name,
            email: req.body.email,
            contact: req.body.contact,
            resumePath: req.file.path
        }
        if(!job) {
            return res.status(404).send('Job not found');
        }
        job.applicants.push(req.body);
        return res.status(201).redirect('/jobs');
    }
}