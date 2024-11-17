const jobs = [
  {
    id: 1,
    jobcategory: "Actively hiring",
    jobdesignation: "SDE",
    joblocation: "Gurgaon HR IND Remote",
    companyname: "Coding Ninja",
    salary: "14-20lpa",
    applyby: "30 Dec 2024",
    skillsrequired: [
      "React",
      "NodeJS",
      "JS",
      "SQL",
      "MongoDB",
      "Express",
      "AWS",
    ],
    numberofopenings: 5,
    jobposted: "11/7/2024, 12:05:36 AM",
    applicants: [],
  },
  {
    id: 2,
    jobcategory: "Actively hiring",
    jobdesignation: "Angular Developer",
    joblocation: "Pune IND On-Site",
    companyname: "Go Digit",
    salary: "6-10lpa",
    applyby: "30 Dec 2024",
    skillsrequired: ["Angular", "JS", "SQL", "Express", "AWS"],
    numberofopenings: 5,
    jobposted: "11/7/2024, 12:05:36 AM",
    applicants: [],
  },
  {
    id: 3,
    jobcategory: "Actively hiring",
    jobdesignation: "SDE",
    joblocation: "Bangalore IND",
    companyname: "Juspay",
    salary: "20-26lpa",
    applyby: "30 Dec 2024",
    skillsrequired: [
      "React",
      "NodeJS",
      "JS",
      "SQL",
      "MongoDB",
      "Express",
      "AWS",
    ],
    numberofopenings: 7,
    jobposted: "11/7/2024, 12:05:36 AM",
    applicants: [],
  },
];

export function getJobs() {
  return jobs;
}

export function getJobById(jobId) {
  return jobs.find((job) => job.id === jobId);
}

export function addJob(req) {
  const job = {
    id: jobs.length + 1,
    jobcategory: req.job_category,
    jobdesignation: req.job_designation,
    joblocation: req.job_location,
    companyname: req.company_name,
    salary: req.salary,
    applyby: req.apply_by,
    skillsrequired: req.skills_required,
    numberofopenings: req.number_of_openings,
    jobposted: new Date().toISOString(),
    applicants: [],
  };
  jobs.push(job);
}

export function deleteJob(jobId) {
  const indexToDelete = jobs.findIndex((job) => job.id === jobId);
  if (indexToDelete === -1) {
    return getJobs();
  }
  jobs.splice(indexToDelete, 1);
  for (let i = indexToDelete; i < jobs.length; i++) {
    jobs[i].id -= 1;
  }
  return getJobs();
}