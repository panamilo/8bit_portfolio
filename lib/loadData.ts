// lib/loadData.ts
import fs from "fs";
import path from "path";
import yaml from "js-yaml";

export function loadResumeData() {
  const filePath = path.join(process.cwd(), "data", "resume.yaml");

  if (!fs.existsSync(filePath)) {
    console.warn("resume.yaml not found!");
    return {
      name: "",
      title: "",
      email: "",
      github: "",
      linkedin: "",
      skills: { technical: [], soft: [] },
      experience: [],
      education: [],
      workshops_and_courses: [],
      interests: [],
      projects: [],
    };
  }

  const fileContents = fs.readFileSync(filePath, "utf8");
  const data = yaml.load(fileContents) as any;

  return {
    name: data?.name ?? "",
    title: data?.title ?? "",
    email: data?.email ?? "",
    github: data?.github ?? "",
    linkedin: data?.linkedin ?? "",
    skills: data?.skills ?? { technical: [], soft: [] },
    experience: data?.experience ?? [],
    education: data?.education ?? [],
    workshops_and_courses: data?.workshops_and_courses ?? [],
    interests: data?.interests ?? [],
    projects: data?.projects ?? [],
  };
}
