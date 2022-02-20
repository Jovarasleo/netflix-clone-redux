import "./index.css";
function Form({ className, children, background }) {
  const newClass = "form".concat(" ", className);
  const newClass2 = "formWrapper".concat(" ", background);
  return (
    <>
      <div className={newClass2}>
        <form className={newClass} onSubmit={(e) => e.preventDefault()}>
          <div className="innerFormWrapper">{children}</div>
        </form>
      </div>
    </>
  );
}
export default Form;
