export default function FAQ({ colorizeText }) {
  return (
    <div className="colorful-theme-bg" style={{ padding: 40 }}>
      <h1 style={{ borderBottom: '2px solid #fff', paddingBottom: 12 }}>{colorizeText ? colorizeText('FAQ') : 'FAQ'}</h1>
      <div style={{ marginTop: 32 }}>
        <h2 style={{ color: '#fff', borderBottom: '1px solid #fff', paddingBottom: 8 }}>{colorizeText ? colorizeText('Frequently Asked Questions') : 'Frequently Asked Questions'}</h2>
        <ul style={{ marginTop: 18, paddingLeft: 0, listStyle: 'none' }}>
          <li style={{ marginBottom: 16, border: '2px solid #fff', borderRadius: 8, padding: 16 }}>
            <strong>{colorizeText ? colorizeText('What is AI Wonderland?') : 'What is AI Wonderland?'}</strong><br />
            {colorizeText ? colorizeText('AI Wonderland is a platform for building, testing, and deploying AI-powered applications.') : 'AI Wonderland is a platform for building, testing, and deploying AI-powered applications.'}
          </li>
          <li style={{ marginBottom: 16, border: '2px solid #fff', borderRadius: 8, padding: 16 }}>
            <strong>{colorizeText ? colorizeText('How do I get started?') : 'How do I get started?'}</strong><br />
            {colorizeText ? colorizeText('Sign up for an account and explore our workshop and templates to begin your journey.') : 'Sign up for an account and explore our workshop and templates to begin your journey.'}
          </li>
          <li style={{ marginBottom: 16, border: '2px solid #fff', borderRadius: 8, padding: 16 }}>
            <strong>{colorizeText ? colorizeText('Who can I contact for support?') : 'Who can I contact for support?'}</strong><br />
            {colorizeText ? colorizeText('Use the Contact Us page to reach our support team.') : 'Use the Contact Us page to reach our support team.'}
          </li>
        </ul>
      </div>
    </div>
  );
}
