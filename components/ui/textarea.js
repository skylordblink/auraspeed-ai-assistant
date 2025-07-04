export function Textarea({ className = '', ...props }) {
  const base = 'w-full p-2 rounded bg-zinc-800 text-white';
  return (
    <textarea
      {...props}
      className={`${base} ${className}`.trim()}
    />
  );
}
