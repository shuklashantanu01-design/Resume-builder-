const fields = [
  "name",
  "job",
  "email",
  "phone",
  "location",
  "summary",
  "education",
  "skills",
  "projects",
  "experience"
];

const defaults = {
  outName: "Your Name",
  outJob: "Your Job Title",
  outContact: "Email | Phone | Location",
  outSummary: "Your professional summary will appear here.",
  outEducation: "Your education details",
  outSkills: "Your skills",
  outProjects: "Your projects",
  outExperience: "Your experience"
};

const outputIds = [
  "outName",
  "outJob",
  "outContact",
  "outSummary",
  "outEducation",
  "outSkills",
  "outProjects",
  "outExperience"
];

function getValue(id) {
  return document.getElementById(id).value.trim();
}

function updateResume() {
  document.getElementById("outName").textContent =
    getValue("name") || defaults.outName;

  document.getElementById("outJob").textContent =
    getValue("job") || defaults.outJob;

  const contact = [
    getValue("email"),
    getValue("phone"),
    getValue("location")
  ].filter(Boolean);

  document.getElementById("outContact").textContent =
    contact.join(" | ") || defaults.outContact;

  const mapping = {
    summary: "outSummary",
    education: "outEducation",
    skills: "outSkills",
    projects: "outProjects",
    experience: "outExperience"
  };

  for (const [inputId, outputId] of Object.entries(mapping)) {
    document.getElementById(outputId).textContent =
      getValue(inputId) || defaults[outputId];
  }
}

function changeTemplate() {
  const template = getValue("template");
  const resume = document.getElementById("resume");

  resume.classList.remove(
    "classic", "modern", "minimal", "student"
  );

  resume.classList.add(template);
}

function generateResume() {
  updateResume();
  changeTemplate();

  document.getElementById("resume").scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

fields.forEach(id => {
  document.getElementById(id).addEventListener(
    "input",
    updateResume
  );
});

document.getElementById("template").addEventListener(
  "change",
  changeTemplate
);

document.getElementById("generateBtn").addEventListener(
  "click",
  generateResume
);

document.getElementById("downloadBtn").addEventListener(
  "click",
  () => {
    updateResume();
    changeTemplate();
    window.print();
  }
);

document.getElementById("clearBtn").addEventListener(
  "click",
  () => {
    fields.forEach(id => {
      document.getElementById(id).value = "";
    });

    document.getElementById("template").value = "classic";

    updateResume();
    changeTemplate();
  }
);

// Initialize the resume when the website opens.
updateResume();
changeTemplate();