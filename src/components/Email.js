import { CgMail } from 'react-icons/cg';
import { motion } from 'framer-motion';
import '../styles/Email.css';
import { useState } from 'react';

const Email = () => {


    const [text, setText] = useState('yasar07@gmail.com')

    const copy = () => {
        navigator.clipboard.writeText("imyasar07@gmail.com");
        setText("Mail id copied")
        setTimeout(()=> setText("yasar07@gmail.com"), 2000);
    }

    return( 
        <motion.div
            whileHover={{
                scale:1.1,
                cursor: 'pointer',
                backgroundColor: 'rgba(237, 214, 0, 0.5)'
            }}
            onClick={copy}
        >
            <div className='email'>
                <div className="comp glogo">
                    <CgMail size={"30px"}/>
                </div>
                <div className="comp id">
                    <p>{text}</p>
                </div>
            </div>
        </motion.div>
    )
}

export default Email;