// Import the required modules and components
import React, { useState, useEffect } from 'react';

// Login page component
const LoginPage = ({ handleLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Simulate authentication
    if (username === 'foo' && password === 'bar') {
      handleLogin();
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input type="text" value={username} onChange={handleUsernameChange} placeholder="Username" required />
      <input type="password" value={password} onChange={handlePasswordChange} placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  );
};

// Main list component
// Main list component
const MainListPage = ({ handleLogout }) => {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    // Fetch initial partial list of contacts
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    setIsLoading(true);

    // Simulate API request delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Fetch contacts from the API
    const response = await fetch(`https://randomuser.me/api/?results=50&page=${page}`);
    const data = await response.json();
    const newContacts = data.results.map((result) => ({
      name: `${result.name.first} ${result.name.last}`,
      photo: result.picture.thumbnail,
    }));

    setContacts((prevContacts) => [...prevContacts, ...newContacts]);
    setIsLoading(false);
  };

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight &&
      !isLoading
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading]);

  useEffect(() => {
    if (page > 1) {
      fetchContacts();
    }
  }, [page]);

  const handleLogoutClick = () => {
    handleLogout();
  };

  return (
    <div>
      <button onClick={handleLogoutClick}>Logout</button>
      <ul>
        {contacts.map((contact, index) => (
          <li key={index}>
            <img src={contact.photo} alt={contact.name} />
            <span>{contact.name}</span>
          </li>
        ))}
      </ul>
      {isLoading && <p>Loading...</p>}
    </div>
  );
};


// App component
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div>
      {isLoggedIn ? (
        <MainListPage handleLogout={handleLogout} />
      ) : (
        <LoginPage handleLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;