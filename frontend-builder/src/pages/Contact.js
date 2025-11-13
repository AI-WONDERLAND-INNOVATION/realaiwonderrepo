export default function Contact({ colorizeText }) {
  return (
    <div className="colorful-theme-bg" style={{ padding: 40 }}>
      <h1 style={{ borderBottom: '2px solid #fff', paddingBottom: 12 }}>{colorizeText ? colorizeText('Contact Us') : 'Contact Us'}</h1>
      <form style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 18, maxWidth: 340 }}>
        <label style={{ color: '#fff' }}>
          {colorizeText ? colorizeText('Name') : 'Name'}
          <input type="text" style={{ width: '100%', padding: 10, borderRadius: 8, border: '2px solid #fff', background: '#000', color: '#fff', marginTop: 6 }} placeholder="Your name" />
        </label>
        <label style={{ color: '#fff' }}>
          {colorizeText ? colorizeText('Email') : 'Email'}
          <input type="email" style={{ width: '100%', padding: 10, borderRadius: 8, border: '2px solid #fff', background: '#000', color: '#fff', marginTop: 6 }} placeholder="Your email" />
        </label>
        <label style={{ color: '#fff' }}>
          {colorizeText ? colorizeText('Message') : 'Message'}
          <textarea style={{ width: '100%', padding: 10, borderRadius: 8, border: '2px solid #fff', background: '#000', color: '#fff', marginTop: 6, minHeight: 80 }} placeholder="Type your message..." />
        </label>
        <button type="submit" style={{ background: '#000', color: '#fff', border: '2px solid #fff', borderRadius: 8, padding: '12px 0', fontWeight: 'bold', fontSize: 16, cursor: 'pointer' }}>{colorizeText ? colorizeText('Send Message') : 'Send Message'}</button>
      </form>
      <div style={{ marginTop: 24 }}>
        <p>{colorizeText ? colorizeText('Or email us directly at') : 'Or email us directly at'} <a href="mailto:support@aiwonderland.com" style={{ color: '#fff', textDecoration: 'underline' }}>{colorizeText ? colorizeText('support@aiwonderland.com') : 'support@aiwonderland.com'}</a></p>
      </div>
    </div>
  );
}
