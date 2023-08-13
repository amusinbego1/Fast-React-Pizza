/* eslint-disable react/prop-types */
function ErrorBlock({ message }) {
  return (
    <div className="mx-2 rounded-md bg-red-100 px-4 py-3 text-xs text-red-700">
      {message}
    </div>
  );
}

export default ErrorBlock;
