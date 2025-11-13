
import logo from './logo.svg';
import './App.css';
import './colorfulTheme.css';
import BubbleChat from './components/ai/BubbleChat';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Sponsors from './pages/Sponsors';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import Workshop from './pages/Workshop';


// Utility to colorize each letter/number
export function colorizeText(text) {
  const colors = [
    '#FF5733', '#33FF57', '#3357FF', '#F333FF', '#33FFF5', '#F5FF33', '#FF33A1', '#A133FF', '#33FFA1', '#FFA133',
    '#FF3333', '#33FF33', '#3333FF', '#FF33F3', '#33F3FF', '#F3FF33', '#FF33C1', '#C133FF', '#33FFC1', '#FFC133',
  ];
  return String(text).split('').map((char, i) => (
    <span key={i} style={{ color: colors[i % colors.length] }}>{char}</span>
  ));
}

function Home() {
  return (
    <div className="colorful-theme-bg" style={{ padding: 40 }}>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{colorizeText('Edit src/App.js and save to reload.')}</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          {colorizeText('Learn React')}
        </a>
      </header>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App colorful-theme-bg" style={{ display: 'flex' }}>
        {/* Scrollable left navigation bar */}
        <nav
          style={{
            width: 220,
            height: '100vh',
            background: '#000',
            color: '#fff',
            borderRight: '2px solid #fff',
            overflowY: 'auto',
            position: 'sticky',
            top: 0,
            left: 0,
            padding: '24px 0',
            fontSize: 18,
          }}
        >
          <div style={{ fontWeight: 'bold', marginBottom: 24, textAlign: 'center', letterSpacing: 1 }}>
            {colorizeText('Navigation')}
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {[
              { label: 'Home', to: '/' },
              { label: 'Workshop', to: '/workshop' },
              { label: 'Templates', to: '/templates' },
              { label: 'Marketplace', to: '/marketplace' },
              { label: 'Analytics', to: '/analytics' },
              { label: 'Settings', to: '/settings' },
              { label: 'Login', to: '/login', cta: true },
              { label: 'Sign Up', to: '/signup', cta: true },
              { label: 'Sponsors', to: '/sponsors', cta: true },
              { label: 'FAQ', to: '/faq', cta: true },
              { label: 'Contact Us', to: '/contact', cta: true },
            ].map((item) => (
              <li
                key={item.label}
                style={{
                  padding: '12px 24px',
                  borderBottom: '1px solid #fff',
                  cursor: 'pointer',
                  color: '#fff',
                  fontWeight: item.cta ? 700 : 500,
                  background: item.cta ? '#111' : 'none',
                  borderLeft: item.cta ? '4px solid #fff' : 'none',
                  letterSpacing: item.cta ? 1 : 0,
                }}
              >
                <Link
                  to={item.to}
                  style={{
                    color: '#fff',
                    textDecoration: 'none',
                    fontWeight: item.cta ? 700 : 500,
                    display: 'block',
                  }}
                >
                  {colorizeText(item.label)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        {/* Main content */}
        <div style={{ flex: 1, position: 'relative' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login colorizeText={colorizeText} />} />
            <Route path="/signup" element={<SignUp colorizeText={colorizeText} />} />
            <Route path="/sponsors" element={<Sponsors colorizeText={colorizeText} />} />
            <Route path="/faq" element={<FAQ colorizeText={colorizeText} />} />
            <Route path="/contact" element={<Contact colorizeText={colorizeText} />} />
            {/* Placeholder routes for other nav items */}
            <Route path="/workshop" element={<Workshop />} />
            <Route path="/templates" element={<Home />} />
            <Route path="/marketplace" element={<Home />} />
            <Route path="/analytics" element={<Home />} />
            <Route path="/settings" element={<Home />} />
          </Routes>
          {/* Codespaces-style chat bubble assistant */}
          <div style={{ position: 'fixed', bottom: 32, right: 32, zIndex: 1000 }}>
            <BubbleChat aiName="AI Assistant" />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
