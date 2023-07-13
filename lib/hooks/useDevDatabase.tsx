import { useEffect, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";
import { FoodItem } from "../types";
import dbSeedData from "@/lib/dbSeedData";

const useDatabase = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [res, setRes] = useState<any>(null);

  useEffect(() => {
    if (error) {
      console.log(error);
    } else if (res) {
      console.log(res);
    }
  }, [error, res]);

  class Database {
    readonly #headersList: any;
    readonly #sendRequest: (reqOptions: AxiosRequestConfig) => void;
    readonly #get: () => Promise<any>;
    readonly deleteAllFood: () => void;
    readonly seed: () => void;

    constructor() {
      this.#headersList = {
        Accept: "*/*",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      };

      this.#sendRequest = async (reqOptions) => {
        setLoading(true);
        setRes(null);
        setError(null);

        try {
          const res = await axios.request(reqOptions);
          setLoading(false);
          setRes(res);
        } catch (error) {
          setError(error);
          setLoading(false);
        }
      };

      this.#get = async () => {
        const reqOptions = {
          method: "GET",
          url: `http://127.0.0.1:5000/food/`,
          headers: this.#headersList,
        };

        return await axios.request(reqOptions);
      };

      this.deleteAllFood = async () => {
        const allFood = await this.#get();

        allFood.data.forEach((food: FoodItem) => {
          const reqOptions = {
            url: `http://127.0.0.1:5000/food/${food.id}`,
            method: "DELETE",
            headers: this.#headersList,
          };

          this.#sendRequest(reqOptions);
        });
      };

      this.seed = async () => {
        dbSeedData.forEach((food: FoodItem) => {
          const reqOptions = {
            url: `http://127.0.0.1:5000/food/`,
            method: "POST",
            headers: this.#headersList,
            data: JSON.stringify(food),
          };

          this.#sendRequest(reqOptions);
        });
      };
    }
  }

  return new Database();
};

export default useDatabase;
