import fs from 'fs';
import yaml from 'js-yaml';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load YAML
const data = yaml.load(fs.readFileSync(join(__dirname, '..', 'data', 'resume.yaml'), 'utf8'));

// Helper for safe access
const safe = v => (v ? v : '');
const section = (title, content) => content ? `\n\n## ${title}\n${content}` : '';

// --- Sections ---

// Skills
const skills = data.skills || {};
const skillsText = `
**Technical Skills:**  
${(skills.technical || []).map(s => `- ${s}`).join('\n')}

**Soft Skills:**  
${(skills.soft || []).map(s => `- ${s}`).join('\n')}
`;

// Experience
const experienceText = (data.experience || [])
  .map(exp => {
    const desc = (exp.description || []).map(d => `  - ${d}`).join('\n');
    return `- **${exp.title}**, ${exp.company} (${exp.period})\n${desc}`;
  })
  .join('\n\n');

// Education
const educationText = (data.education || [])
  .map(ed => {
    return `- **${ed.degree}**, ${ed.institution} (${ed.period})${ed.grade ? ` — Grade: ${ed.grade}` : ''}${ed.thesis ? `\n  - Thesis: ${ed.thesis} (${ed.thesis_grade})` : ''}`;
  })
  .join('\n\n');

// Projects
const projectsText = (data.projects || [])
  .map(p => {
    return `- **[${p.name}](${p.link})**  
  ${p.description}  
  Tech: ${p.technologies}`;
  })
  .join('\n\n');

// Workshops & Courses
const workshopsText = (data.workshops_and_courses || [])
  .map(w => `- **${w.course || w.workshop}**, ${w.organisation} (${w.year || w.period}) — ${w.role}`)
  .join('\n');

// Interests
const interestsText = (data.interests || []).map(i => `- ${i}`).join('\n');

// Languages
const languagesText = (data.languages || []).map(l => `- ${l}`).join('\n');

// --- Markdown structure ---
const md = `
# ${safe(data.name)}

**${safe(data.title)}**  
${safe(data.location)}  
${safe(data.email)}  
[LinkedIn](${safe(data.linkedin)}) | [GitHub](https://github.com/${safe(data.github)})

---

${section('Languages', languagesText)}
${section('Skills', skillsText)}
${section('Experience', experienceText)}
${section('Education', educationText)}
${section('Projects', projectsText)}
${section('Workshops & Courses', workshopsText)}
${section('Interests', interestsText)}
`;

// Save Markdown
fs.writeFileSync(join(__dirname, '..', 'resume.md'), md.trim());
console.log('✅ resume.md generated successfully!');
