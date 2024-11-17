import express from 'express';
import expressEjsLayouts from 'express-ejs-layouts';
import Home from './src/controllers/home.controller.js';
import Jobs from './src/controllers/jobs.controller.js';
import Login from './src/controllers/login.controller.js';
import path from 'path';
import { uploadFile } from './src/middlewares/file-upload.middleware.js';
import session from 'express-session';
import cookieParser from 'cookie-parser';

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
app.get('/error', home.getErrorPage);

//login handling
app.get('/login', login.getLoginPage);
app.post('/login', login.postLogin);
app.get('/logout', login.logout);

//jobs API handling
app.get('/jobs', jobs.getJobsPage);
app.get('/modifyjob', jobs.getNewJobs);
app.get('/jobs/:jobId', jobs.getJob);
app.post('/apply/:jobId', uploadFile.single('resume'), jobs.addApplicant);
app.post('/job',jobs.addJob);
app.post('/jobs/:jobId/delete', jobs.deleteJobById);

export default app;