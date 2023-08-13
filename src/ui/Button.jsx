/* eslint-disable react/prop-types */
function Button({
  children,
  onClick,
  isDisabled,
  isCircle,
  isSecondary,
  name,
  id,
  value,
}) {
  const bg_color = isSecondary ? "transparent" : "yellow";
  const color = isSecondary ? "stone" : "yellow";

  return (
    <button
      className={`inline-block rounded-full focus:outline-none focus:ring focus:ring-${color}-500 bg-${bg_color}-500 px-3.5 focus:ring-offset-1 py-${
        isCircle ? 1 : 2
      }  font-semibold uppercase transition-colors duration-200 hover:bg-${color}-400  disabled:cursor-not-allowed ${
        isSecondary
          ? `border  border-${color}-400 text-${color}-400  hover:text-${color}-100`
          : ""
      }`}
      onClick={onClick}
      disabled={isDisabled}
      name={name}
      value={value}
      id={id}
    >
      {children}
    </button>
  );
}

export default Button;
