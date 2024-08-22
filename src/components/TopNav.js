import React from 'react';
import styles from './TopNav.module.css';
import logo from '../assets/Underwriting_ai_logo.png'; // Make sure to include the file extension

const TopNav = ({ initial }) => {
    return (
        <nav className={styles.topNav}>
            <div className={styles.logo}>
                <img 
                    src={logo} 
                    alt="Logo" 
                    className={styles.logo}
                />
                <div className={styles.logoInner}>
                    <h1>UnderSure AI</h1>
                    <p>By Matt Szypula</p>
                </div>
            </div>
            <ul className={styles.navLinks}>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
            { initial ? (
                <div className={styles.initial}>
                    {initial}
                </div>
            ) : (
                <button className={styles.signInButton}>Sign In</button>
            )}
        </nav>
    );
}

export default TopNav;
