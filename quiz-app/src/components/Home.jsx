function Home({ stats, onRestart }) {
    return (
      <div>
        <h1>welcome!</h1>
  
        {stats && (
          <div>
            <p>Last game: {stats.correct}/{stats.total} correct</p>
            <button onClick={onRestart}>Game one more time</button>
          </div>
        )}
      </div>
    );
  }
  
  export default Home;
  
  