import './App.css';
import {useState,useEffect} from 'react';

const URL ='http://localhost/ostoslista/'

function App() {
  const [items,setItems] = useState([]);

  useEffect(() => {
    fetch(URL + 'index.php')
    .then(response => response.json())
    .then(
      (response) => {
        setItems(response);
      }, (error) => {
        alert(error);
      }
    )
    }, [])

  return (
    <div className="container">
      <ol>
        {items.map(item => (
          <li key={item.id}>{item.description}</li>
        ))}
      </ol>
    </div>
  );
}

export default App;
