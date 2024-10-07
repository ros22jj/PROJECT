document.getElementById('name').addEventListener('input', updateResume);
document.getElementById('email').addEventListener('input', updateResume);
document.getElementById('phone').addEventListener('input', updateResume);
document.getElementById('profileSummary').addEventListener('input', updateResume);
document.querySelectorAll('input[name="skills"]').forEach(skill => {
    skill.addEventListener('change', updateResume);
});

document.getElementById('addEducation').addEventListener('click', addEducationField);
document.getElementById('addExperience').addEventListener('click', addExperienceField);
document.getElementById('clearForm').addEventListener('click', clearForm);

let educationCount = 0;
let experienceCount = 0;

function updateResume() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const profileSummary = document.getElementById('profileSummary').value;

    let skills = [];
    document.querySelectorAll('input[name="skills"]:checked').forEach(skill => {
        skills.push(skill.value);
    });

    const resumeOutput = `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Profile Summary:</strong> ${profileSummary}</p>
        <p><strong>Skills:</strong> ${skills.join(', ')}</p>
        <div id="educationPreview"></div>
        <div id="experiencePreview"></div>
    `;

    document.getElementById('resumeOutput').innerHTML = resumeOutput;

    updateEducationPreview();
    updateExperiencePreview();
}

function addEducationField() {
    educationCount++;
    const educationSection = document.getElementById('education-section');
    const newEducation = document.createElement('div');
    newEducation.id = `education${educationCount}`;
    newEducation.innerHTML = `
        <input type="text" placeholder="Degree" class="education-degree">
        <input type="text" placeholder="Institute" class="education-institute">
        <input type="text" placeholder="Year" class="education-year">
    `;
    educationSection.appendChild(newEducation);
    updateResume();
}

function addExperienceField() {
    experienceCount++;
    const experienceSection = document.getElementById('experience-section');
    const newExperience = document.createElement('div');
    newExperience.id = `experience${experienceCount}`;
    newExperience.innerHTML = `
        <input type="text" placeholder="Position" class="experience-position">
        <input type="text" placeholder="Company" class="experience-company">
        <input type="text" placeholder="Duration" class="experience-duration">
    `;
    experienceSection.appendChild(newExperience);
    updateResume();
}

function updateEducationPreview() {
    let educationPreview = '';
    for (let i = 1; i <= educationCount; i++) {
        const degree = document.querySelector(`#education${i} .education-degree`).value;
        const institute = document.querySelector(`#education${i} .education-institute`).value;
        const year = document.querySelector(`#education${i} .education-year`).value;

        if (degree || institute || year) {
            educationPreview += `<p><strong>Education ${i}:</strong> ${degree}, ${institute}, ${year}</p>`;
        }
    }
    document.getElementById('educationPreview').innerHTML = educationPreview;
}

function updateExperiencePreview() {
    let experiencePreview = '';
    for (let i = 1; i <= experienceCount; i++) {
        const position = document.querySelector(`#experience${i} .experience-position`).value;
        const company = document.querySelector(`#experience${i} .experience-company`).value;
        const duration = document.querySelector(`#experience${i} .experience-duration`).value;

        if (position || company || duration) {
            experiencePreview += `<p><strong>Experience ${i}:</strong> ${position}, ${company}, ${duration}</p>`;
        }
    }
    document.getElementById('experiencePreview').innerHTML = experiencePreview;
}

function clearForm() {
    document.getElementById('resumeForm').reset();
    document.getElementById('resumeOutput').innerHTML = '';
    educationCount = 0;
    experienceCount = 0;
    document.getElementById('education-section').innerHTML = '<h3>Education</h3><button type="button" id="addEducation">Add Education</button>';
    document.getElementById('experience-section').innerHTML = '<h3>Experience</h3><button type="button" id="addExperience">Add Experience</button>';
}
