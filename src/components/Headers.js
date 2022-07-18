import { AiOutlineArrowRight } from 'react-icons/ai';
import { FiTwitter, FiInstagram, FiLinkedin, FiGithub } from 'react-icons/fi';
import '../styles/Headers.css';

const Headers = () => {
    return(
        <div className="header">
            <div className="socials">
                <a href='https://twitter.com/Yasar97280710'><div className="logo">
                    <FiTwitter size={'20px'}/>
                </div></a>
                <a href="https://www.instagram.com/imyasar7/"><div className="logo">
                    <FiInstagram size={'20px'}/>
                </div></a>
                <a href='https://www.linkedin.com/in/yasar-arafath-091383191/'><div className="logo">
                    <FiLinkedin size={'20px'}/>
                </div></a>
                <a href="https://github.com/Yasar195"><div className="logo">
                    <FiGithub size={"20px"}/>
                </div></a>
            </div>
            <div className="btn">
                <p>About & Services</p>
                <AiOutlineArrowRight size={'15px'}/>
            </div>
        </div>
    )
}

export default Headers;
