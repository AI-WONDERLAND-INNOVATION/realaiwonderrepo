import React, { useState } from 'react';
import { colorizeText } from '../App';

export default function Workshop({ colorizeText }) {
  const [apiKey, setApiKey] = useState(localStorage.getItem('ai_api_key') || '');
  const [features, setFeatures] = useState([
    { key: 'chatbot', label: 'AI Chatbot', enabled: true },
    { key: 'summarizer', label: 'Text Summarizer', enabled: false },
    { key: 'imageGen', label: 'Image Generator', enabled: false },
    { key: 'codeAssist', label: 'Code Assistant', enabled: true },
  ]);
  const [appName, setAppName] = useState('');
  const [aiFeature, setAiFeature] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const mockApps = [
    { name: 'AI Notes', description: 'Take notes with AI assistance.' },
    { name: 'Smart Search', description: 'Search docs with AI.' },
    { name: 'Auto Translate', description: 'Translate content instantly.' },
  ];

  function handleApiKeyChange(e) {
    setApiKey(e.target.value);
  }
  function saveApiKey() {
    localStorage.setItem('ai_api_key', apiKey);
    alert('API key saved!');
  }
  function toggleFeature(idx) {
    setFeatures(f => f.map((feat, i) => i === idx ? { ...feat, enabled: !feat.enabled } : feat));
  }
  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="colorful-theme-bg" style={{ padding: 40, minHeight: '100vh' }}>
      <h1 style={{ marginBottom: 24, fontSize: 32, fontWeight: 'bold' }}>{colorizeText ? colorizeText('AI Workshop') : 'AI Workshop'}</h1>
      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 22, marginBottom: 12 }}>{colorizeText ? colorizeText('API Key Management') : 'API Key Management'}</h2>
        <input
          type="text"
          value={apiKey}
          onChange={handleApiKeyChange}
          placeholder="Enter your AI API key"
          style={{ width: 320, padding: 10, borderRadius: 8, border: '2px solid #fff', background: '#000', color: '#fff', marginRight: 12 }}
        />
        <button onClick={saveApiKey} style={{ background: '#111', color: '#fff', border: '2px solid #fff', borderRadius: 8, padding: '10px 24px', fontWeight: 'bold', fontSize: 16, cursor: 'pointer' }}>
          {colorizeText ? colorizeText('Save Key') : 'Save Key'}
        </button>
      </section>
      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 22, marginBottom: 12 }}>{colorizeText ? colorizeText('AI Features') : 'AI Features'}</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {features.map((feat, idx) => (
            <li key={feat.key} style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 18, cursor: 'pointer' }}>
                <input type="checkbox" checked={feat.enabled} onChange={() => toggleFeature(idx)} style={{ marginRight: 10 }} />
                {colorizeText ? colorizeText(feat.label) : feat.label}
              </label>
            </li>
          ))}
        </ul>
      </section>
      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 22, marginBottom: 12 }}>{colorizeText ? colorizeText('Create AI App') : 'Create AI App'}</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18, maxWidth: 400 }}>
          <label style={{ color: '#fff' }}>
            {colorizeText ? colorizeText('App Name') : 'App Name'}
            <input type="text" value={appName} onChange={e => setAppName(e.target.value)} style={{ width: '100%', padding: 10, borderRadius: 8, border: '2px solid #fff', background: '#000', color: '#fff', marginTop: 6 }} placeholder="Name your app" />
          </label>
          <label style={{ color: '#fff' }}>
            {colorizeText ? colorizeText('AI Feature') : 'AI Feature'}
            <input type="text" value={aiFeature} onChange={e => setAiFeature(e.target.value)} style={{ width: '100%', padding: 10, borderRadius: 8, border: '2px solid #fff', background: '#000', color: '#fff', marginTop: 6 }} placeholder="Describe your AI feature" />
          </label>
          <button type="submit" style={{ background: '#000', color: '#fff', border: '2px solid #fff', borderRadius: 8, padding: '12px 0', fontWeight: 'bold', fontSize: 16, cursor: 'pointer' }}>{colorizeText ? colorizeText('Create App') : 'Create App'}</button>
        </form>
        {submitted && (
          <div style={{ marginTop: 32, color: '#fff', fontSize: 18 }}>
            {colorizeText ? colorizeText(`App "${appName}" with AI feature "${aiFeature}" created using API key "${apiKey}"!`) : `App "${appName}" with AI feature "${aiFeature}" created using API key "${apiKey}"!`}
          </div>
        )}
      </section>
      <section>
        <h2 style={{ fontSize: 22, marginBottom: 12 }}>{colorizeText ? colorizeText('Available Apps & Extensions') : 'Available Apps & Extensions'}</h2>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          {mockApps.map(app => (
            <div key={app.name} style={{ background: '#222', border: '2px solid #fff', borderRadius: 12, padding: 24, minWidth: 180 }}>
              <div style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 8 }}>{colorizeText ? colorizeText(app.name) : app.name}</div>
              <div style={{ fontSize: 15 }}>{colorizeText ? colorizeText(app.description) : app.description}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
