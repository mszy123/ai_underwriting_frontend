import React, { useState, useEffect } from 'react';
import styles from './Score.module.css';

const Score = ({ percent }) => {
  const [currentPercent, setCurrentPercent] = useState(0);

  useEffect(() => {
    // Trigger the animation when percent changes
    const timeout = setTimeout(() => setCurrentPercent(percent), 100);
    return () => clearTimeout(timeout);
  }, [percent]);

  return (
    <div className={styles.container}>
      <div className={styles.circle}>
        <div className={styles.solidCircle}>
            <p className={styles.riskAssesmentText}>Risk Assesment</p>
          <div className={styles.percentText}>
            {`${currentPercent}%`}
            </div>
        </div>
        <div
          className={styles.grayHollowCircle}

        >
            
          <div className={styles.innerCircle1}></div>
        </div>
        <div
          className={styles.hollowCircle}
          style={{ background: `conic-gradient(#ff0000 ${currentPercent}%, transparent ${currentPercent}%)` }}
        >
            
          <div className={styles.innerCircle}></div>
        </div>
      </div>
    </div>
  );
};

export default Score;
