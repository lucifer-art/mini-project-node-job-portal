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
        console.log(req.body);
        console.log(req.file);
        // if(!job) {
        //     return res.status(404).send('Job not found');
        // }
        // job.applicants.push(req.body);
        // return res.status(201).send('Applicant added successfully');
    }
}