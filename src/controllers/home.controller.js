import { getJobs } from '../models/jobs.model.js'

export default class Home {
    getHome(req, res, next) {
        return res.render('home', {});
    }
}