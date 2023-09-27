import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Afterpost.css'
import styles from './Afterpost.module.css'
import { Card, Button, Form, Input, Radio, Select, InputNumber, Upload, Typography} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useEffect, useRef } from 'react';
import Logo from '../../assets/pictures/home_1.png'

const Afterpost1: React.FC = () => {
    const subtitleRef = useRef<HTMLDivElement>(null);

    const createWord = (text: string, index: number) => {
        const word = document.createElement('span');

        word.innerHTML = `${text} `;

        word.classList.add('card-subtitle-word');

        word.style.transitionDelay = `${index * 60}ms`;

        return word;
    };

    const addWord = (text: string, index: number) => {
        if (subtitleRef.current) {
        subtitleRef.current.appendChild(createWord(text, index));
        }
    };

    const createSubtitle = (text: string) => text.split(' ').map(addWord);

    useEffect(() => {
        // Call your createSubtitle function when the component mounts
        createSubtitle("Your kindness is greatly appreciated, and someone, somewhere, will benefit from your generosity. Thank you!");
    }, []);
    const history = useHistory();

    const handleSubmit = () => {
        history.push('/Home'); 
    };
    return (
        <>
        <div className="marquee" style={{paddingTop:'10px'}}>
        One donation brings smiles to many faces. Thank you <u>Person name</u> for your donation
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop:'30px', paddingBottom:'20px'}}>
            
            <div className='card-below'>
                <div className="card">
                    <div className="card-content">
                        <div style={{ marginBottom: '70px' }}>
                        </div>
                        <h3 className="card-title" style={{paddingTop:'20px'}}>Thanks for your submission</h3>
                        <Typography className="card-typ" style={{ fontSize: '18px', lineHeight: '1.5' }}>
                            Thank you for your generosity! Here are the upcoming steps for your donation:

                            <ol>
                                <li>Product Verification: Our team will ensure the suitability of the product.</li>
                                <li>Shipping to Our NGO: Please send the product to our NGO (address on our website).</li>
                                <li>Public Recognition: Once we receive your product, we'll showcase your donation publicly.</li>
                                <li>Certificate and Proof: After the product reaches those in need, you'll receive a donation certificate and proof of impact.</li>
                            </ol>

                            
                        </Typography>
                        <h4 className="card-subtitle" ref={subtitleRef}></h4>
                        <div style={{ marginBottom: '50px' }}>
                        </div>
                        

                        <Button onClick={handleSubmit} className="hovered-button">
                            <img src={Logo} alt="Logo" />
                        </Button>
                        
                    </div>
                    
                    
                </div>
            </div>
        </div>
        </>
    );
};
  
export default Afterpost1;