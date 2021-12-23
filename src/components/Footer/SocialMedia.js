import React from "react";
import { ReactComponent as Instagram } from "./assets/instagram.svg";
import { ReactComponent as Twitter } from "./assets/twitter.svg";
import { ReactComponent as Github } from "./assets/github.svg";

function SocialMedia() {
  return (
    <ul className="m-0 mt-2 p-0">
      <li>
        <a
          href="https://instagram.com/gavrillamahdi"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Instagram />
        </a>
      </li>
      <li>
        <a
          href="https://twitter.com/gavrillamahdi"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Twitter />
        </a>
      </li>
      <li>
        <a
          href="https://github.com/gavrillamahdi"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github />
        </a>
      </li>
    </ul>
  );
}

export default SocialMedia;
