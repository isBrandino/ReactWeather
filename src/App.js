import React, { useState, lazy, Suspense } from 'react';
import loadable from '@loadable/component'
import icon from './img/icon.webp';
import images from './map';
import './App.css';
const Header = lazy(() => import('./Header'));
const MainPanel = loadable(() => import('./MainPanel'))


const renderLoader = () => <p>Welcome..</p>;
const HeaderComponent = () => (
  <Suspense fallback={renderLoader()}>
    <Header />
  </Suspense>
)




// Dont forget to add santizer(for xss) to inputs and inner html
function App() {

  const [background, setBackground] = useState(images.search('default'));
  return (
    <>
      <div className="App" style={{
        backgroundImage: `url(${background})`,
      }}>
        <div className="overlay">
          <a href="/" className="icon">
            <img src={icon} className="icon" alt="Checking The Weather" />
          </a>
        </div>
        <HeaderComponent />
        <MainPanel
          onChangeBackground={(value) => setBackground(images.search(value))}
        />
      </div>
    </>
  );
}
export default App;