import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Firebase configuration (replace with your actual Firebase project values)
const firebaseConfig = {
  apiKey: 'AIzaSyAtuGriazMFyngSdovQc-eRJFZejuYeY4Y',
  authDomain: 'tts-voice-app.firebaseapp.com',
  projectId: 'tts-voice-app',
  storageBucket: 'tts-voice-app.firebasestorage.app',
  messagingSenderId: '802961213648',
  appId: '1:802961213648:web:27624c7172dfe4ed4536d5',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
