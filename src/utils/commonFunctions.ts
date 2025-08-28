export const formatDate = (isoDate: string) => {
 const date = new Date(isoDate);
 const parts = new Intl.DateTimeFormat('de-DE', {
  weekday: 'long',
  day: 'numeric',
 }).formatToParts(date);

 const weekday = parts.find((p) => p.type === 'weekday')?.value ?? '';
 const day = parts.find((p) => p.type === 'day')?.value ?? '';

 return `${weekday} ${day}`;
};
