import React from 'react';
import {Link} from 'react-router-dom'

const Navigation= ({ signOut, isSignedIn }) =>{ 
    if(isSignedIn){
        return (
                <nav className='flex justify-end'>
                    <Link 
                        onClick={()=>signOut()}
                        className='f4 link pointer white pa2 ph4 ma3 ba br-pill bw1 grow'
                        to='/signin'
                    >
                        Sign out
                    </Link>
                </nav> 
        );
    }else {
        return (
                <nav className='flex justify-end'>
                    <Link 
                        className='f5 link pointer white pa3 ph4 ma3 ba br-pill bw1 dim b--white'
                        to='/signin'
                    >
                        Sign in
                    </Link>
                    <Link 
                        className='f5 link pointer white pa3 ph4 ma3 underline ba br-pill bw1 grow'
                        to='/register'
                    >
                        Register
                    </Link>
                </nav> 
        );
    }
}

export default Navigation;