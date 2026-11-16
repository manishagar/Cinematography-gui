import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AdminDashboardPage() {
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('adminAuth') !== 'true') {
      navigate('/admin')
    }
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('adminAuth')
    localStorage.removeItem('adminEmail')
    navigate('/admin')
  }

  return (
    <div className="container dashboard-page">
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark">V<span>.</span></span>
          <span className="brand-copy">
            <strong>CINEMATOGRAPHY</strong>
            <small>ADMIN DASHBOARD</small>
          </span>
        </div>

        <div className="top-actions">
          <span className="pill">Studio Console</span>
          <button className="btn dark" type="button">New Enquiry</button>
          <button className="btn gold" type="button" onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <main className="dashboard">
        <section className="summary">
          <div className="card">
            <div className="label">Total enquiries</div>
            <div className="value">128</div>
            <div className="delta positive">+18% vs last month</div>
          </div>

          <div className="card">
            <div className="label">Upcoming shoots</div>
            <div className="value">14</div>
            <div className="delta warn">3 due this week</div>
          </div>

          <div className="card">
            <div className="label">Portfolio items</div>
            <div className="value">42</div>
            <div className="delta positive">+6 new edits</div>
          </div>

          <div className="card">
            <div className="label">Avg. response</div>
            <div className="value">2h</div>
            <div className="delta positive">Faster than target</div>
          </div>
        </section>

        <section className="layout">
          <div className="panel">
            <div className="panel-header">
              <h3>Recent enquiries</h3>
              <a href="#">View all</a>
            </div>

            <table>
              <thead>
                <tr>
                  <th>Client</th>
                  <th>Service</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Priya & Arjun</td>
                  <td>Signature</td>
                  <td>12 Oct</td>
                  <td><span className="status-tag new">New</span></td>
                </tr>
                <tr>
                  <td>Meera Shah</td>
                  <td>Photography</td>
                  <td>18 Oct</td>
                  <td><span className="status-tag pending">Pending</span></td>
                </tr>
                <tr>
                  <td>Rohan Kapoor</td>
                  <td>Cinematography</td>
                  <td>21 Oct</td>
                  <td><span className="status-tag confirmed">Confirmed</span></td>
                </tr>
                <tr>
                  <td>Neha & Vikas</td>
                  <td>The Complete Story</td>
                  <td>30 Oct</td>
                  <td><span className="status-tag closed">Closed</span></td>
                </tr>
              </tbody>
            </table>
          </div>

          <aside className="panel">
            <div className="panel-header">
              <h3>Quick notes</h3>
              <a href="#">Add</a>
            </div>

            <div className="mini-list">
              <div className="mini-item">
                <strong>Wedding season</strong>
                <p>Priority bookings are filling fast. Confirm final coverage for 3 upcoming shoots.</p>
              </div>

              <div className="mini-item">
                <strong>Portfolio update</strong>
                <p>Two new cinematic edits are ready for approval before publishing to the homepage.</p>
              </div>

              <div className="mini-item">
                <strong>Client follow-up</strong>
                <p>Three enquiries are waiting for a final quote or confirmation call.</p>
              </div>
            </div>
          </aside>
        </section>
      </main>
    </div>
  )
}