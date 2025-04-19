import { Link } from 'react-router-dom';
import './menu.css';

function Menu() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Main</Link></li>
        <li><Link to="/quiz">Quiz</Link></li>
        <li><Link to="/stats">Statistic</Link></li>
      </ul>
    </nav>
  );
}

export default Menu;
