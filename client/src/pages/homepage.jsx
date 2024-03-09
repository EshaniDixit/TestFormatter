import React, { useState } from 'react';
import Timer from '../component/timer';
import './HomePage.css';

function HomePage() {
    const [assessmentData, setAssessmentData] = useState({
        text: '',
        images: []
    });

    // Function to handle text input change for assessment
    const handleTextChangeAssessment = (event) => {
        setAssessmentData({
            ...assessmentData,
            text: event.target.value
        });
    };

    // Function to handle image input change for assessment
    const handleImageChange = (event) => {
        const imagesArray = Array.from(event.target.files);
        setAssessmentData({
            ...assessmentData,
            images: imagesArray
        });
    };

    // Function to handle form submission for assessment
    const handleSubmitAssessment = (event) => {
        event.preventDefault();
        // Implement logic to handle form submission (e.g., send data to server)
        console.log('Assessment submitted:', assessmentData);
    };

    // State to manage form inputs, analytical data, user personal data, and test ratings
    const [reviewData, setReviewData] = useState({
        text: '',
        explanation: '',
        isFinalized: false
    });
    const [analyticsData, setAnalyticsData] = useState({
        timeSpent: 0,
        totalScore: 0,
        comparisonsWithPeers: []
    });
    const [userProfile, setUserProfile] = useState({
        username: 'JohnDoe', // Example username
        friends: ['JaneDoe', 'Alice', 'Bob'], // Example friends list
        groups: ['Study Group A', 'Math Enthusiasts'] // Example groups
    });
    const [testRatings, setTestRatings] = useState({
        // Example test ratings data structure: { testId: rating }
        // Initialize with dummy data for demonstration
        test1: 4,
        test2: 3,
        test3: 5
    });

    // Function to handle text input change for review
    const handleTextChangeReview = (event) => {
        setReviewData({
            ...reviewData,
            text: event.target.value
        });
    };

    // Function to handle explanation input change for review
    const handleExplanationChange = (event) => {
        setReviewData({
            ...reviewData,
            explanation: event.target.value
        });
    };

    // Function to handle finalization toggle for review
    const handleFinalizationToggle = () => {
        setReviewData({
            ...reviewData,
            isFinalized: !reviewData.isFinalized
        });
    };

    // Function to handle form submission for review
    const handleSubmitReview = (event) => {
        event.preventDefault();
        // Implement logic to handle form submission (e.g., send data to server)
        console.log('Review submitted:', reviewData);
        // Update analytics data (dummy data for demonstration)
        setAnalyticsData({
            ...analyticsData,
            timeSpent: 120, // Time spent in seconds
            totalScore: 85, // Total score
            comparisonsWithPeers: [
                { name: 'User1', score: 90 },
                { name: 'User2', score: 80 },
                { name: 'User3', score: 75 }
            ]
        });
    };

    return (
        <div className="home-page">
            <nav>
                <ul>
                    <li><a href="#test-generator">Test Generator</a></li>
                    <li><a href="#upload-pdf">Upload PDF</a></li>
                    <li><a href="#answer-key">Answer Key</a></li>
                    <li><a href="#tool">Tool</a></li>
                    <li><a href="#social-space">Social Space</a></li>
                    <li><a href="#test-review">Test Review</a></li>
                    <li><a href="#analytical-side">Analytical Side</a></li>
                    <li><a href="#personal-space">Personal Space</a></li>
                    <li><a href="#ratings">Ratings</a></li>
                </ul>
            </nav>
            <header>
                <h1>Welcome to ExamMaster</h1>
                <p>Your one-stop solution for online mock assessments and exam preparation</p>
            </header>
            <section id="test-generator" className="features">
                {/* Test Generator section */}
            </section>
            <section id="upload-pdf" className="features">
                {/* Upload PDF section */}
            </section>
            <section id="answer-key" className="features">
                {/* Answer Key section */}
            </section>
            <section id="tool" className="features">
                <h2>Tool</h2>
                <p>Create manual online assessments with text and images:</p>
                <form onSubmit={handleSubmitAssessment}>
                    <textarea
                        value={assessmentData.text}
                        onChange={handleTextChangeAssessment}
                        placeholder="Enter assessment text..."
                        required
                    ></textarea>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        multiple
                        required
                    />
                    <button type="submit">Submit Assessment</button>
                </form>
            </section>
            <section id="social-space" className="features">
                {/* Social Space section */}
            </section>
            <section id="test-review" className="features">
                <h2>Test Review</h2>
                <form onSubmit={handleSubmitReview}>
                    <textarea
                        value={reviewData.text}
                        onChange={handleTextChangeReview}
                        placeholder="Enter your review..."
                        required
                    ></textarea>
                    <input
                        type="text"
                        value={reviewData.explanation}
                        onChange={handleExplanationChange}
                        placeholder="Add an explanation (optional)"
                    />
                    <label>
                        <input
                            type="checkbox"
                            checked={reviewData.isFinalized}
                            onChange={handleFinalizationToggle}
                        />
                        Finalize test
                    </label>
                    <button type="submit">Submit Review</button>
                </form>
            </section>
            <section id="analytical-side" className="features">
                <h2>Analytical Side</h2>
                <div>
                    <p>Time Spent: {analyticsData.timeSpent} seconds</p>
                    <p>Total Score: {analyticsData.totalScore}</p>
                    <p>Comparisons with Peers:</p>
                    <ul>
                        {analyticsData.comparisonsWithPeers.map((peer, index) => (
                            <li key={index}>{peer.name}: {peer.score}</li>
                        ))}
                    </ul>
                </div>
            </section>
            <section id="personal-space" className="features">
                <h2>Personal Space</h2>
                <div>
                    <p>Username: {userProfile.username}</p>
                    <p>Friends:</p>
                    <ul>
                        {userProfile.friends.map((friend, index) => (
                            <li key={index}>{friend}</li>
                        ))}
                    </ul>
                    <p>Groups:</p>
                    <ul>
                        {userProfile.groups.map((group, index) => (
                            <li key={index}>{group}</li>
                        ))}
                    </ul>
                </div>
            </section>
            <section id="ratings" className="features">
                <h2>Ratings</h2>
                <div>
                    <p>Test Ratings:</p>
                    <ul>
                        {Object.entries(testRatings).map(([testId, rating]) => (
                            <li key={testId}>Test {testId}: {rating}</li>
                        ))}
                    </ul>
                </div>
            </section>
            <footer>
                <p>Sign up now to start preparing for your exams!</p>
            </footer>
            
            {/* Render Timer component */}
            <Timer />
        </div>
    );
}

export default HomePage;
