import React from 'react'
import PersonalDetails from './personalDetails';
import WorkExperience from './workExperience';
import Projects from './projects';
import Education from './education';
import Languages from './languages';
import Skills from './skills';
import html2canvas from 'html2canvas';
import jsPdf from 'jspdf';
import axios from 'axios';

axios.defaults.URL = process.env.REACT_APP_URL

function Forms({ details, setDetails, workExperiences, setWorkExperiences, projects, setProjects, education, 
  setEducation, languages, setLanguages, skills, setSkills }) {
  const userId = localStorage.getItem('User');

  const formData = {
    userId,
    details,
    workExperiences,
    projects,
    education,
    languages,
    skills
  }

  const saveResume = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post('/create-resume', formData, { headers: { Authorization: token }});
      
    } catch (error) {
      console.log('Login failed:', error.message);
      
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const downloadAsPDF = () => {
    const input = document.getElementById('resume');
    html2canvas(input, { onclone: (document) => {
    }})
    .then((canvas) => {
        const img = canvas.toDataURL('image/png')
        const pdf = new jsPdf()
        pdf.addImage(img, 'JPEG', 0, 0, 210, 297)
        pdf.save(details.fullname ? `${details.fullname}.pdf` : 'resume.pdf')
  })};


  return (
    <div className="container p-8">
      <form onSubmit={handleSubmit}>
        <h2 className="text-2xl font-semibold mb-4">Resume Builder</h2>
        
        <PersonalDetails details={details} setDetails={setDetails} />                                   
        <WorkExperience workExperiences={workExperiences} setWorkExperiences={setWorkExperiences} />
        <Education education={education} setEducation={setEducation} />
        <Languages languages={languages} setLanguages={setLanguages} />
        <Projects projects={projects} setProjects={setProjects} /> 
        <Skills skills={skills} setSkills={setSkills} />

        <div className="mt-4">
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
            onClick={downloadAsPDF}
          >
            Download Resume
          </button>
          <button
            className="ml-4 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
            onClick={saveResume}
          >
            Save
          </button>
        </div>     
      </form>
    </div>
  );
};
export default Forms