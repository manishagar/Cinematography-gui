import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function AdminLoginPage() {
  const navigate = useNavigate()
  const [message, setMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    const email = form.email.value.trim()
    const password = form.password.value.trim()

    if (!email || !password) {
      setMessage('Please enter both your email and password.')
      return
    }

    if (email.includes('@') && password.length >= 6) {
      localStorage.setItem('adminAuth', 'true')
      localStorage.setItem('adminEmail', email)
      setMessage('Login successful. Redirecting...')
      setTimeout(() => navigate('/admin/dashboard'), 700)
    } else {
      setMessage('Invalid email or password. Please try again.')
    }
  }

  return (
    <div className="admin-shell">
      <section className="admin-visual">
        <div className="brand">
          <span className="brand-mark">V<span>.</span></span>
          <span className="brand-copy">
            <strong>CINEMATOGRAPHY</strong>
            <small>ADMIN ACCESS</small>
          </span>
        </div>

        <div className="visual-copy">
          <div className="eyebrow">Private studio control</div>
          <h1>
            Manage your stories,<br />
            <em>behind the scenes.</em>
          </h1>
          <p>
            Review enquiries, update packages, track bookings and keep your creative projects moving with confidence.
          </p>
        </div>
      </section>

      <section className="admin-panel">
        <div className="login-card">
          <div className="eyebrow">Welcome back</div>
          <h2>Admin <em>Login</em></h2>
          <p>Access your dashboard to manage clients, services and project updates.</p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input id="email" name="email" type="email" placeholder="admin@cinematography.com" required />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input id="password" name="password" type="password" placeholder="Enter your password" required />
            </div>

            <div className="admin-actions">
              <label className="remember">
                <input type="checkbox" />
                Keep me signed in
              </label>
              <a className="link" href="#">Need help?</a>
            </div>

            <button type="submit" className="btn gold">Sign in to dashboard</button>

            {message && (
              <div className="status show">{message}</div>
            )}
          </form>

          <div className="meta">
            Back to site: <Link to="/">Home page</Link>
          </div>
        </div>
      </section>
    </div>
  )
}