import React, { useEffect, useState } from 'react';
import Home from './components/Home'; // Correct the import path for Home
import TopNav from './components/TopNav';

function App() {
    const [profileURL, setProfileURL] = useState(null);
    const [initial, setInitial] = useState(null);

    useEffect(() => {
        // Retrieve the user from local storage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const user = JSON.parse(storedUser);
            // Set the profile URL if it exists
             if (user.displayName) {
                // Set the initial to the first letter of the display name
                setInitial(user.displayName.charAt(0).toUpperCase());
            }
        }
    }, []);

    return (
        <div className="App">
            <TopNav initial={initial} />
            <Home />
        </div>
    );
}

export default App;
