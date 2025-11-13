export default function Login({ colorizeText }) {
  return (
    <div className="colorful-theme-bg" style={{ padding: 40 }}>
      <h1 style={{ borderBottom: '2px solid #fff', paddingBottom: 12 }}>{colorizeText ? colorizeText('Login') : 'Login'}</h1>
      <form style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 18, maxWidth: 340 }}>
        <label style={{ color: '#fff' }}>
          {colorizeText ? colorizeText('Email') : 'Email'}
          <input type="email" style={{ width: '100%', padding: 10, borderRadius: 8, border: '2px solid #fff', background: '#000', color: '#fff', marginTop: 6 }} placeholder="Enter your email" />
        </label>
        <label style={{ color: '#fff' }}>
          {colorizeText ? colorizeText('Password') : 'Password'}
          <input type="password" style={{ width: '100%', padding: 10, borderRadius: 8, border: '2px solid #fff', background: '#000', color: '#fff', marginTop: 6 }} placeholder="Enter your password" />
        </label>
        <button type="submit" style={{ background: '#000', color: '#fff', border: '2px solid #fff', borderRadius: 8, padding: '12px 0', fontWeight: 'bold', fontSize: 16, cursor: 'pointer' }}>{colorizeText ? colorizeText('Login') : 'Login'}</button>
        <div style={{ marginTop: 12 }}>
          <a href="/signup" style={{ color: '#fff', textDecoration: 'underline' }}>{colorizeText ? colorizeText("Don't have an account? Sign Up") : "Don't have an account? Sign Up"}</a>
        </div>
      </form>
    </div>
  );
}
