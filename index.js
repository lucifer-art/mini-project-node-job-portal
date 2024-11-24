/**
 * Initializes and configures an Express application for a job portal.
 * 
 * This function sets up the Express application with various middleware,
 * configures session handling, sets the view engine, and defines routes
 * for home, login, jobs, and applicant-related functionalities.
 * 
 * @returns {Object} The configured Express application instance.
 */
import express from 'express';
import expressEjsLayouts from 'express-ejs-layouts';
import Home from './src/controllers/home.controller.js';
import Jobs from './src/controllers/jobs.controller.js';
import Login from './src/controllers/login.controller.js';
import path from 'path';
import { uploadFile } from './src/middlewares/file-upload.middleware.js';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import { setLastVisit } from './src/middlewares/lastVisit.middleware.js';
import { auth } from './src/middlewares/auth.middleware.js';
import validateRequest from './src/middlewares/validation.middleware.js';

const app = express();
const home = new Home();
const jobs = new Jobs();
const login = new Login();

app.use(express.static('public'));
app.use(cookieParser());
app.use(
  session({
    secret: 'SecretKey',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.set('view engine', 'ejs');
app.set('views', path.join(path.resolve(), 'src', 'views'));

app.use(expressEjsLayouts);
app.use(express.urlencoded({ extended: true}));

//api handling
app.get('/', home.getHome);
app.get('/404', home.getErrorPage);

//login handling
app.post('/register', login.postRegister);
app.get('/login', login.getLoginPage);
app.post('/login', login.postLogin);
app.get('/logout', login.logout);

//jobs API handling
app.get('/jobs',setLastVisit, jobs.getJobsPage);
app.get('/jobs/:jobId', jobs.getJob);
app.get('/modifyjob', auth, jobs.getNewJobs);
app.get('/jobs/:jobId/update', auth, jobs.updateJobByIdPage);
app.post('/job', auth, jobs.addJob);
app.post('/jobs/:jobId/update', auth, jobs.updateJobById);
app.post('/jobs/:jobId/delete', auth, jobs.deleteJobById);

//applicants
app.post('/apply/:jobId', uploadFile.single('resume'), validateRequest, jobs.addApplicant);
app.get('/jobs/:jobId/applicants', auth, jobs.getApplicant);

export default app;