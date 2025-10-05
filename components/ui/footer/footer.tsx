"use client";

import Link from "next/link";
import React, { useState } from "react";

interface Project {
  name: string;
  description: string;
  technologies?: string;
  link: string;
}

interface FooterProps {
  projects?: Project[];
}

export default function Footer({ projects = [] }: FooterProps) {
  const [isShowModal, setIsShowModal] = useState(false);

  return (
    <footer className="fixed bottom-5 left-5 flex flex-col items-center gap-2 z-20">
      {/* NES Balloon above the star */}
      <div className="nes-balloon from-left w-36 text-center">
        <p className="text-xs">Check my projects!</p>
      </div>

      {/* Star Button */}
      <button
        type="button"
        className="relative"
        onClick={() => setIsShowModal(!isShowModal)}
      >
        <i className="nes-icon is-large star"></i>
      </button>

      {/* Modal */}
      {isShowModal && (
        <div className="fixed inset-0 bg-gray-500/50 flex justify-center items-center z-30">
          <div className="nes-dialog w-[40rem] max-h-[80vh] bg-white overflow-y-auto p-4">
            <div className="flex justify-end mb-3">
              <button onClick={() => setIsShowModal(false)}>
                <i className="nes-icon close is-small"></i>
              </button>
            </div>
            <div className="flex flex-col justify-center items-center gap-5">
              <p>My Projects:</p>

              {projects.map((project, i) => (
                <Link key={i} href={project.link} target="_blank">
                  <div
                    className={`nes-container with-title ${
                      i % 2 === 0 ? "is-dark" : ""
                    }`}
                  >
                    <p className="title">{project.name}</p>
                    <p>{project.description}</p>
                    {project.technologies && (
                      <p className="text-xs mt-1">
                        <b>Technologies:</b> {project.technologies}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
