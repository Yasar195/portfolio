import { AiOutlineArrowRight } from 'react-icons/ai';
import { FiTwitter, FiInstagram, FiLinkedin, FiGithub } from 'react-icons/fi';
import '../styles/Headers.css';

const Headers = () => {
    return(
        <div className="header">
            <div className="socials">
                <div className="logo">
                    <FiTwitter size={'20px'}/>
                </div>
                <div className="logo">
                    <FiInstagram size={'20px'}/>
                </div>
                <div className="logo">
                    <FiLinkedin size={'20px'}/>
                </div>
                <div className="logo">
                    <FiGithub size={"20px"}/>
                </div>
            </div>
            <div className="btn">
                <p>About & Services</p>
                <AiOutlineArrowRight size={'15px'}/>
            </div>
        </div>
    )
}

export default Headers;
