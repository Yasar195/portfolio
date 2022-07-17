import image from '../assets/chatrt.png';
import { FiGithub } from 'react-icons/fi';
import { CgWebsite } from 'react-icons/cg';
import '../styles/Projects.css';

const Projects = () => {
    return(
        <div className="eproject">
            <img src={image} alt="screenshot" id="image"/>
            <h2 className='pname'>A real time chat application</h2>
            <p className="exp">A backend project build using express js and socket.io</p>
            <div className='links'>
                <div className='lbtn'>
                    <FiGithub size={"13px"}/>
                    <p>Browse code</p>
                </div>
                <div className='lbtn'>
                    <CgWebsite size={"13px"}/>
                    <p>Visit application</p>
                </div>
            </div>
        </div>
    )
}

export default Projects;