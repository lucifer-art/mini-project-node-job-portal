const jobs = [
    { id: 1, jobcategory: 'Actively hiring', jobdesignation: 'SDE', joblocation: 'Gurgaon HR IND Remote', companyname: 'Coding Ninja', salary: '14-20lpa', applyby: '30 Dec 2024', skillsrequired: ['React', 'NodeJS', 'JS', 'SQL', 'MongoDB', 'Express', 'AWS'], numberofopenings: 5, jobposted: '11/7/2024, 12:05:36 AM', applicants: [] },
    { id: 2, jobcategory: 'Actively hiring', jobdesignation: 'Angular Developer', joblocation: 'Pune IND On-Site', companyname: 'Go Digit', salary: '6-10lpa', applyby: '30 Dec 2024', skillsrequired: ['Angular', 'JS', 'SQL', 'Express', 'AWS'], numberofopenings: 5, jobposted: '11/7/2024, 12:05:36 AM', applicants: [] },
    { id: 2, jobcategory: 'Actively hiring', jobdesignation: 'SDE', joblocation: 'Bangalore IND', companyname: 'Juspay', salary: '20-26lpa', applyby: '30 Dec 2024', skillsrequired: ['React', 'NodeJS', 'JS', 'SQL', 'MongoDB', 'Express', 'AWS'], numberofopenings: 7, jobposted: '11/7/2024, 12:05:36 AM', applicants: [] }
]

export function getJobs() {
    return jobs;
}

export function getJobById(jobId) {
    return jobs.find(job => job.id === jobId);
}