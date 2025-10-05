"use client";

import { useState } from "react";

interface HeaderProps {
  github?: string;
  linkedin?: string;
}

export default function Header({ github = "", linkedin = "" }: HeaderProps) {
  const [isShowModal, setIsShowModal] = useState(false);

  return (
    <header className="flex w-full justify-end p-5">
      <button
        type="button"
        className="nes-btn is-primary"
        onClick={() => setIsShowModal(!isShowModal)}
      >
        <i className="nes-icon trophy"></i>
      </button>

      {isShowModal && (
        <div className="nes-dialog absolute top-20 bg-white z-10">
          <div className="flex justify-end">
            <button onClick={() => setIsShowModal(false)}>
              <i className="nes-icon close is-small"></i>
            </button>
          </div>
          <div className="p-3">
          <p className="title text-sm">Reach me!</p>
          <div className="flex gap-2 justify-center items-center">
            {github && (
              <a
                href={`https://github.com/${github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="nes-btn is-dark"
              >
                <i className="nes-icon github is-small"></i>
              </a>
            )}
            {linkedin && (
              <a
                href={`https://www.linkedin.com/in/${linkedin.replace(/^\//, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="nes-btn is-primary"
              >
                <i className="nes-icon linkedin is-small"></i>
              </a>
            )}
          </div>
          </div>
        </div>
      )}
    </header>
  );
}
