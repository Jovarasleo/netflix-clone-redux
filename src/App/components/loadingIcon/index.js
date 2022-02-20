import "./index.css";
function Spiner({ className }) {
  const newClass = className + " loaderWrapper";
  return (
    <div className={newClass}>
      <div className="loader center"></div>
    </div>
  );
}
export default Spiner;
