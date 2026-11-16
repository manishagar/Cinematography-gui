import api from '../utils/axiosConfig';

function headers() {
  const token = sessionStorage.getItem('svAdminToken')?.trim().replace(/^Bearer\s+/i, '');
  if (!token) throw new Error('Please sign in as admin.');
  return { Authorization: `Bearer ${token}` };
}
export function apiError(error) {
  const data = error.response?.data;
  if (Array.isArray(data?.messages) && data.messages.length) return data.messages.join(', ');
  if (error.response?.status === 401) return 'Your session expired. Please sign in again.';
  if (error.response?.status === 403) return 'Admin access is required.';
  if (error.response?.status === 413) return 'Maximum image size is 10 MB.';
  return data?.message || error.message || 'Unable to process the banner request.';
}
export async function createBanner(details, file) {
  const form = new FormData();
  form.append('details', new Blob([JSON.stringify(details)], { type: 'application/json' }));
  if (details.bannerType === 'IMAGE' && file) form.append('image', file);
  const { data } = await api.post('/admin/users/admin/banners', form, { headers: headers() });
  if (data.status !== 'SUCCESS') throw new Error(data.messages?.join(', ') || 'Unable to save banner.');
  return data.data;
}
export async function listBanners(page = 0, admin = false, signal) {
  const { data } = await api.get(admin ? '/admin/users/admin/banners' : '/api/public/banners', {
    params: { page, size: 12 }, signal, ...(admin ? { headers: headers() } : {}),
  });
  if (data.status !== 'SUCCESS') throw new Error(data.messages?.join(', ') || 'Unable to load banners.');
  return data.data;
}
export async function deactivateBanner(id) {
  const { data } = await api.delete(`/admin/users/admin/banners/${id}`, { headers: headers() });
  if (data.status !== 'SUCCESS') throw new Error(data.messages?.join(', ') || 'Unable to deactivate banner.');
}
export async function fetchBannerImage(path, admin = false, signal) {
  const { data } = await api.get(path, {
    responseType: 'blob', signal, ...(admin ? { headers: headers() } : {}),
  });
  return data;
}
