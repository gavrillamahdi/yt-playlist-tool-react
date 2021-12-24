import React from 'react';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';
import { useLocalStorage } from './hooks/useLocalStorage';

const StoredKeyContext = React.createContext();

function App() {
  const [storedKey, setStoredKey] = useLocalStorage('API_KEY', '');
  return (
    <StoredKeyContext.Provider value={{ storedKey, setStoredKey }}>
      <Header />
      <Main />
      <Footer />
    </StoredKeyContext.Provider>
  );
}

export { StoredKeyContext };
export default App;
