import { useEffect, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";
import { FoodItem } from "../types";

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

      this.set = this.set.bind(this);
      this.delete = this.delete.bind(this);
    }

    set(payload: FoodItem, id?: string) {
      let reqOptions = {
        url: `http://127.0.0.1:5000/food/${id ? `${id}` : ""}`,
        method: id ? "PUT" : "POST",
        headers: this.#headersList,
        data: JSON.stringify(payload),
      };

      this.#sendRequest(reqOptions);
    }

    delete(id: string) {
      let reqOptions = {
        url: `http://127.0.0.1:5000/food/${id}`,
        method: "DELETE",
        headers: this.#headersList,
      };

      this.#sendRequest(reqOptions);
    }
  }

  return new Database();
};

export default useDatabase;
