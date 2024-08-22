import React from 'react';
import Hero from './Hero';
import styles from './Home.module.css';
import Underwriting from './Underwriting';

function Home() {
    return (
        <div className={styles.home}>
            <div>
                <Hero />
            </div>
            
        </div>
    );
}

export default Home;
