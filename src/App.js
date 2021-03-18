import './App.css';
import {useState,useEffect} from 'react';

const URL ='http://localhost/ostoslista/'

function App() {
  const [items,setItems] = useState([]);
  const [item,setItem] = useState('');
  const [amount,setAmount] = useState('');

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

  function save(e) {
    e.preventDefault();
    let status = 0;
    fetch(URL + 'add.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        description: item
      })
    })
    .then(res => {
      status = parseInt(res.status);
      return res.json();
    })
    .then(
      (res) => {
        if (status === 200) {
          setItems(items => [...items, res]);
          setItem('');
        } else {
          alert(res.error);
        }
      }, (error) => {
        alert(error);
      }
    )
  }

  return (
    <div className="container">
      <h1>Shopping list</h1>
      <div>
        <form onSubmit={save}>
          <label>New Item</label>
          <input value={item} onChange={e => setItem(e.target.value)}></input>
          <input value={amount} onChange={e => setAmount(e.target.value)}></input>
          <button>Add</button>
        </form>
      </div>
        {items.map(item => (
          <li key={item.id}>{item.description}</li>
        ))}
    </div>
  );
}

export default App;
