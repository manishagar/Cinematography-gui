import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, Image, Folder, FileText, Users, ChartNoAxesColumn, Settings, LogOut, Menu, Search, ChevronLeft, ChevronRight, Plus, Home, File, ArrowUp, ArrowDown, X, Upload, Trash2 } from 'lucide-react';
import '../css/ShreeVaniAdminDashboard.css';
import api from '../utils/axiosConfig';

const menuItems = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/shree-vani/admin/dashboard' },
  { label: 'Banner Management', icon: Image, path: '/shree-vani/admin/banner' },
  { label: 'Folder Management', icon: Folder, path: '/shree-vani/admin/folders' },
  { label: 'File Management', icon: FileText, path: '/shree-vani/admin/files' },
  { label: 'User Management', icon: Users, path: '/shree-vani/admin/users' },
  { label: 'Reports', icon: ChartNoAxesColumn, path: '/shree-vani/admin/reports' },
  { label: 'Settings', icon: Settings, path: '/shree-vani/admin/settings' },
];
const stats = [
  { label: 'Total Files', count: '560', change: '+12%', icon: File, color: 'blue' },
  { label: 'Total Folders', count: '42', change: '+8%', icon: Folder, color: 'green' },
  { label: 'Active Banners', count: '5', change: '+25%', icon: Image, color: 'purple' },
  { label: 'Total Users', count: '15', change: '+0%', icon: Users, color: 'orange' },
];
const initialActivities = [
  { id: 1, icon: FileText, color: 'blue', message: 'Shikha Sharma uploaded Contract.pdf', time: '2 hours ago' },
  { id: 2, icon: Folder, color: 'green', message: 'Manish Agarwal created folder "Marketing"', time: '4 hours ago' },
  { id: 3, icon: Image, color: 'purple', message: 'Banner "Home Page" updated', time: '1 day ago' },
  { id: 4, icon: FileText, color: 'blue', message: 'Aman Singh uploaded Brochure.docx', time: '1 day ago' },
  { id: 5, icon: Users, color: 'orange', message: 'New user "Rohit Kumar" added', time: '2 days ago' },
];
const files = [
  { name: 'Contract.pdf', size: '2 MB', date: '22 Nov 2024', type: 'pdf' },
  { name: 'Brochure.docx', size: '1.2 MB', date: '21 Nov 2024', type: 'doc' },
  { name: 'Pricing.xlsx', size: '850 KB', date: '21 Nov 2024', type: 'xls' },
  { name: 'Presentation.pptx', size: '4 MB', date: '20 Nov 2024', type: 'ppt' },
  { name: 'Policy.pdf', size: '1.5 MB', date: '19 Nov 2024', type: 'pdf' },
];
const banners = [
  { eyebrow: 'A BETTER TOMORROW', title: 'Empowering Your Business\nwith Digital Solutions', description: 'Manage your documents, media and content securely in one place.', button: 'Explore Now' },
  { eyebrow: 'SHREE VANI ADMIN PORTAL', title: 'Organize Your Content\nIn One Secure Place', description: 'Manage folders, files and user permissions with ease.', button: 'View Files' },
  { eyebrow: 'STREAMLINED WORKFLOWS', title: 'Create, Publish\nand Collaborate', description: 'Keep your website banners and media organized.', button: 'Manage Banners' },
];
const initialFolders = [
  {
    id: 'documents', name: 'Documents', children: [
      { id: 'contracts', name: 'Contracts', children: [] },
      { id: 'hr', name: 'HR', children: [] },
      { id: 'finance', name: 'Finance', children: [] },
    ]
  },
  { id: 'images', name: 'Images', children: [] },
  { id: 'videos', name: 'Videos', children: [] },
  { id: 'marketing', name: 'Marketing', children: [] },
];
function FolderNode({ node, depth = 0 }) {
  const [open, setOpen] = useState(depth === 0);
  return (
    <div>
      <button className="svd-tree-row" style={{ paddingLeft: `${depth * 22 + 10}px` }} onClick={() => setOpen(!open)} aria-expanded={open}>
        <span className="svd-tree-chevron">{node.children?.length ? (open ? '⌄' : '›') : '›'}</span>
        <Folder size={21} fill="#ffbf2e" stroke="#ffbf2e" />
        <span>{node.name}</span>
      </button>
      {open && node.children?.map(child => <FolderNode key={child.id} node={child} depth={depth + 1} />)}
    </div>
  );
}
export default function ShreeVaniAdminDashboard() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [bannerIndex, setBannerIndex] = useState(0);
  const [search, setSearch] = useState('');
  const [folders, setFolders] = useState(initialFolders);
  const [activities, setActivities] = useState(initialActivities);
  const [folderModal, setFolderModal] = useState(false);
  const [folderName, setFolderName] = useState('');
  const [notice, setNotice] = useState('');
  const [showAllActivities, setShowAllActivities] = useState(false);
  const [showAllFiles, setShowAllFiles] = useState(false);
  const banner = banners[bannerIndex];
  const userName = 'Admin'; // Replace with authenticated user profile from backend.
  const [loggingOut, setLoggingOut] = useState(false);
  const logoutInProgress = useRef(false);

  const logout = async () => {
    if (logoutInProgress.current) return;
    logoutInProgress.current = true;
    setLoggingOut(true);

    try {
      const storedToken = sessionStorage.getItem('svAdminToken');
      if (storedToken?.trim()) {
        const token = storedToken.trim().replace(/^Bearer\s+/i, '');
        const response = await api.post('/admin/users/admin/logout', null, {
          headers: { Authorization: `Bearer ${token}` },
          timeout: 10000,
        });
        if (String(response.data?.status || '').toUpperCase() !== 'SUCCESS') {
          console.warn('Local logout completed, but the server did not confirm logout.');
        }
      }
    } catch {
      // Do not retain the local session if the API is unavailable or the token expired.
      console.warn('Local logout completed, but the logout API request failed.');
    } finally {
      sessionStorage.removeItem('svAdminToken');
      // Remove a cached default header if the shared client has one.
      if (api.defaults?.headers?.common) {
        delete api.defaults.headers.common.Authorization;
        delete api.defaults.headers.common.authorization;
      }
      navigate('/shree-vani/admin/login', { replace: true });
    }
  };
  useEffect(() => { if (!sessionStorage.getItem('svAdminToken')) navigate('/shree-vani/admin/login', { replace: true }); }, [navigate]);
  const changeBanner = delta => setBannerIndex(current => (current + delta + banners.length) % banners.length);
  const createFolder = e => {
    e.preventDefault();
    const name = folderName.trim();
    if (!name) return;
    setFolders(prev => [...prev, { id: `new-${Date.now()}`, name, children: [] }]);
    setActivities(prev => [{ id: Date.now(), icon: Folder, color: 'green', message: `Created folder "${name}" (local demo)`, time: 'Just now' }, ...prev]);
    setFolderName(''); setFolderModal(false); setNotice(`Folder "${name}" added locally. Connect the folder API to save it.`);
  };
  const searchMatches = [...files.map(f => ({ label: f.name, type: 'File' })), ...folders.map(f => ({ label: f.name, type: 'Folder' }))].filter(item => item.label.toLowerCase().includes(search.toLowerCase()));
  return (
    <div className="svd-app">
      {sidebarOpen && <div className="svd-overlay" onClick={() => setSidebarOpen(false)} />}
      <aside className={`svd-sidebar ${sidebarOpen ? 'svd-sidebar-open' : ''}`}>
        <div className="svd-logo">
          <img
            src="/images/Logo.png"
            alt="Shree Vani logo"
            style={{
              width: 48,
              height: 48,
              objectFit: 'contain',
              flexShrink: 0,
            }}
          />
          <div>
            <strong>Shree Vani</strong>
            <small>Admin Portal</small>
          </div>
        </div>
        <nav className="svd-navigation" aria-label="Admin navigation">
          {menuItems.map(item => <button key={item.label} className={`svd-nav-item ${item.label === 'Dashboard' ? 'active' : ''}`} onClick={() => { setSidebarOpen(false); if (item.label !== 'Dashboard') navigate(item.path); }}><item.icon size={23} fill={item.label === 'Folder Management' ? 'currentColor' : 'none'} /><span>{item.label}</span></button>)}
        </nav>
        <button type="button" className="svd-logout" onClick={logout} disabled={loggingOut} aria-busy={loggingOut}><LogOut size={23} />{loggingOut ? 'Logging out...' : 'Logout'}</button>
      </aside>
      <div className="svd-main-shell">
        <header className="svd-topbar">
          <button className="svd-icon-button" onClick={() => setSidebarOpen(!sidebarOpen)} aria-label="Toggle menu"><Menu size={25} /></button>
          <div className="svd-search-area"><Search size={22} /><input aria-label="Search files, folders, banners" placeholder="Search files, folders, banners..." value={search} onChange={e => setSearch(e.target.value)} />{search && <button onClick={() => setSearch('')} aria-label="Clear search"><X size={16} /></button>}
            {search && <div className="svd-search-results">{searchMatches.length ? searchMatches.map(item => <div key={item.type + item.label}><span>{item.label}</span><small>{item.type}</small></div>) : <p>No matching demo files or folders</p>}</div>}
          </div>
        </header>
        <main className="svd-content">
          <div className="svd-welcome"><div><h1>Welcome Back, {userName}!</h1><p>Here’s what’s happening with your content today.</p></div><span className="svd-date" style={{ color: '#1e293b', backgroundColor: '#f8fafc', border: '1px solid #cbd5e1', padding: '10px 16px', borderRadius: 6, fontSize: 14, fontWeight: 600, lineHeight: 1.5, opacity: 1, flexShrink: 0, maxWidth: '100%', whiteSpace: 'normal' }}>{new Intl.DateTimeFormat('en-IN', { timeZone: 'Asia/Kolkata', weekday: 'long', day: '2-digit', month: 'short', year: 'numeric' }).format(new Date())}</span></div>
          <section className="svd-stats" aria-label="Dashboard statistics">{stats.map(stat => <div className="svd-stat-card" key={stat.label}><span className={`svd-stat-icon ${stat.color}`}><stat.icon size={33} fill={stat.label === 'Total Folders' ? 'currentColor' : 'none'} /></span><div className="svd-stat-copy"><span>{stat.label}</span><strong>{stat.count}</strong><small className={stat.change === '+0%' ? 'muted' : 'positive'}>{stat.change === '+0%' ? <ArrowDown size={13} /> : <ArrowUp size={13} />} {stat.change}</small></div><svg className={`svd-sparkline ${stat.color}`} viewBox="0 0 95 55" aria-hidden="true"><polyline points="0,49 13,36 25,39 39,30 52,20 65,18 77,12 87,15 95,5" /></svg></div>)}</section>
          <section className="svd-banner" aria-label="Featured banners"><div className="svd-banner-overlay" /><button className="svd-banner-arrow left" onClick={() => changeBanner(-1)} aria-label="Previous banner"><ChevronLeft /></button><div className="svd-banner-content"><small>{banner.eyebrow}</small><h2>{banner.title}</h2><p>{banner.description}</p><button className="svd-primary-button" onClick={() => navigate('/shree-vani/admin/files')}>{banner.button} <span>→</span></button></div><div className="svd-banner-side">Ideas<br />Drive<br />Change<div /></div><button className="svd-banner-arrow right" onClick={() => changeBanner(1)} aria-label="Next banner"><ChevronRight /></button><div className="svd-banner-dots">{banners.map((_, i) => <button key={i} className={i === bannerIndex ? 'active' : ''} aria-label={`Go to banner ${i + 1}`} onClick={() => setBannerIndex(i)} />)}</div></section>
          <section className="svd-bottom-grid"><div className="svd-panel"><div className="svd-panel-heading"><h3>Recent Activities</h3><button onClick={() => setShowAllActivities(!showAllActivities)}>{showAllActivities ? 'Show Less' : 'View All'}</button></div><div className="svd-activity-list">{activities.slice(0, showAllActivities ? undefined : 5).map(activity => <div className="svd-activity" key={activity.id}><span className={`svd-activity-icon ${activity.color}`}><activity.icon size={19} /></span><div><p>{activity.message}</p><small>{activity.time}</small></div></div>)}</div></div>
            <div className="svd-panel"><div className="svd-panel-heading"><h3>Latest Files</h3><button onClick={() => setShowAllFiles(!showAllFiles)}>{showAllFiles ? 'Show Less' : 'View All'}</button></div><div className="svd-file-table-wrap"><table className="svd-file-table"><thead><tr><th>Name</th><th>Size</th><th>Uploaded On</th></tr></thead><tbody>{files.slice(0, showAllFiles ? undefined : 5).map(file => <tr key={file.name}><td><span className={`svd-file-type ${file.type}`}>{file.type === 'pdf' ? '⌁' : file.type === 'doc' ? 'W' : file.type === 'xls' ? 'X' : 'P'}</span>{file.name}</td><td>{file.size}</td><td>{file.date}</td></tr>)}</tbody></table></div></div>
            <div className="svd-panel"><div className="svd-panel-heading"><h3>Folder Structure</h3><button className="svd-create-folder" onClick={() => setFolderModal(true)}><Plus size={17} /> Create Folder</button></div><div className="svd-tree"><div className="svd-tree-root"><span>⌄</span><Home size={20} fill="#253b5c" />Root</div>{folders.map(folder => <FolderNode key={folder.id} node={folder} />)}</div></div></section>
          {notice && <div className="svd-notice" role="status">{notice}<button onClick={() => setNotice('')} aria-label="Dismiss"><X size={15} /></button></div>}
        </main>
      </div>
      {folderModal && <div className="svd-modal-backdrop" onClick={() => setFolderModal(false)}><form className="svd-modal" onClick={e => e.stopPropagation()} onSubmit={createFolder}><h3>Create Folder</h3><label htmlFor="new-folder-name">Folder name</label><input id="new-folder-name" autoFocus value={folderName} onChange={e => setFolderName(e.target.value)} maxLength={100} placeholder="Enter folder name" required /><div><button type="button" onClick={() => setFolderModal(false)}>Cancel</button><button className="svd-primary-button" type="submit">Create Folder</button></div></form></div>}
    </div>
  );
}
