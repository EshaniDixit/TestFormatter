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
                    <li><a href="#upload-pdf">Upload PDF</a></li>
                    <li><a href="#answer-key">Answer Key</a></li>
                    <li><a href="#tool">Create Assessment</a></li>
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
            <section id="upload-pdf" class="features">
    <input type="file" accept="image/*" onChange={handleImageChange} multiple required />
    <div class="button-container">
        <button type="submit" class="upload-button">Upload PDF</button>
        <button type="submit" class="generate-button">GENERATE TESTS</button>
    </div>
</section>

            <section id="answer-key" className="features">
                <h1>Upload Answers</h1>
                {<input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        multiple
                        required
                    />}
                    <button type="submit">Upload Answer Key</button>
            </section>
            <section id="tool" className="features">
                <form onSubmit={handleSubmitAssessment}>
                    <textarea
                        value={assessmentData.text}
                        onChange={handleTextChangeAssessment}
                        placeholder="Create Assessment...."
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
            <section id="social-space" class="features">
    <h2>Social Space</h2>
    <div class="test-container-wrapper">
        <div class="test-container">
            <div class="test-card">
                <h3>Test 1</h3>
                <p>Posted by: User123</p>
                <p>Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vestibulum ante quis ipsum fermentum, id tincidunt felis placerat.</p>
                <button class="attempt-button">Attempt Test</button>
            </div>
        </div>
        <div class="test-container">
            <div class="test-card">
                <h3>Test 2</h3>
                <p>Posted by: User456</p>
                <p>Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vestibulum ante quis ipsum fermentum, id tincidunt felis placerat.</p>
                <button class="attempt-button">Attempt Test</button>
            </div>
        </div>
    </div>
</section>

            <section id="test-review" className="features">
                <h2>Test Reviews</h2>
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
                    <p></p>
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
            <section id="analytical-side" class="features" align="center">
    <h2>Analytical Side</h2>
    <button type="submit" class="analyse">Click to analyse</button>
    <div class="pie-chart-container">
        <div class="pie-chart" align="center">
            <div class="slice" id="physics"></div>
            <div class="slice" id="chemistry"></div>
            <div class="slice" id="maths"></div>
        </div>
    </div>
    <div><h4>Time Spent</h4>
    <h4>Total Score</h4>
    <h4>Compare</h4></div>
</section>


            <section id="personal-space" className="features">
    <h2>Community</h2>
    <div class="personal-space-container">
        <div class="friends-list">
            <h3>Friends</h3>
            <form id="add-friend-form">
                <input type="text" id="friend-input" placeholder="Search friends to learn together" />
                <input type="text" id="friend-input" placeholder="Enter friend's username" />
                <button type="submit">Add Friend</button>
            </form>
        </div>
        <div class="groups-list">
            <h3>Groups</h3>
            <ul id="groups-list">
                
            </ul>
            <form id="create-group-form">
                <input type="text" id="group-name-input" placeholder="Enter group name" />
                <input type="text" id="group-members-input" placeholder="Enter group members' usernames (comma-separated)" />
                <button type="submit">Create Group</button>
            </form>
        </div>
    </div>
</section>

            <section id="ratings" className="features">
                <h2>Ratings</h2>
                <div>
                    <label for="tests">Select Test you want to rate</label>

                 <select name="test" id="test">
                 <option value="test 1">Test 1</option>
                 <option value="test 2">Test 2</option>
                 <option value="test 3">Test 3</option>
                 <option value="tets 4">Test 4</option>
                </select>
                    <textarea
                        value={assessmentData.text}
                        onChange={handleTextChangeAssessment}
                        placeholder="Enter your reviews"
                        required
                    ></textarea>
                <button type="submit">Submit Review</button>
                </div>
            </section>
            <footer>
                <p>Sign up now to start preparing for your exams!</p>
            </footer>
            <Timer />
        </div>
    );
}

export default HomePage;
