import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const decodeHtml = (html) => {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
};

function Quiz({ categoryId, difficulty, onFinish  } ) {
  //console.log(difficulty)
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [current, setCurrent] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showAnswers, setShowAnswers] = useState(false);
  const [timer, setTimer] = useState(15);

  const navigate = useNavigate();
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);


  useEffect(() => {
    const fetchQuestions = async () => {
        try {
            setLoading(true);
            setError('');
    
            console.log(difficulty)
            const response = await axios.get(
              
              `https://opentdb.com/api.php?amount=5&category=${categoryId}&type=multiple&difficulty=${difficulty}`
            );
    
            if (response.data.response_code !== 0) {
              setError('Cannot get euastions please choose other category');
              return;
            }
    
            const decodedQuestions = response.data.results.map((q) => {
              const allAnswers = [...q.incorrect_answers.map(decodeHtml), decodeHtml(q.correct_answer)];
              return {
                ...q,
                question: decodeHtml(q.question),
                correct_answer: decodeHtml(q.correct_answer),
                all_answers: allAnswers.sort(() => Math.random() - 0.5),
              };
            });
    
            setQuestions(decodedQuestions);
          } catch (error) {
            setError('err', error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchQuestions();
      }, [categoryId, difficulty]);

  useEffect(() => {
    setTimer(15);
  }, [current]);


  useEffect(() => {
    if (!showAnswers && timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(countdown);
    } else if (timer === 0 && !showAnswers) {

      setShowAnswers(true);
      setSelectedAnswer(null);
    }
  }, [timer, showAnswers]);


  const handleAnswerClick = (answer) => {
    if (!showAnswers) {
      setSelectedAnswer(answer);
      setShowAnswers(true);
      if (answer === questions[current].correct_answer) {
        setCorrectCount((prev) => prev + 1);
      } else {
        setWrongCount((prev) => prev + 1);
      }
    }
  };

  const goToNext = () => {
    if (current < questions.length - 1) {
      setSelectedAnswer(null);
      setShowAnswers(false);
      setCurrent((prev) => prev + 1);
      setTimer(15);
    } else {
      const stats = {
        total: questions.length,
        correct: correctCount,
        wrong: wrongCount,
        percentage: Math.round((correctCount / questions.length) * 100),
      };
      onFinish(stats);     
      navigate('/stats');  
    }
  };


  if (questions.length === 0) {
    return <p>loading...</p>;
  }

  const currentQuestion = questions[current];
  const allAnswers = currentQuestion.all_answers;

  return (
    <div>
      <h2>question {current + 1} of {questions.length}</h2>
      <p>{currentQuestion.question}</p>
      {!showAnswers && <h4>time left: {timer} сек</h4>}

      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {allAnswers.map((answer, idx) => {
          let style = {};

          if (showAnswers) {
            if (answer === currentQuestion.correct_answer) {
              style.backgroundColor = 'lightgreen';
            } else if (answer === selectedAnswer) {
              style.backgroundColor = 'salmon';
            }
          }

          return (
            <li
              key={idx}
              onClick={() => handleAnswerClick(answer)}
              style={{
                padding: '10px',
                marginBottom: '8px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                cursor: showAnswers ? 'default' : 'pointer',
                ...style,
              }}
            >
              {answer}
            </li>
          );
        })}
      </ul>

      {showAnswers && (
        <button onClick={goToNext} style={{ marginTop: '20px' }}>
          {current < questions.length - 1 ? 'Next' : 'Finish'}
        </button>
      )}
    </div>
  );
}

export default Quiz;
