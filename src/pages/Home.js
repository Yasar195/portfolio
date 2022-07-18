import Headers from '../components/Headers'
import { BsArrowLeftRight } from 'react-icons/bs';
import Email from '../components/Email';
import { motion } from 'framer-motion';
import Projects from '../components/Projects';
import Number from '../components/Number';
import '../styles/Home.css';

export default function Home() {
  return (
    <div className="container">
      <Headers/>
      <motion.div />
      <span className="self">
        <p>im Yasar Arafath S</p>
        <BsArrowLeftRight size={'15px'}/>
        <p>open to freelance work</p>
      </span>
      <div className="intro">
        <h1>im a freelance web developer. I turn your ideas to reality</h1>
      </div>
      <div className="who">
        <p>
          i help companies and entreprenuers to turn their ideas into realiy. I primarily focused on full stack development.
        </p>
        <p>
          get in touch with me
        </p>
        <Email/>
      </div>
      <h1 className="projects">Projects</h1>
      <div className="allprojects">
        <div className="project">
          <div>
            <Number/>
          </div>
          <div>
            <Projects/>
          </div>
        </div>
      </div>
      <h1 className="services">Services & Contact</h1>
      <div className='footer'>
        <div className="left">
          <h2>i'm a full stack developer</h2>
          <p>
            i primarily focused on full stack development which is buiding applications end to end.
          </p>
        </div>
        <div>

        </div>
      </div>
    </div>
  )
}