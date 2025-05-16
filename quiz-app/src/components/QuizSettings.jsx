import { useEffect, useState } from 'react';

function QuizSettings({ onStart }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('')
  const difficulties = ['easy', 'medium', 'hard'];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('https://opentdb.com/api_category.php');
        const data = await res.json();
        setCategories(data.trivia_categories);
      } catch (error) {
        console.error('error with category:', error);
      }
    };


    fetchCategories();
  }, []);

  const handleStart = () => {
    if (selectedCategory) {
      //console.log(selectedCategory, selectedDifficulty)
      onStart(selectedCategory, selectedDifficulty);
    } else {
      alert('please choose another one');
    }
  };

  return (
    <div>
      <h2>Setup quiz</h2>
      <label htmlFor="category">choose category </label>
      <select
        id="category"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        {categories && categories.length > 0 ? (
        categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))
      ) : (
        <option disabled>Категории не найдены</option>
      )}
</select>
      <br></br>
      <label htmlFor="difficulty">choose difficulty </label>
      <select
        id="difficulty"
        value={selectedDifficulty}
        onChange={(e) => setSelectedDifficulty(e.target.value)}
      >
        <option value="">-- choose --</option>
        {difficulties.map((diff) => (
          <option key={diff} value={diff}>
          {diff}
          </option>
        ))}
      </select>

      <br /><br />
      <button onClick={handleStart}>Start </button>
    </div>
  );
}

export default QuizSettings;
