export default function SignUp({ colorizeText }) {
  return (
    <div className="colorful-theme-bg" style={{ padding: 40 }}>
      <h1 style={{ borderBottom: '2px solid #fff', paddingBottom: 12 }}>{colorizeText ? colorizeText('Sign Up') : 'Sign Up'}</h1>
      <form style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 18, maxWidth: 340 }}>
        <label style={{ color: '#fff' }}>
          {colorizeText ? colorizeText('Name') : 'Name'}
          <input type="text" style={{ width: '100%', padding: 10, borderRadius: 8, border: '2px solid #fff', background: '#000', color: '#fff', marginTop: 6 }} placeholder="Enter your name" />
        </label>
        <label style={{ color: '#fff' }}>
          {colorizeText ? colorizeText('Email') : 'Email'}
          <input type="email" style={{ width: '100%', padding: 10, borderRadius: 8, border: '2px solid #fff', background: '#000', color: '#fff', marginTop: 6 }} placeholder="Enter your email" />
        </label>
        <label style={{ color: '#fff' }}>
          {colorizeText ? colorizeText('Password') : 'Password'}
          <input type="password" style={{ width: '100%', padding: 10, borderRadius: 8, border: '2px solid #fff', background: '#000', color: '#fff', marginTop: 6 }} placeholder="Create a password" />
        </label>
        <button type="submit" style={{ background: '#000', color: '#fff', border: '2px solid #fff', borderRadius: 8, padding: '12px 0', fontWeight: 'bold', fontSize: 16, cursor: 'pointer' }}>{colorizeText ? colorizeText('Sign Up') : 'Sign Up'}</button>
        <div style={{ marginTop: 12 }}>
          <a href="/login" style={{ color: '#fff', textDecoration: 'underline' }}>{colorizeText ? colorizeText('Already have an account? Login') : 'Already have an account? Login'}</a>
        </div>
      </form>
    </div>
  );
}
