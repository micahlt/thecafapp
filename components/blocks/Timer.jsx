import styles from "../../styles/Timer.module.css";
import ft from "friendly-time";
import { stringify as du } from "simple-duration";
import { useEffect, useState } from "react";

/**
 * @desc Block that provides a countdown to the current meal's end time if a meal is in session or the next meal's start time if a meal is not in session.
 */
export default function Timer({ meal, error }) {
  const [method, setMethod] = useState(null);
  const [date, setDate] = useState(new Date());
  useEffect(() => {
    if (localStorage.getItem("method")) {
      setMethod(localStorage.getItem("method"));
    } else {
      setMethod("relative");
      localStorage.setItem("method", "relative");
    }
    setInterval(() => {
      setDate(new Date());
    }, 5000);
  }, []);
  const toggleMethod = () => {
    if (method == "relative") {
      setMethod("exact");
      localStorage.setItem("method", "exact");
    } else {
      setMethod("relative");
      localStorage.setItem("method", "relative");
    }
  };
  return (
    <>
      {method && (
        <div className={styles.timerParent} onClick={toggleMethod}>
          {!error && (
            <span title="Swap time views" className={styles.timerSwap}>
              swap_horiz
            </span>
          )}
          {!error ? (
            <>
              {" "}
              {meal.start >= date && (
                <>
                  <p>Next mealtime starts {method == "exact" && " in"}</p>
                  <h2>
                    {method == "relative"
                      ? ft(new Date(meal.start))
                      : du(meal.start / 1000 - date.getTime() / 1000, "m")}
                  </h2>
                </>
              )}
              {meal.start < date && (
                <>
                  <p>This mealtime ends</p>
                  <h2>
                    {method == "relative"
                      ? ft(new Date(meal.end))
                      : du(meal.end / 1000 - date.getTime() / 1000, "m")}
                  </h2>
                </>
              )}
            </>
          ) : (
            <>
              <p>Menu loading error</p>
              <h2>No menu available</h2>
            </>
          )}
        </div>
      )}
    </>
  );
}
