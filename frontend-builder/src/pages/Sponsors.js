import React, { useState } from 'react';

export default function Sponsors({ colorizeText }) {
  const sponsorTiers = [
    { label: 'Supporter', amount: 5, description: 'Small monthly support' },
    { label: 'Backer', amount: 10, description: 'Monthly backer' },
    { label: 'Patron', amount: 25, description: 'Monthly patron' },
    { label: 'Sponsor', amount: 100, description: 'Organization sponsor' },
  ];
  const recentSponsors = [
    { name: 'Alice', tier: 'Patron', avatar: 'https://via.placeholder.com/48' },
    { name: 'Bob', tier: 'Backer', avatar: 'https://via.placeholder.com/48' },
  ];
  const [selectedTier, setSelectedTier] = useState(sponsorTiers[0].amount);

  const [showPayment, setShowPayment] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [stripeUrl, setStripeUrl] = useState(null);
  const [modal, setModal] = useState({ show: false, type: '', message: '' });
  const [paymentEmail, setPaymentEmail] = useState('');
  const [paymentName, setPaymentName] = useState('');
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const fundingGoal = 1000;
  const currentFunding = 420;

    function handleSponsorClick() {
      setShowPayment(true);
    }

    function validateEmail(email) {
      return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
    }

    function showModal(type, message, details = null) {
      setModal({ show: true, type, message, details });
      setTimeout(() => setModal({ show: false, type: '', message: '', details: null }), 3500);
    }

    async function handlePaymentSubmit(e) {
      e.preventDefault();
      if (!paymentName.trim()) {
        showModal('error', 'Please enter your name.');
        return;
      }
      if (!validateEmail(paymentEmail)) {
        showModal('error', 'Please enter a valid email address.');
        return;
      }
      setPaymentProcessing(true);
      try {
        const intendedCustomer = paymentEmail;
        const resp = await fetch((process.env.REACT_APP_BACKEND_URL || 'http://localhost:4000') + '/create-checkout-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: selectedTier, name: paymentName.trim(), email: paymentEmail.trim(), intendedCustomer }),
        });
        const data = await resp.json();
        if (data && data.url) {
          setStripeUrl(data.url);
          setShowConfirm(true);
          return;
        }
        if (data && data.demo && data.sponsorId) {
          showModal('success', 'Thank you — your sponsorship was recorded (demo). Confirmation sent to both sponsor and customer.');
        }
      } catch (err) {
        console.error(err);
    showModal('error', 'Payment failed or backend not reachable.');
      } finally {
        setPaymentProcessing(false);
        setShowPayment(false);
        setPaymentEmail('');
        setPaymentName('');
      }
    }

    return (
      <div style={{ color: '#fff', background: '#000', minHeight: '100vh', padding: 40 }}>
        {/* Profile card */}
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginBottom: 24 }}>
          {sponsorTiers.map((tier) => (
            <div key={tier.label} style={{ border: selectedTier === tier.amount ? '3px solid #fff' : '2px solid #fff', borderRadius: 12, background: '#222', padding: 24, minWidth: 160, cursor: 'pointer', color: '#fff', textAlign: 'center' }} onClick={() => setSelectedTier(tier.amount)}>
              <div style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 8 }}>${tier.amount}/mo</div>
              <div style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 6 }}>{tier.label}</div>
              <div style={{ fontSize: 15 }}>{tier.description}</div>
            </div>
          ))}
        </div>
        <button
          style={{ background: '#000', color: '#fff', border: '2px solid #fff', borderRadius: 8, padding: '14px 32px', fontWeight: 'bold', fontSize: 18, cursor: 'pointer', marginTop: 8 }}
          onClick={handleSponsorClick}
        >
          Sponsor with Stripe
        </button>
        {/* Payment Modal */}
        {showPayment && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.85)',
            zIndex: 2000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <form
              onSubmit={handlePaymentSubmit}
              style={{
                background: '#111',
                border: '2px solid #fff',
                borderRadius: 16,
                padding: 32,
                minWidth: 340,
                display: 'flex',
                flexDirection: 'column',
                gap: 18,
                color: '#fff',
                boxShadow: '0 2px 24px #000',
              }}
            >
              <h2 style={{ color: '#fff', marginBottom: 8 }}>Sponsor with Stripe</h2>
              <label style={{ color: '#fff' }}>
                Name
                <input
                  type="text"
                  value={paymentName}
                  onChange={e => setPaymentName(e.target.value)}
                  style={{ width: '100%', padding: 10, borderRadius: 8, border: '2px solid #fff', background: '#000', color: '#fff', marginTop: 6 }}
                  required
                />
              </label>
              <label style={{ color: '#fff' }}>
                Email
                <input
                  type="email"
                  value={paymentEmail}
                  onChange={e => setPaymentEmail(e.target.value)}
                  style={{ width: '100%', padding: 10, borderRadius: 8, border: '2px solid #fff', background: '#000', color: '#fff', marginTop: 6 }}
                  required
                />
              </label>
              <div style={{ color: '#fff', fontWeight: 'bold', fontSize: 18, marginBottom: 8 }}>
                Sponsorship Amount: ${selectedTier}/mo
              </div>
              <button
                type="submit"
                style={{ background: '#000', color: '#fff', border: '2px solid #fff', borderRadius: 8, padding: '12px 0', fontWeight: 'bold', fontSize: 16, cursor: 'pointer' }}
                disabled={paymentProcessing}
              >
                {paymentProcessing ? 'Processing...' : 'Sponsor Now'}
              </button>
              <button
                type="button"
                style={{ background: '#111', color: '#fff', border: '2px solid #fff', borderRadius: 8, padding: '8px 0', fontWeight: 'bold', fontSize: 15, cursor: 'pointer', marginTop: 8 }}
                onClick={() => setShowPayment(false)}
                disabled={paymentProcessing}
              >
                Cancel
              </button>
              <div style={{ color: '#fff', fontSize: 13, marginTop: 8 }}>
                <span>Demo only. Integrate Stripe or backend for real payments.</span>
              </div>
            </form>
            {/* Loading Spinner */}
            {paymentProcessing && (
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                <div style={{ border: '6px solid #fff', borderTop: '6px solid #222', borderRadius: '50%', width: 48, height: 48, animation: 'spin 1s linear infinite' }} />
                <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
              </div>
            )}
          </div>
        )}

        {/* Modal for error/success messages with fade animation */}
        <style>{`
          .fade-modal {
            opacity: 0;
            transition: opacity 0.5s;
            pointer-events: none;
          }
          .fade-modal.show {
            opacity: 1;
            pointer-events: auto;
          }
        `}</style>
        <div className={`fade-modal${modal.show ? ' show' : ''}`} style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: modal.type === 'error' ? 'rgba(48,0,0,0.7)' : 'rgba(17,17,51,0.7)',
          zIndex: 4000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{
            background: modal.type === 'error' ? '#300' : '#113',
            border: '2px solid #fff',
            borderRadius: 16,
            padding: 32,
            minWidth: 320,
            color: '#fff',
            boxShadow: '0 2px 24px #000',
            textAlign: 'center',
            fontSize: 18,
            transition: 'transform 0.4s',
            transform: modal.show ? 'scale(1)' : 'scale(0.95)',
          }}>
            <div style={{ fontWeight: 'bold', fontSize: 22, marginBottom: 10 }}>
              {modal.type === 'success' ? 'Payment Successful!' : modal.type === 'error' ? 'Payment Failed' : 'Notification'}
            </div>
            <div>{modal.message}</div>
            {modal.details && (
              <div style={{ marginTop: 12, fontSize: 15, color: '#fff' }}>
                {modal.details}
              </div>
            )}
            {modal.type === 'success' && (
              <div style={{ marginTop: 18, fontSize: 16, color: '#fff' }}>
                Confirmation sent to both sponsor and customer.<br />Thank you for supporting open AI innovation!
              </div>
            )}
          </div>
        </div>
        {/* Recent sponsors */}
        <div style={{ maxWidth: 800, margin: '0 auto', marginBottom: 32, background: '#111', border: '2px solid #fff', borderRadius: 16, padding: 32 }}>
          <h3 style={{ color: '#fff', fontSize: 22, marginBottom: 18 }}>Recent Sponsors</h3>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            {recentSponsors.map((s) => (
              <div key={s.name} style={{ display: 'flex', alignItems: 'center', gap: 16, background: '#222', border: '2px solid #fff', borderRadius: 12, padding: 16, minWidth: 220 }}>
                <img src={s.avatar} alt={s.name} style={{ width: 48, height: 48, borderRadius: '50%', border: '2px solid #fff', background: '#fff', objectFit: 'cover' }} />
                <div>
                  <div style={{ color: '#fff', fontWeight: 'bold', fontSize: 17 }}>{s.name}</div>
                  <div style={{ color: '#fff', fontSize: 15 }}>{s.tier} Sponsor</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Existing sponsor orgs */}
        <div style={{ maxWidth: 800, margin: '0 auto', marginBottom: 32 }}>
          <h3 style={{ color: '#fff', fontSize: 22, marginBottom: 18, textAlign: 'center' }}>Sponsor Organizations</h3>
          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', justifyContent: 'center' }}>
            {[...
              {
                name: 'OpenAI',
                description: 'Supporting AI innovation and research.',
                avatar: 'https://avatars.githubusercontent.com/u/43973679?s=200',
                url: 'https://openai.com',
              },
              {
                name: 'GitHub',
                description: 'Empowering developers worldwide.',
                avatar: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',
                url: 'https://github.com',
              },
              {
                name: 'Microsoft',
                description: 'Advancing technology for everyone.',
                avatar: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
                url: 'https://microsoft.com',
              },
            ].map((sponsor) => (
              <div key={sponsor.name} style={{
                background: '#111',
                border: '2px solid #fff',
                borderRadius: 16,
                width: 220,
                padding: 24,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                boxShadow: '0 2px 12px rgba(255,255,255,0.08)',
                marginBottom: 24,
              }}>
                <img src={sponsor.avatar} alt={sponsor.name} style={{ width: 64, height: 64, borderRadius: '50%', border: '2px solid #fff', marginBottom: 16, background: '#fff', objectFit: 'contain' }} />
                <h3 style={{ color: '#fff', fontSize: 22, margin: '8px 0' }}>{sponsor.name}</h3>
                <p style={{ color: '#fff', fontSize: 15, textAlign: 'center', marginBottom: 16 }}>{sponsor.description}</p>
                <a href={sponsor.url} target="_blank" rel="noopener noreferrer" style={{ color: '#fff', background: '#000', border: '2px solid #fff', borderRadius: 8, padding: '8px 18px', fontWeight: 'bold', textDecoration: 'none', fontSize: 15, marginTop: 8 }}>Visit</a>
              </div>
            ))}
          </div>
        </div>

        {/* Become a sponsor CTA */}
        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <h3 style={{ color: '#fff', fontSize: 22, marginBottom: 12 }}>Become a Sponsor</h3>
          <p style={{ color: '#fff', fontSize: 16, marginBottom: 18 }}>
            Help us build the future of AI. Your support enables open innovation and community growth.
          </p>
          <a href="/contact" style={{ color: '#fff', background: '#000', border: '2px solid #fff', borderRadius: 8, padding: '12px 32px', fontWeight: 'bold', textDecoration: 'none', fontSize: 18 }}>Sponsor Us</a>
        </div>
  {/* End payment modal */}
      {/* Profile card */}
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginBottom: 24 }}>
          {sponsorTiers.map((tier) => (
            <div key={tier.label} style={{ border: selectedTier === tier.amount ? '3px solid #fff' : '2px solid #fff', borderRadius: 12, background: '#222', padding: 24, minWidth: 160, cursor: 'pointer', color: '#fff', textAlign: 'center' }} onClick={() => setSelectedTier(tier.amount)}>
              <div style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 8 }}>${tier.amount}/mo</div>
              <div style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 6 }}>{tier.label}</div>
              <div style={{ fontSize: 15 }}>{tier.description}</div>
            </div>
          ))}
        </div>
        <button
          style={{ background: '#000', color: '#fff', border: '2px solid #fff', borderRadius: 8, padding: '14px 32px', fontWeight: 'bold', fontSize: 18, cursor: 'pointer', marginTop: 8 }}
          onClick={handleSponsorClick}
        >
          Sponsor with Stripe
        </button>
      {/* Payment Modal */}
      {showPayment && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.85)',
          zIndex: 2000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <form
            onSubmit={handlePaymentSubmit}
            style={{
              background: '#111',
              border: '2px solid #fff',
              borderRadius: 16,
              padding: 32,
              minWidth: 340,
              display: 'flex',
              flexDirection: 'column',
              gap: 18,
              color: '#fff',
              boxShadow: '0 2px 24px #000',
            }}
          >
            <h2 style={{ color: '#fff', marginBottom: 8 }}>Sponsor with Stripe</h2>
            <label style={{ color: '#fff' }}>
              Name
              <input
                type="text"
                value={paymentName}
                onChange={e => setPaymentName(e.target.value)}
                style={{ width: '100%', padding: 10, borderRadius: 8, border: '2px solid #fff', background: '#000', color: '#fff', marginTop: 6 }}
                required
              />
            </label>
            <label style={{ color: '#fff' }}>
              Email
              <input
                type="email"
                value={paymentEmail}
                onChange={e => setPaymentEmail(e.target.value)}
                style={{ width: '100%', padding: 10, borderRadius: 8, border: '2px solid #fff', background: '#000', color: '#fff', marginTop: 6 }}
                required
              />
            </label>
            <div style={{ color: '#fff', fontWeight: 'bold', fontSize: 18, marginBottom: 8 }}>
              Sponsorship Amount: ${selectedTier}/mo
            </div>
            <button
              type="submit"
              style={{ background: '#000', color: '#fff', border: '2px solid #fff', borderRadius: 8, padding: '12px 0', fontWeight: 'bold', fontSize: 16, cursor: 'pointer' }}
              disabled={paymentProcessing}
            >
              {paymentProcessing ? 'Processing...' : 'Sponsor Now'}
            </button>
            <button
              type="button"
              style={{ background: '#111', color: '#fff', border: '2px solid #fff', borderRadius: 8, padding: '8px 0', fontWeight: 'bold', fontSize: 15, cursor: 'pointer', marginTop: 8 }}
              onClick={() => setShowPayment(false)}
              disabled={paymentProcessing}
            >
              Cancel
            </button>
            <div style={{ color: '#fff', fontSize: 13, marginTop: 8 }}>
              <span>Demo only. Integrate Stripe or backend for real payments.</span>
            </div>
          </form>
        </div>
      )}

      {/* Custom Stripe Confirmation Modal */}
      {showConfirm && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.85)',
          zIndex: 3000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{
            background: '#111',
            border: '2px solid #fff',
            borderRadius: 16,
            padding: 40,
            minWidth: 340,
            color: '#fff',
            boxShadow: '0 2px 24px #000',
            textAlign: 'center',
          }}>
            <h2 style={{ color: '#fff', marginBottom: 16 }}>Confirm Stripe Payment</h2>
            <p style={{ fontSize: 17, marginBottom: 18 }}>
              You will be redirected to Stripe to complete your sponsorship.<br />
              Click <b>Continue</b> to proceed, or <b>Cancel</b> to go back.
            </p>
            <button
              style={{ background: '#000', color: '#fff', border: '2px solid #fff', borderRadius: 8, padding: '12px 32px', fontWeight: 'bold', fontSize: 18, cursor: 'pointer', marginRight: 16 }}
              onClick={() => {
                setShowConfirm(false);
                if (stripeUrl) window.location.href = stripeUrl;
              }}
            >
              Continue
            </button>
            <button
              style={{ background: '#111', color: '#fff', border: '2px solid #fff', borderRadius: 8, padding: '12px 32px', fontWeight: 'bold', fontSize: 18, cursor: 'pointer', marginLeft: 16 }}
              onClick={() => setShowConfirm(false)}
            >
              Cancel
            </button>
          </div>
        </div>
  )}

      {/* Recent sponsors */}
      <div style={{ maxWidth: 800, margin: '0 auto', marginBottom: 32, background: '#111', border: '2px solid #fff', borderRadius: 16, padding: 32 }}>
        <h3 style={{ color: '#fff', fontSize: 22, marginBottom: 18 }}>Recent Sponsors</h3>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          {recentSponsors.map((s) => (
            <div key={s.name} style={{ display: 'flex', alignItems: 'center', gap: 16, background: '#222', border: '2px solid #fff', borderRadius: 12, padding: 16, minWidth: 220 }}>
              <img src={s.avatar} alt={s.name} style={{ width: 48, height: 48, borderRadius: '50%', border: '2px solid #fff', background: '#fff', objectFit: 'cover' }} />
              <div>
                <div style={{ color: '#fff', fontWeight: 'bold', fontSize: 17 }}>{s.name}</div>
                <div style={{ color: '#fff', fontSize: 15 }}>{s.tier} Sponsor</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Existing sponsor orgs */}
      <div style={{ maxWidth: 800, margin: '0 auto', marginBottom: 32 }}>
        <h3 style={{ color: '#fff', fontSize: 22, marginBottom: 18, textAlign: 'center' }}>Sponsor Organizations</h3>
        <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', justifyContent: 'center' }}>
          {[
            {
              name: 'OpenAI',
              description: 'Supporting AI innovation and research.',
              avatar: 'https://avatars.githubusercontent.com/u/43973679?s=200',
              url: 'https://openai.com',
            },
            {
              name: 'GitHub',
              description: 'Empowering developers worldwide.',
              avatar: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',
              url: 'https://github.com',
            },
            {
              name: 'Microsoft',
              description: 'Advancing technology for everyone.',
              avatar: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
              url: 'https://microsoft.com',
            },
          ].map((sponsor) => (
            <div key={sponsor.name} style={{
              background: '#111',
              border: '2px solid #fff',
              borderRadius: 16,
              width: 220,
              padding: 24,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              boxShadow: '0 2px 12px rgba(255,255,255,0.08)',
              marginBottom: 24,
            }}>
              <img src={sponsor.avatar} alt={sponsor.name} style={{ width: 64, height: 64, borderRadius: '50%', border: '2px solid #fff', marginBottom: 16, background: '#fff', objectFit: 'contain' }} />
              <h3 style={{ color: '#fff', fontSize: 22, margin: '8px 0' }}>{sponsor.name}</h3>
              <p style={{ color: '#fff', fontSize: 15, textAlign: 'center', marginBottom: 16 }}>{sponsor.description}</p>
              <a href={sponsor.url} target="_blank" rel="noopener noreferrer" style={{ color: '#fff', background: '#000', border: '2px solid #fff', borderRadius: 8, padding: '8px 18px', fontWeight: 'bold', textDecoration: 'none', fontSize: 15, marginTop: 8 }}>Visit</a>
            </div>
          ))}
        </div>
      </div>

      {/* Become a sponsor CTA */}
      <div style={{ textAlign: 'center', marginTop: 40 }}>
        <h3 style={{ color: '#fff', fontSize: 22, marginBottom: 12 }}>Become a Sponsor</h3>
        <p style={{ color: '#fff', fontSize: 16, marginBottom: 18 }}>
          Help us build the future of AI. Your support enables open innovation and community growth.
        </p>
        <a href="/contact" style={{ color: '#fff', background: '#000', border: '2px solid #fff', borderRadius: 8, padding: '12px 32px', fontWeight: 'bold', textDecoration: 'none', fontSize: 18 }}>Sponsor Us</a>
      </div>
    </div>
  );

}
