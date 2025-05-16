import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Menu from './components/Menu';
import Home from './components/Home';
import Quiz from './components/Quiz';
import QuizSettings from './components/QuizSettings';
import Stats from './components/Stats';

function App() {
  const [categoryId, setCategoryId] = useState(null);

  const [difficulty, setDifficulty] = useState(null);
  
  const [statsData, setStatsData] = useState(null);

  const handleStartQuiz = (category, difficulty) => {
    setCategoryId(category);
    setDifficulty(difficulty)
    setStatsData(null); 
  };

  const handleFinishQuiz = (stats) => {
    setStatsData(stats);
    setCategoryId(null); 
    setDifficulty(null); 
  };

  const handleRestartQuiz = () => {
    setStatsData(null);
    setCategoryId(null);
    setDifficulty(null);  
  };

  return (
    <Router>
      <div className="App">
        <Menu />

        <Routes>
          <Route path="/" element={<Home stats={statsData} onRestart={handleRestartQuiz} />} />

          <Route path="/stats" element={<Stats stats={statsData} onRestart={handleRestartQuiz} />} />
        </Routes>

        {!categoryId && !statsData && (
          <QuizSettings onStart={handleStartQuiz} />
        )}

{categoryId && (
  <Quiz
    categoryId={categoryId}
    difficulty={difficulty}
    onFinish={handleFinishQuiz}
  />
)}
      </div>
    </Router>
  );
}

export default App;
