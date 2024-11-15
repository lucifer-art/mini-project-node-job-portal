import express from 'express';
import expressEjsLayouts from 'express-ejs-layouts';
import Home from './src/controllers/home.controller.js';
import Jobs from './src/controllers/jobs.controller.js';
import path from 'path';
import { uploadFile } from './src/middlewares/file-upload.middleware.js';

const app = express();
const home = new Home();
const jobs = new Jobs();

app.use(express.static('public'))
app.use(expressEjsLayouts);

app.set('view engine', 'ejs');
app.set('views', path.join(path.resolve(), 'src', 'views'));
app.use(express.urlencoded({ extended: true}));

//api handling
app.get('/', home.getHome);

//jobs API handling
app.get('/jobs', jobs.getJobsPage);
app.get('/jobs/:jobId', jobs.getJob);
app.post('/apply/:jobId', uploadFile.single('resume'), jobs.addApplicant)



export default app;