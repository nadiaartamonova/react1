function Stats({ stats, onRestart }) {
    if (!stats) return <p>Stat is not avalible</p>;
  
    return (
      <div>
        <h2>Result</h2>
        <p>questions: {stats.total}</p>
        <p>Correct: {stats.correct}</p>
        <p>Incorrect: {stats.wrong}</p>
        <p>Persent of success: {stats.percentage}%</p>
  
        <button onClick={onRestart} style={{ marginTop: '20px' }}>
          game one more time
        </button>
      </div>
    );
  }
  
  export default Stats;
  