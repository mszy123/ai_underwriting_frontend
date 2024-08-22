import React, { useState, useRef, useEffect } from 'react';
import styles from './Hero.module.css';
import { ReactTyped } from 'react-typed';
import { FileUp, X, Home, Briefcase, Heart, DollarSign, Building, ShieldAlert } from 'lucide-react';
import Score from './Score';
import { auth, provider, signInWithPopup, onAuthStateChanged } from './firebase';

function Hero() {
    const [files, setFiles] = useState([]);
    const fileInputRef = useRef(null);
    const [selected, setSelected] = useState(null);
    const [user, setUser] = useState(null);
    const [aiResponseAvailable, setAiResponseAvailable] = useState(false);
    const [loading, setLoading] = useState(false);
    const [analysisData, setAnalysisData] = useState(null);  // Store the analysis result

    const options = [
        { id: 1, label: 'Home Insurance', icon: <Home size={24} /> },
        { id: 2, label: 'Business', icon: <Briefcase size={24} /> },
        { id: 3, label: 'Life Insurance', icon: <Heart size={24} /> },
        { id: 4, label: 'Securities', icon: <DollarSign size={24} /> },
        { id: 5, label: 'Investment Banking', icon: <Building size={24} /> },
    ];

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                localStorage.setItem('user', JSON.stringify(user));
            } else {
                setUser(null);
                localStorage.removeItem('user');
            }
        });
    }, []);

    const handleSignIn = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                setUser(result.user);
                localStorage.setItem('user', JSON.stringify(result.user));
            })
            .catch((error) => {
                console.error("Error signing in with Google:", error);
            });
    };

    const handleSelect = (id) => {
        setSelected(id);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const droppedFiles = Array.from(event.dataTransfer.files);
        setFiles([...files, ...droppedFiles]);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleDelete = (index) => {
        const updatedFiles = files.filter((_, i) => i !== index);
        setFiles(updatedFiles);
    };

    const handleAnalyze = async () => {
        setLoading(true);

        const formData = new FormData();
        files.forEach((file) => {
            formData.append("files", file);
        });

        try {
            const response = await fetch("http://localhost:8000/analyze-document/", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                setAnalysisData(data);
                setAiResponseAvailable(true);
            } else {
                console.error("Error analyzing document:", response.statusText);
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.home}>
            <h1 className={styles.title}>
                AI Underwriting for{' '}
                <span className={styles.typingText}>
                    <ReactTyped
                        strings={['Home Insurance', 'Businesses', 'Life Insurance', 'Securities', 'Investment Banking']}
                        typeSpeed={125}
                        backSpeed={50}
                        backDelay={2000}
                        loop
                    />
                </span>
            </h1>
            <h2 className={styles.secondaryTitle}>A second pair of eyes so you never miss a risk.</h2>

            <div>
                <div className={styles.blob}></div>
                <div className={styles.blob1}></div>
                <div className={styles.blob2}></div>
                <div className={styles.blob3}></div>
            </div>

            {/* Information Div */}
            <div className={styles.information}>
                {user ? (
                    <p className={styles.welcomeMessage}>Hi, {user.displayName} 👋</p>
                ) : (
                    <>
                        <p className={styles.signInInstructions}>Please Sign In to Get Started</p>
                        <button className={styles.signInGoogle} onClick={handleSignIn}>
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png"
                                alt="Google Logo"
                                className={styles.googleLogo}
                            />
                            Sign In With Google
                        </button>
                    </>
                )}
            </div>

            <h2 className={styles.stepText}>Step 1. Upload Underwriting Form or use Preset One</h2>
            <div
                className={styles.dropzoneContainer}
                onClick={handleClick}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
            >
                <FileUp color="#b7a8b4" size={42} />
                <p className={styles.dropzoneText}>
                    Drag and drop files here, or click to select files
                </p>
                <p className={styles.dropzoneText2}>
                    Accepts: PDF, PNG, JPG, JPEG, DOC, DOCX
                </p>
                <input
                    type="file"
                    ref={fileInputRef}
                    className={styles.fileInput}
                    onChange={(e) => setFiles([...files, ...Array.from(e.target.files)])}
                    multiple
                />
                <div className={styles.fileList}>
                    {files.map((file, index) => (
                        <div key={index} className={styles.fileItem}>
                            <p className={styles.fileName}>{file.name}</p>
                            <button
                                className={styles.deleteButton}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete(index);
                                }}
                            >
                                <X size={15} color="#b7a8b4" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <h2 className={styles.stepText}>Step 2. Choose Type of Underwriting</h2>
            <div className={styles.circleRow}>
                {options.map((option) => (
                    <div
                        key={option.id}
                        className={`${styles.circle} ${selected === option.id ? styles.selected : ''}`}
                        onClick={() => handleSelect(option.id)}
                    >
                        <div className={styles.icon}>{option.icon}</div>
                        <div className={styles.label}>{option.label}</div>
                    </div>
                ))}
            </div>

            <h2 className={styles.stepText}>Step 3. Analyze</h2>

            {loading ? (
                <div className={styles.loadingBar}>
                    <p>Loading analysis...</p>
                    <div className={styles.progressBar}></div>
                </div>
            ) : aiResponseAvailable ? (
                <div className={styles.dashboard}>
                    <div className={styles.box1}>
                        <h2 className={styles.box1Title}>Analysis</h2>
                        <p className={styles.box1Subtitle}>View risk analysis here</p>
                        <p className={styles.box1Description}>
                            *This is just a proof-of-concept and should not be used for actual analysis
                        </p>
                    </div>
                    <div className={styles.box}>
                        <Score percent={analysisData.totalRiskPercentage} />
                    </div>
                    <div className={`${styles.box} ${styles.large}`}>
                        {analysisData.questions.map((question, index) => (
                            <div key={index} className={styles.downloadItem}>
                                <div className={styles.avatar}>
                                    <ShieldAlert color="#332f36" size={25} />
                                </div>
                                <div className={styles.itemText}>
                                    <h3 className={styles.question}>{question.question}</h3>
                                    <p className={styles.answer}>{question.answer}</p>
                                    <p className={styles.risk}>{question.reasonForRisk}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={`${styles.box} ${styles.wide}`}>
                        <div className={styles.card}>
                            <h2 className={styles.cardNumber}>AI Confidence</h2>
                            <p className={styles.cardDescription}>{analysisData.aiConfidence}%</p>
                        </div>
                        <div className={styles.card}>
                            <h2 className={styles.cardNumber}>Policy Recommendation</h2>
                            <p className={styles.cardDescription}>{analysisData.policyRecommendation}</p>
                        </div>
                        <div className={styles.card}>
                            <h2 className={styles.cardNumber}>Additional Notes</h2>
                            <p className={styles.cardDescription}>{analysisData.additionalNotes}</p>
                        </div>
                    </div>
                </div>
            ) : (
                <button className={styles.analyzeButton} onClick={handleAnalyze}>
                    Analyze
                </button>
            )}
        </div>
    );
}

export default Hero;
