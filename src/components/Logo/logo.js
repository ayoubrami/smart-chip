import React from 'react';
import Tilt from 'react-tilt';
import chip from './chip.png';

const Logo = ()=>(
    <div className='ma3 mt0'>
        <Tilt className="Tilt" options={{ max : 60,scale:1.3,speed:400 }} style={{ height: 150, width: 225 }} >
            <div className="Tilt-inner pt0 pl3 shadow-5">
                <img src={chip} alt='Logo' width='200px' height='200px'/>
            </div>
        </Tilt>
    </div>
);
export default Logo;