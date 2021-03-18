import './App.css';
import {useState,useEffect} from 'react';

const URL ='http://localhost/ostoslista/'

function App() {
  const [items,setItems] = useState([]);
  const [item,setItem] = useState('');
  const [määrä,setMäärä] = useState([]);


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
        description: item,
        amount: määrä
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
          setMäärä('');
        } else {
          alert(res.error);
        }
      }, (error) => {
        alert(error);
      }
    )
  }

  function remove(id) {
    let status = 0;
    fetch(URL + 'delete.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        id: id
      })
    })
    .then(res => {
      status = parseInt(res.status);
      return res.json();
    })
    .then(
      (res) => {
        if (status === 200) {
          const newListWithoutRemoved = items.filter((item) => item.id !== id);
          setItems(newListWithoutRemoved);
        } else {
          alert(res.error);
        }
      }, (error) => {
        alert(error);
      }
    )
  }

  return (
    <div class="container">
      <h1>Shopping list</h1>
      <div>
        <form onSubmit={save}>
          <label>New Item</label>&nbsp;
          <input value={item} onChange={e => setItem(e.target.value)}></input>&nbsp;
          <input value={määrä} onChange={e => setMäärä(e.target.value)}></input>&nbsp;
          <button>Add</button>
        </form>
      </div>
        {items.map(item => (
          <li key={item.id}>{item.description}&nbsp;{item.amount}&nbsp;<a className="delete" onClick={() => remove(item.id)} href="#">Delete</a></li>
        ))}
    </div>
  );
}

export default App;
