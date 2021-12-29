import React from 'react';
import SocialMedia from './SocialMedia';

function Footer() {
  return (
    <footer className="main-footer d-flex py-3 align-items-center mt-5">
      <p className="mx-4 me-sm-auto my-0">
        Youtube Playlist Tools &copy; 2021, by{' '}
        <a
          href="https://github.com/gavrillamahdi/yt-playlist-tool-react"
          target="_blank"
          rel="noopener noreferrer"
        >
          gavrillamahdi
        </a>
      </p>
      <div className="mx-4 contact d-flex flex-column align-items-end">
        you can find me on
        <SocialMedia />
      </div>
    </footer>
  );
}

export default Footer;
