export function apiError(e: any): string {
  const d = e?.error?.detail;
  if (Array.isArray(d)) return d.map((x: any) => x.msg ?? x).join(', ');
  if (typeof d === 'string') return d;
  return 'Something went wrong';
}