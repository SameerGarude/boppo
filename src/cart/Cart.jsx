import { useEffect, useState } from "react";
import "./cart.scss";

function Cart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(
      "https://boppotech-admin.github.io/react-task-json.github.io/reactjob.json"
    )
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  const cutText = text => {
    const words = text.split("");
    if (words.length > 16) {
      return words.slice(0, 16).join("") + "...";
    }
    return text;
  };

  return (
    <div className="body">
      <div className="container">
        {data.map((d, index) => {
          return (
            <div className="data" key={index}>
              <div className="top">
                <img src={d.images.nodes[0].src} alt="" />
              </div>
              <div className="bottom">
                <span>{cutText(d.title)}</span>
                <p>{cutText(d.handle)}</p>
                <p className="money">
                  {d.price.currencyCode} {d.price.amount}
                </p>
                {d.quantity < 1 ? (
                  <button disabled>Add to Cart</button>
                ) : (
                  <button>Add to Cart</button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Cart;
