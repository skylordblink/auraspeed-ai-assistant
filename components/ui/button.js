export function Button({ children, className = '', type = 'button', ...props }) {
  const base = 'px-3 py-1 rounded bg-blue-600 text-white';
  return (
    <button
      {...props}
      type={type}
      className={`${base} ${className}`.trim()}
    >
      {children}
    </button>
  );
}
