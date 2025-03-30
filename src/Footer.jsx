/* eslint-disable require-jsdoc */
import { Github} from "react-bootstrap-icons";

function Footer() {
  return (
    <footer className='text-center'>
      <a
        className='link-secondary link-underline-opacity-0'
        href='https://github.com/PenguinOfThunder/stepscalc'
        target='_blank'>
        <Github className="me-1"/>
        <span>GitHub</span>
      </a>
    </footer>
  );
}

export default Footer;
