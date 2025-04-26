import React, { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import "../styles/MainPage.css";
import logo from '../assets/logo.png';

function MainPage() {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("en");
  const [voices, setVoices] = useState([]);
  const [category, setCategory] = useState("medical");

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const handleTextToSpeech = (text) => {
    if (text.trim() !== "") {
      const utterance = new SpeechSynthesisUtterance(text);
      const selectedVoice = voices.find(voice => voice.lang.startsWith(language));
      if (selectedVoice) utterance.voice = selectedVoice;
      utterance.lang = language;
      window.speechSynthesis.speak(utterance);
    }
  };

  const categories = {
    medical: ["Ambulance", "Hospital", "Doctor", "Medicine"],
    cinema: ["Movie", "Actor", "Director", "Theater"],
    food: ["Pizza", "Burger", "Restaurant", "Chef"],
    travel: ["Airport", "Hotel", "Bus", "Train"],
    education: ["School", "College", "Exam", "Teacher"]
  };

  return (
    <div className="main-container">
      <h1>Welcome to the Speech Assist App</h1>
      <div className="content-wrapper">
        {/* Sidebar */}
        <div className="sidebar">
          {Object.keys(categories).map((key) => (
            <button key={key} className={category === key ? "active" : ""} onClick={() => setCategory(key)}>
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="main-content">
          {/* Language Selector */}
          <div className="language-selector">
            <label>Select Language: </label>
            <select value={language} onChange={(e) => setLanguage(e.target.value)}>
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="hi">Hindi</option>
              <option value="ta">Tamil</option>
            </select>
          </div>

          {/* Common Words Section */}
          <div className="common-words1">
            {categories[category].map(word => (
              <button key={word} onClick={() => handleTextToSpeech(word)}>
                {word}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Logout Button */}
      <button onClick={async () => { await signOut(auth); navigate('/'); }} className="logout-button">
        Logout
      </button>
    </div>
  );
}

export default MainPage;
