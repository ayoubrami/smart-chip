import React from 'react';
import './imagelinkform.css'

const ImageLinkForm = ({onInputChange,onSubmit}) =>(
    <>
        <h3>
            This Brain Chip will detect all the faces in your picture. Try it out my dudes !!
        </h3>
        <br/>
        <div className='center'>
            <div className='form center pa4 br3 shadow-5 ba br-4 grow b--transparent w-70'>
                <input 
                    className='f4 pa2 w-70 center ba br-pill b--transparent shadow-5' 
                    type='text' 
                    placeholder='Enter image URL'
                    onChange={onInputChange}
                />
                <button 
                    className='w-30 dim f3 ph3 pv2 blue bg-light-gray ba br-pill shadow-5 b--black bw1'
                    onClick={onSubmit}
                >
                    Detect
                </button>
            </div>
        </div>
    </>
)
export default ImageLinkForm;