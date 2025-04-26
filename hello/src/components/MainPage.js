import React, { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import "../styles/MainPage.css";
import logo from '../assets/logo.png'; // Import the new logo

<img src={logo} alt="Speech Assist Logo" style={{ width: '100px', height: '100px' }} />


function MainPage() {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("en");
  const [voices, setVoices] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [category, setCategory] = useState("medical");

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const handleTextToSpeech = () => {
    if (text.trim() !== "") {
      const utterance = new SpeechSynthesisUtterance(text);
      const selectedVoice = voices.find(voice => voice.lang.startsWith(language));
      if (selectedVoice) utterance.voice = selectedVoice;

      utterance.lang = language;
      window.speechSynthesis.speak(utterance);
    }
  };

  const replaceLastWord = (replacement) => {
    const words = text.trim().split(" ");
    if (words.length > 0) {
      words[words.length - 1] = replacement;
      setText(words.join(" "));
      setSuggestions([]); // Clear suggestions after selecting one
    }
  };

  const playEmojiSound = (emoji) => {
    const emojiSounds = {
      "😊": "/assets/sounds/happy.mp3",
      "😢": "/assets/sounds/sad.mp3",
      "😂": "/assets/sounds/laugh.mp3",
      "😡": "/assets/sounds/angry.mp3"
    };

    const soundFile = emojiSounds[emoji];
    if (soundFile) {
      const audio = new Audio(soundFile);
      audio.play();
    }
  };

  const wordSuggestions = {
    "sorry": ["I apologize", "My bad"],
    "hello": ["Hi there", "Hey!"],
    "thanks": ["Thank you", "Much appreciated"],
    "yes": ["Absolutely", "Sure"],
    "no": ["Not really", "Nope"]
  };

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setText(newText);

    // Get last typed word
    const words = newText.trim().split(" ");
    const lastWord = words[words.length - 1].toLowerCase();

    if (wordSuggestions[lastWord]) {
      setSuggestions(wordSuggestions[lastWord]);
    } else {
      setSuggestions([]);
    }
  };

  const speakCommonWord = (word) => {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = language;
    window.speechSynthesis.speak(utterance);
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

      {/* Text Input & Speak Button */}
      <div className="text-input-container">
        <textarea
          value={text}
          onChange={handleTextChange}
          placeholder="Type something..."
        ></textarea>
        <button onClick={handleTextToSpeech}>🔊 Speak</button>
      </div>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div className="suggestions">
          {suggestions.map(suggestion => (
            <button key={suggestion} onClick={() => replaceLastWord(suggestion)}>
              {suggestion}
            </button>
          ))}
        </div>
      )}

      {/* Common Words Section */}
      <div className="common-words">
        {["Hello", "Good morning", "Thank you", "Sorry", "Yes", "No"].map(word => (
          <button key={word} onClick={() => speakCommonWord(word)}>
            {word}
          </button>
        ))}
      </div>

      {/* Common Words Section */}
      <div className="common-words">
            {categories[category].map(word => (
              <button key={word} onClick={() => speakCommonWord(word)}>
                {word}
              </button>
            ))}
      </div>

     {/* Emoji Section */}
     <div className="emoji-section">
          {[
            { emoji: "😊", label: "Happy" },
            { emoji: "😢", label: "Sad" },
            { emoji: "😂", label: "Laugh" },
            { emoji: "😡", label: "Angry" }
          ].map(({ emoji, label }) => (
            <button 
              key={emoji} 
              onClick={() => playEmojiSound(emoji)} 
              className="emoji-button" 
              aria-label={label} // Accessibility improvement
              title={label} // Shows tooltip on hover
            >
              {emoji}
            </button>
          ))}
        </div>
        </div>


      {/* Logout Button */}
      <button onClick={async () => { await signOut(auth); navigate('/'); }} 
        className="logout-button">
        Logout
      </button>
    </div>
  );
}

export default MainPage;