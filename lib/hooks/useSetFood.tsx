import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { FoodItem } from "../types";

const useSetFood = () => {
  const [data, setData] = useState<Array<FoodItem>>([]);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    let headersList = {
      Accept: "*/*",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };

    let reqOptions = {
      url: "http://127.0.0.1:5000/food/",
      method: "GET",
      headers: headersList,
      mode: "no-cors",
    };

    const getFood = async () => {
      setLoading(true);
      try {
        const response = await axios.request(reqOptions);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    getFood();
  }, []);

  return { data, error, loading };
};

export default useSetFood;
