import { CgMail } from 'react-icons/cg';
import { motion } from 'framer-motion';
import '../styles/Email.css';


const Email = () => {
    return( 
        <motion.div
            whileHover={{
                scale:1.1,
                cursor: 'pointer',
                backgroundColor: 'rgba(237, 214, 0, 0.5)'
            }}
        
        >
            <div className='email'>
                <div className="comp glogo">
                    <CgMail size={"30px"}/>
                </div>
                <div className="comp id">
                    <p>imyasar07@gmail.com</p>
                </div>
            </div>
        </motion.div>
    )
}

export default Email;