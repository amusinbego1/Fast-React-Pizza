/* eslint-disable react/prop-types */
function Badge({ children, color }) {
  return (
    <div
      className={`rounded-full bg-${color}-400 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-stone-100`}
    >
      {children}
    </div>
  );
}

export default Badge;
