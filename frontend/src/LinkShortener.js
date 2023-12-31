import React, { useState } from 'react';
import axios from 'axios';
import "./LinkShortener.css"

const backendApiUrl = 'http://localhost:5000/short-links'

export const LinkShortener = () => {
    const [longLink, setLongLink] = useState('');
    const [shortLink, setShortLink] = useState('');

    const handleInputChange = (event) => {
        setLongLink(event.target.value);
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post(backendApiUrl, { longLink: longLink }, {withCredentials: true});
            setShortLink(`${backendApiUrl}/${response.data.shortLink}`);
        } catch (error) {
            console.error('Error shortening the link:', error);
        }
    };

    return (
        <div className='link-shortener-container'>
            <h2>Link Shortener</h2>
            <div>
                <input 
                    type="url" 
                    placeholder="Enter long link" 
                    value={longLink} 
                    onChange={handleInputChange}
                    className='link-shortener-input'
                />
                <div>

                <button className='link-shortener-button' onClick={handleSubmit}>Shorten</button>
                </div>
            </div>
            {shortLink && (
                <div>
                    <h3>Short Link:</h3>
                    <textarea 
                        value={shortLink} 
                        readOnly 
                        className='link-shortener-textarea'
                        onClick={e => e.target.select()}
                    />
                </div>
            )}
        </div>
    );
};
