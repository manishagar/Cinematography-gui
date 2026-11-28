import api from '../utils/axiosConfig';

function headers() {
  const token = sessionStorage.getItem('svAdminToken')?.trim().replace(/^Bearer\s+/i, '');
  if (!token) throw new Error('Please sign in as admin.');
  return { Authorization: `Bearer ${token}` };
}
const GENERIC_ERROR = /^API executed with errors!?$/i;

function getResponseData(error) {
  let data =
    error?.response?.data ??
    error?.data ??
    error;

  if (typeof data === 'string') {
    try {
      data = JSON.parse(data);
    } catch {
      data = { message: data };
    }
  }

  return data;
}

function extractMessages(data) {
  const raw = [
    ...(Array.isArray(data?.messages)
      ? data.messages
      : data?.messages ? [data.messages] : []),

    ...(Array.isArray(data?.errors)
      ? data.errors
      : data?.errors ? [data.errors] : []),

    ...(data?.message ? [data.message] : [])
  ];

  return raw
    .map(item =>
      typeof item === 'string'
        ? item
        : item?.field ? `${item.field}: ${item.defaultMessage || item.message || ''}` : item?.defaultMessage || item?.message || ''
    )
    .flatMap(message => message.split('\n'))
    .map(message => message.trim())
    .filter(message =>
      message && !GENERIC_ERROR.test(message)
    );
}

function responseMessage(data) {
  return extractMessages(data)
    .map(message =>
      message.replace(
        /^[a-zA-Z][\w.]*\s*:\s*/,
        ''
      ).trim()
    )
    .join('\n');
}

export function getFieldErrors(error) {
  const data = getResponseData(error);
  const fields = {};

  const knownFields = [
    'title',
    'subtitle',
    'altText',
    'image',
    'backgroundColor',
    'textColor',
    'startsAt',
    'endsAt',
    'bannerType',
    'active'
  ];

  const messages = extractMessages(data);

  messages.forEach(message => {
    const match = message.match(
      /^([a-zA-Z][\w.]*)\s*:\s*(.+)$/
    );

    if (match) {
      const key = match[1].split('.').pop();
      const field = key === 'file' ? 'image' : key;
      const text = match[2].trim();

      if (knownFields.includes(field)) {
        fields[field] = [...new Set([...(fields[field]?.split('\n') || []), text])].join('\n');
      }
    }
  });

  return fields;
}

export function getGeneralErrors(error) {
  const fields = getFieldErrors(error);
  return [...new Set(extractMessages(getResponseData(error)).filter(message => {
    const match = message.match(/^([a-zA-Z][\w.]*)\s*:\s*(.+)$/);
    if (!match) return true;
    const key = match[1].split('.').pop();
    return !Object.hasOwn(fields, key === 'file' ? 'image' : key);
  }))].join('\n');
}

export function apiError(error) {
  const data = getResponseData(error);
  const status = error?.response?.status;

  if (status === 401) {
    return 'Your session expired. Please sign in again.';
  }

  if (status === 403) {
    return 'Admin access is required.';
  }

  if (status === 413) {
    return 'Maximum image size is 10 MB.';
  }

  return (
    responseMessage(data) ||
    error?.message ||
    'Unable to process the banner request.'
  );
}

function validateResponse(data) {
  if (
    String(data?.status || '').toUpperCase() !== 'SUCCESS'
  ) {
    const error = new Error(
      responseMessage(data) || 'Unable to save banner.'
    );

    error.data = data;
    throw error;
  }
}

export async function createBanner(details, file) {
  if (details.bannerType === 'TEXT') {
    const { data } = await api.post('/admin/users/admin/banner/add', details, {
      headers: { ...headers(), 'Content-Type': 'application/json' },
    });
    validateResponse(data);
    return data.data;
  }

  const form = new FormData();
  form.append('bannerDetails', new Blob([JSON.stringify(details)], { type: 'application/json' }));
  if (details.bannerType === 'IMAGE' && file) form.append('file', file);
  const { data } = await api.post('/admin/users/admin/banner/add', form, { headers: headers() });
  validateResponse(data);
  return data.data;
}
export async function listBanners(page = 0, admin = false, signal) {
  const { data } = await api.get(admin ? '/admin/users/admin/banners' : '/api/public/banners', {
    params: { page, size: 12 }, signal, ...(admin ? { headers: headers() } : {}),
  });
  if (String(data?.status || '').toUpperCase() !== 'SUCCESS') throw new Error(responseMessage(data) || 'Unable to load banners.');
  return data.data;
}
export async function deactivateBanner(id) {
  const { data } = await api.delete(`/admin/users/admin/banners/${id}`, { headers: headers() });
  if (String(data?.status || '').toUpperCase() !== 'SUCCESS') throw new Error(responseMessage(data) || 'Unable to deactivate banner.');
}
export async function fetchBannerImage(path, admin = false, signal) {
  const { data } = await api.get(path, {
    responseType: 'blob', signal, ...(admin ? { headers: headers() } : {}),
  });
  return data;
}
