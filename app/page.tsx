import Image from "next/image";
import Link from "next/link";
import { loadResumeData } from "@/lib/loadData";

interface Experience {
  title: string;
  company: string;
  period: string;
  description: string[];
}

interface Education {
  degree: string;
  institution: string;
  period: string;
  grade?: string;
  thesis?: string;
  thesis_grade?: string;
}

interface Skills {
  technical: string[];
  soft: string[];
}

interface ResumeData {
  name: string;
  title: string;
  experience: Experience[];
  education: Education[];
  skills: Skills;
  projects: { name: string; description: string; technologies?: string; link: string }[];
}

const skillColors: { [key: string]: string } = {
  "Javascript": "is-warning",
  "React": "is-primary", 
  "Node.js": "is-success",
  "Typescript": "is-primary",
  "Next.js": "is-dark",
  "C#": "is-error", 
  "C/C++": "is-dark",
  "Java": "is-error",
  "Grails": "is-success", 
  "SQL": "is-primary",
  "HTML/CSS": "is-warning",
};

export default function Home() {
  const data: ResumeData =loadResumeData();

  return (
    <main className="flex flex-col items-center justify-between p-10 gap-10">
      {/* Name & Title */}
      <h1 className="text-center">
        {data.name} - {data.title}
      </h1>

      {/* Work Experience */}
      <div className="nes-container with-title is-centered bg-blue-200 md:w-[45rem]">
        <p className="title">Work Experience</p>
        {data.experience.map((exp, i) => (
          <div key={i} className="mb-2">
            <p>
              <b>{exp.title}</b> - {exp.company} ({exp.period})
            </p>
            <ul className="list-disc list-inside">
              {exp.description.map((d: string, j: number) => (
                <li key={j}>{d}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Education */}
      <div className="nes-container with-title is-centered bg-green-200 md:w-[45rem]">
        <p className="title">Education</p>
        {data.education.map((edu, i) => (
          <div key={i} className="mb-2">
            <p>
              <b>{edu.degree}</b> - {edu.institution} ({edu.period})
            </p>
            {edu.grade && <p>Grade: {edu.grade}</p>}
            {edu.thesis && <p>Thesis: {edu.thesis} ({edu.thesis_grade})</p>}
          </div>
        ))}
      </div>

      {/* Skills */}
      <div className="nes-container is-rounded bg-white">
        <div className="flex flex-col items-center justify-center">
          <Image
            width={100}
            height={100}
            src={"/8bit_portfolio/axe-and-shield.webp"}
            alt="Axe & Shield"
          />
          <p className="text-center mb-2">These are my skills</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {data.skills.technical.map((skill) => {
              const colorClass = skillColors[skill] || "is-primary";
              return (
                <Link key={skill} href="#" className="nes-badge">
                  <span className={colorClass}>{skill}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
