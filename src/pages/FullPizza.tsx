import React from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const FullPizza: React.FC = () => {
  const navigate = useNavigate();
  const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    title: string;
  }>();

  const { id } = useParams();

  React.useEffect(() => {
    async function getPizza() {
      try {
        const { data } = await axios.get(
          `https://65bb702652189914b5bc21bd.mockapi.io/items/${id}`
        );
        setPizza(data);
      } catch (e) {
        console.error(e);
        navigate("/");
      }
    }
    getPizza();
    console.log(pizza);
  }, []);

  if (!pizza) {
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div>
      <img src={pizza.imageUrl} alt="" />
      <h2>{pizza.title}</h2>
    </div>
  );
};

export default FullPizza;
