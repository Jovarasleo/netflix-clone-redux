import "./index.css";
function Spiner({ className }) {
  const newClass = className + " loader center";
  return <div className={newClass}></div>;
}
export default Spiner;
