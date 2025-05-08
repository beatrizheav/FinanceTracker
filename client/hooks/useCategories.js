import { useState, useEffect } from "react";
import apiClient from "../api/apiClient"; // adjust the path as needed

const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCategories = async () => {
    try {
      const response = await apiClient.get("/categories/get");
      setCategories(response);
    } catch (err) {
      alert("Error al obtener las categorías del usuario: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return { categories, loading, getCategories };
};

export default useCategories;
