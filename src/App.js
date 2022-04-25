import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data));

  }, []);

  const handleUser = event => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const user = { name, email };
    // console.log(user);


    fetch('http://localhost:5000/users', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user)
    })
      .then(response => response.json())
      .then(data => {
        const newUsers = [...users , data];
        setUsers(newUsers);
        console.log( data);
      })


  }


  return (
    <div className="App">
      <h1>My Own Data: {users.length}</h1>
      <form onSubmit={handleUser}>
        <input type="text" name='name' placeholder='Name' />
        <input type="text" name='email' placeholder='Email' />
        <input type="submit" value='Add User' />
      </form>
      {
        users.map(user => <li key={user.id}> Id: {user.id}  Name: {user.name}  Email: {user.email}</li>)
      }
    </div>
  );
}

export default App;
