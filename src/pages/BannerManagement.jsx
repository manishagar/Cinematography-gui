import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, Image, Folder, FileText, Users, ChartNoAxesColumn, Settings, LogOut, Menu, X } from 'lucide-react';
import api from '../utils/axiosConfig';
import '../css/ShreeVaniAdminDashboard.css';
import BannerCard from '../components/BannerCard';
import { apiError, createBanner, deactivateBanner, listBanners } from '../components/bannerApi';
import '../css/Banners.css';

const menuItems = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/shree-vani/admin/dashboard' },
  { label: 'Banner Management', icon: Image, path: '/shree-vani/admin/banner' },
  { label: 'Folder Management', icon: Folder, path: '/shree-vani/admin/folders' },
  { label: 'File Management', icon: FileText, path: '/shree-vani/admin/files' },
  { label: 'User Management', icon: Users, path: '/shree-vani/admin/users' },
  { label: 'Reports', icon: ChartNoAxesColumn, path: '/shree-vani/admin/reports' },
  { label: 'Settings', icon: Settings, path: '/shree-vani/admin/settings' },
];

const initial = {
  bannerType: 'IMAGE', title: '', subtitle: '', altText: '',
  backgroundColor: '#0f172a', textColor: '#ffffff',
  displayOrder: 0, active: true, startsAt: '', endsAt: '',
};
export default function BannerManagement() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
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

  const [form, setForm] = useState(initial);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [saving, setSaving] = useState(false);
  const savingRef = useRef(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [result, setResult] = useState({ items: [], totalPages: 0 });
  const [page, setPage] = useState(0);
  const [reload, setReload] = useState(0);
  const [loading, setLoading] = useState(true);
  const [listError, setListError] = useState('');
  const [deactivating, setDeactivating] = useState(null);
  const fileInput = useRef(null);

  useEffect(() => {
    if (!file) { setPreview(''); return; }
    const url = URL.createObjectURL(file); setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true); setListError('');
    listBanners(page, true, controller.signal)
      .then(data => { if (!controller.signal.aborted) setResult(data); })
      .catch(err => { if (!controller.signal.aborted) setListError(apiError(err)); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [page, reload]);

  function change(event) {
    const { name, value, type, checked } = event.target;
    setForm(previous => ({ ...previous, [name]: type === 'checkbox' ? checked : value }));
  }
  function chooseType(type) {
    setForm(previous => ({ ...previous, bannerType: type }));
    setFile(null); setError('');
    if (fileInput.current) fileInput.current.value = '';
  }
  function chooseFile(event) {
    setError('');
    const selected = event.target.files?.[0];
    if (!selected) { setFile(null); return; }
    if (!['image/png', 'image/jpeg'].includes(selected.type) || selected.size === 0 || selected.size > 10 * 1024 * 1024) {
      setError('Choose a nonempty PNG or JPEG file up to 10 MB.');
      event.target.value = ''; setFile(null); return;
    }
    setFile(selected);
  }
  async function submit(event) {
    event.preventDefault();
    if (savingRef.current) return;
    setError(''); setMessage('');
    if (!form.title.trim()) { setError('Enter a title.'); return; }
    if (form.bannerType === 'IMAGE' && !file) { setError('Choose a banner image.'); return; }
    const order = Number(form.displayOrder);
    if (!Number.isInteger(order) || order < 0 || order > 2147483647) { setError('Display order must be a nonnegative whole number.'); return; }
    const startsAt = form.startsAt ? new Date(form.startsAt).toISOString() : null;
    const endsAt = form.endsAt ? new Date(form.endsAt).toISOString() : null;
    if (startsAt && endsAt && new Date(endsAt) <= new Date(startsAt)) { setError('End date must be after start date.'); return; }
    savingRef.current = true; setSaving(true);
    try {
      await createBanner({ ...form, title: form.title.trim(), displayOrder: order, startsAt, endsAt }, file);
      setMessage('Banner saved successfully.'); setForm(initial); setFile(null);
      if (fileInput.current) fileInput.current.value = '';
      setPage(0); setReload(value => value + 1);
    } catch (err) { setError(apiError(err)); }
    finally { savingRef.current = false; setSaving(false); }
  }
  async function deactivate(id) {
    if (deactivating !== null) return;
    setDeactivating(id); setMessage(''); setListError('');
    try {
      await deactivateBanner(id); setMessage('Banner deactivated successfully.');
      setReload(value => value + 1);
    } catch (err) { setListError(apiError(err)); }
    finally { setDeactivating(null); }
  }
  return <div className="svd-app svb-admin-shell">
      <style>{`
        .svb-admin-shell { min-height: 100vh; background: #f5f7fb; }
        .svb-admin-shell .svd-sidebar { width: 258px; position: fixed; inset: 0 auto 0 0; height: 100dvh; display: flex; flex-direction: column; background: #192f4b; color: #fff; z-index: 60; overflow-y: auto; }
        .svb-admin-shell .svd-logo { display: flex; gap: 14px; align-items: center; padding: 20px 24px; border-bottom: 1px solid #30435c; }
        .svb-admin-shell .svd-logo strong { display: block; color: #fff; font-size: 23px; line-height: 1.2; }
        .svb-admin-shell .svd-logo small { display: block; color: #fff; margin-top: 4px; }
        .svb-admin-shell .svd-navigation { flex: 1; padding: 20px 10px; }
        .svb-admin-shell .svd-nav-item { width: 100%; display: flex; align-items: center; gap: 18px; padding: 16px; margin-bottom: 6px; border: 0; border-radius: 6px; color: #fff; background: transparent; text-align: left; cursor: pointer; }
        .svb-admin-shell .svd-nav-item.active { background: linear-gradient(100deg, #1859bd, #2476e4); color: #fff; }
        .svb-admin-shell .svd-nav-item:hover { background-color: #28496e; }
        .svb-admin-shell .svd-logout { display: flex; align-items: center; gap: 20px; width: 100%; margin: 0; padding: 22px 26px; border: 0; border-top: 1px solid #30435c; background: transparent; color: #fff; cursor: pointer; }
        .svb-admin-shell .svd-logout:disabled { opacity: .6; cursor: wait; }
        .svb-admin-shell .svd-main-shell { margin-left: 258px; width: calc(100% - 258px); min-width: 0; }
        .svb-admin-shell .svd-topbar { display: flex; align-items: center; gap: 14px; padding: 16px 24px; min-height: 64px; background: #fff; color: #17233b; border-bottom: 1px solid #d5deea; }
        .svb-admin-shell .svb-menu-toggle { display: none; }
        .svb-admin-shell .svb-management { width: 100%; max-width: none; margin: 0; min-height: calc(100dvh - 64px); }
        .svb-admin-shell .svb-sidebar-close { display: none; }
        .svb-admin-shell :focus-visible { outline: 3px solid #60a5fa; outline-offset: 2px; }
        @media (max-width: 900px) {
          .svb-admin-shell .svd-sidebar { transform: translateX(-100%); transition: transform .2s; }
          .svb-admin-shell .svd-sidebar.svd-sidebar-open { transform: translateX(0); }
          .svb-admin-shell .svd-sidebar:not(.svd-sidebar-open) { visibility: hidden; }
          .svb-admin-shell .svd-main-shell { margin-left: 0; width: 100%; }
          .svb-admin-shell .svb-menu-toggle { display: inline-flex; padding: 8px; border: 1px solid #cbd5e1; border-radius: 5px; background: #fff; color: #17233b; }
          .svb-admin-shell .svb-sidebar-close { display: inline-flex; margin: 8px 12px 0 auto; padding: 8px; border: 1px solid #71849d; border-radius: 5px; background: transparent; color: #fff; }
          .svb-admin-shell .svd-overlay { position: fixed; inset: 0; z-index: 50; background: rgba(15, 23, 42, .5); border: 0; }
        }
        @media (prefers-reduced-motion: reduce) { .svb-admin-shell .svd-sidebar { transition: none; } }
        .svb-admin-shell .svb-management { background: #f6f7fb; color: #131b33; box-sizing: border-box; padding: clamp(16px, 3vw, 42px); }
        .svb-workspace { max-width: 1440px; margin-inline: auto; }
        .svb-admin-shell .svb-editor-layout { display: grid; grid-template-columns: minmax(0, 1.12fr) minmax(0, 1fr); gap: 24px; align-items: start; }
        .svb-admin-shell :is(.svb-form, .svb-preview, .svb-saved-tile) { min-width: 0; padding: clamp(16px, 2vw, 24px); background: #fff; border: 1px solid #e3e1ed; border-radius: 18px; box-shadow: 0 8px 22px #23174309; }
        .svb-admin-shell .svb-form fieldset { display: grid; gap: 15px; min-width: 0; margin: 0; padding: 0; border: 0; }
        .svb-admin-shell :is(.svb-form legend, .svb-preview h2, .svb-library h2) { font-size: 1.25rem; line-height: 1.3; margin: 0 0 16px; padding: 0; font-weight: 750; }
        .svb-admin-shell .svb-radio-group { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; margin: 0; }
        .svb-admin-shell .svb-radio-group label { display: flex; align-items: center; gap: 8px; padding: 10px; border: 1px solid #dfdbe9; border-radius: 10px; cursor: pointer; }
        .svb-admin-shell .svb-radio-group label:has(input:checked) { background: #f3ecff; border-color: #8852ce; color: #48227b; }
        .svb-admin-shell .svb-form input { accent-color: #6234a2; }
        .svb-admin-shell .svb-field { display: grid; gap: 6px; min-width: 0; margin: 0; }
        .svb-admin-shell .svb-field label { font-size: .875rem; font-weight: 650; }
        .svb-admin-shell .svb-field :is(input, textarea) { box-sizing: border-box; width: 100%; min-width: 0; min-height: 42px; padding: 9px 10px; border: 1px solid #d9d5e3; border-radius: 9px; background: #fcfbfe; color: #131b33; font: inherit; }
        .svb-admin-shell .svb-field textarea { resize: vertical; }
        .svb-admin-shell .svb-field input[type=file] { border-style: dashed; padding: 10px; }
        .svb-admin-shell .svb-field input::file-selector-button { padding: 7px 10px; margin-inline-end: 8px; border: 0; border-radius: 6px; background: #f0e7fc; color: #48227b; cursor: pointer; }
        .svb-admin-shell .svb-field-pair { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
        .svb-admin-shell .svb-form small { color: #55546b; }
        .svb-admin-shell .svb-primary { justify-self: start; padding: 11px 20px; background: #6234a2; color: white; border: 0; border-radius: 9px; font-weight: 700; cursor: pointer; }
        .svb-admin-shell .svb-primary:not(:disabled):hover { background: #4e2489; }
        .svb-admin-shell button:disabled { cursor: default; }
        .svb-admin-shell .svb-card { overflow: hidden; border-radius: 12px; overflow-wrap: anywhere; }
        .svb-admin-shell .svb-card-image { display: grid; place-items: center; aspect-ratio: 16 / 9; overflow: hidden; }
        .svb-admin-shell .svb-card-image img { display: block; width: 100%; height: 100%; object-fit: cover; }
        .svb-admin-shell .svb-placeholder { display: grid; place-items: center; aspect-ratio: 16 / 9; margin: 0; padding-inline: 12px; background: #ffffff18; text-align: center; }
        .svb-admin-shell .svb-card-copy { padding: 16px; }
        .svb-admin-shell .svb-card-copy h3 { margin: 0; }
        .svb-admin-shell .svb-card-copy p { margin: 6px 0 0; }
        .svb-library { margin-top: 30px; }
        .svb-admin-shell .svb-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr)); gap: 16px; }
        .svb-admin-shell .svb-saved-tile { display: flex; flex-direction: column; justify-content: space-between; gap: 10px; padding: 12px; }
        .svb-admin-shell .svb-card-actions { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 8px; color: #55546b; font-size: .82rem; }
        .svb-admin-shell :is(.svb-card-actions, .svb-pagination) button { padding: 7px 10px; border: 1px solid #ded7eb; border-radius: 8px; background: #faf7ff; color: #48227b; font: inherit; }
        .svb-admin-shell .svb-pagination { display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 10px; margin-top: 16px; }
        .svb-admin-shell .svb-list-status { padding: 24px; border: 1px dashed #d9d5e3; border-radius: 14px; background: #fff; }
        @media (max-width: 1100px) and (min-width: 901px), (max-width: 720px) {
          .svb-admin-shell .svb-editor-layout { grid-template-columns: minmax(0, 1fr); }
        }
        @media (max-width: 420px) {
          .svb-admin-shell .svb-field-pair { grid-template-columns: minmax(0, 1fr); }
        }
      `}</style>
      {sidebarOpen && <button type="button" className="svd-overlay" aria-label="Close sidebar" onClick={() => setSidebarOpen(false)} />}
      <aside id="svb-admin-sidebar" aria-label="Admin sidebar" className={`svd-sidebar ${sidebarOpen ? 'svd-sidebar-open' : ''}`}>
        <button type="button" className="svb-sidebar-close" aria-label="Close menu" onClick={() => setSidebarOpen(false)}><X size={20} /></button>
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
          {menuItems.map(item => <button type="button" aria-current={item.label === 'Banner Management' ? 'page' : undefined} key={item.label} className={`svd-nav-item ${item.label === 'Banner Management' ? 'active' : ''}`} onClick={() => { setSidebarOpen(false); navigate(item.path); }}><item.icon size={23} fill={item.label === 'Folder Management' ? 'currentColor' : 'none'} /><span>{item.label}</span></button>)}
        </nav>
        <button type="button" className="svd-logout" onClick={logout} disabled={loggingOut} aria-busy={loggingOut}><LogOut size={23} />{loggingOut ? 'Logging out...' : 'Logout'}</button>
      </aside>
      <div className="svd-main-shell">
        <header className="svd-topbar">
          <button type="button" className="svb-menu-toggle" aria-label="Toggle admin menu" aria-controls="svb-admin-sidebar" aria-expanded={sidebarOpen} onClick={() => setSidebarOpen(value => !value)}><Menu size={24} /></button>
          <strong>Banner Management</strong>
        </header>
        <main className="svb-management">
          <div className="svb-workspace">

    {message && <p className="svb-success" role="status">{message}</p>}
    <div className="svb-editor-layout">
      <form className="svb-form" onSubmit={submit}>
        <fieldset disabled={saving}>
          <legend>Create banner</legend>
          <div className="svb-radio-group">
            <label><input type="radio" name="bannerType" value="IMAGE" checked={form.bannerType === 'IMAGE'} onChange={() => chooseType('IMAGE')} /> Upload Image</label>
            <label><input type="radio" name="bannerType" value="TEXT" checked={form.bannerType === 'TEXT'} onChange={() => chooseType('TEXT')} /> Write Text</label>
          </div>
          {form.bannerType === 'IMAGE' && <div className="svb-field">
            <label htmlFor="svb-image">Banner image</label>
            <input ref={fileInput} id="svb-image" type="file" accept="image/png,image/jpeg" onChange={chooseFile} required />
            <small>PNG or JPEG, maximum 10 MB. Suggested shape: 16:9.</small>
          </div>}
          <div className="svb-field"><label htmlFor="svb-title">Title</label><input id="svb-title" name="title" value={form.title} onChange={change} maxLength={200} required placeholder="Welcome to Shree Vani" /></div>
          <div className="svb-field"><label htmlFor="svb-subtitle">Description</label><textarea id="svb-subtitle" name="subtitle" value={form.subtitle} onChange={change} maxLength={1000} rows={4} placeholder="Write your announcement here..." /></div>
          {form.bannerType === 'IMAGE' && <div className="svb-field"><label htmlFor="svb-alt">Image description for accessibility</label><input id="svb-alt" name="altText" value={form.altText} onChange={change} maxLength={250} placeholder="Describe the banner image" /></div>}
          <div className="svb-field-pair">
            <div className="svb-field"><label htmlFor="svb-bg">Background colour</label><input id="svb-bg" name="backgroundColor" type="color" value={form.backgroundColor} onChange={change} /></div>
            <div className="svb-field"><label htmlFor="svb-fg">Text colour</label><input id="svb-fg" name="textColor" type="color" value={form.textColor} onChange={change} /></div>
          </div>
          <div className="svb-field-pair">
            <div className="svb-field"><label htmlFor="svb-start">Start date (optional)</label><input id="svb-start" type="datetime-local" name="startsAt" value={form.startsAt} onChange={change} /></div>
            <div className="svb-field"><label htmlFor="svb-end">End date (optional)</label><input id="svb-end" type="datetime-local" name="endsAt" value={form.endsAt} onChange={change} /></div>
          </div>
          <small>Dates use your browser’s local time zone and are sent to the server as UTC.</small>
          <label className="svb-checkbox"><input type="checkbox" name="active" checked={form.active} onChange={change} /> Active</label>
          {error && <p role="alert" className="svb-error">{error}</p>}
          <button className="svb-primary" type="submit">{saving ? 'Saving...' : 'Save Banner'}</button>
        </fieldset>
      </form>
      <aside className="svb-preview" aria-label="Banner preview">
        <h2>Live preview</h2>
        <article className="svb-card" style={{ backgroundColor: form.backgroundColor, color: form.textColor }}>
          {form.bannerType === 'IMAGE' && (preview ? <div className="svb-card-image"><img src={preview} alt={form.altText || 'Selected banner'} /></div> : <p className="svb-placeholder">Choose an image to preview</p>)}
          <div className="svb-card-copy"><h3>{form.title || 'Your banner title'}</h3><p>{form.subtitle || 'Your announcement appears here.'}</p></div>
        </article>
      </aside>
    </div>
    <section className="svb-library" aria-labelledby="svb-saved-heading">
    <h2 id="svb-saved-heading">Saved banners</h2>
    {loading ? <p className="svb-list-status" role="status">Loading banners...</p> : listError ? <p className="svb-error" role="alert">{listError}</p> : <>
      {!result.items.length && <p className="svb-list-status">No banners yet. Create your first banner above.</p>}
      <div className="svb-grid">{result.items.map(banner => <div className="svb-saved-tile" key={banner.id}>
        <BannerCard banner={banner} admin />
        <div className="svb-card-actions"><span>{banner.bannerType} · {banner.active ? 'Enabled (subject to schedule)' : 'Inactive'}</span>
          {banner.active && <button disabled={deactivating !== null} onClick={() => deactivate(banner.id)}>{deactivating === banner.id ? 'Deactivating...' : 'Deactivate'}</button>}
        </div>
      </div>)}</div>
      {result.totalPages > 1 && <nav className="svb-pagination" aria-label="Admin banner pages">
        <button disabled={page === 0} onClick={() => setPage(p => p - 1)}>Previous</button>
        <span>Page {page + 1} of {result.totalPages}</span>
        <button disabled={page + 1 >= result.totalPages} onClick={() => setPage(p => p + 1)}>Next</button>
      </nav>}
    </>}
    </section>
          </div>
        </main>
      </div>
    </div>;
}
