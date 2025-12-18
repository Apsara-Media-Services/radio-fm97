export async function isUrlAccessible(url: string) {
  try {
    const res = await fetch(url, { method: 'GET' });
    return res.ok;
  } catch (e) {
    return false;
  }
}
