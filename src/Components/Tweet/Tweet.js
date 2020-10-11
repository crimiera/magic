import React from 'react';
import './tweet.style.css';

export const Tweet = ({text, image, username, timeStamp}) => {
    const time = new Date(timeStamp).toLocaleTimeString(); 
    return (
        <li className='tweet'>
            <img src={image} alt={image}/>
            <div className='content' >
                <h4>{username}</h4>
                <p>{text}</p>
                <p>{time}</p>
            </div> 
        </li>
    )
}

export default Tweet;