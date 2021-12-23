import React from 'react';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';

const AppContext = React.createContext();

function App() {
  return (
    <AppContext.Provider>
      <Header />
      <Main />
      <Footer />
    </AppContext.Provider>
  );
}

export default App;
