import React, {useState, useEffect} from 'react'
import apiClient from "../api/apiClient";

const useExpensesAndIncomes = () => {
    const [expenses, setExpenses] = useState([]);
    const [incomes, setIncomes] = useState([]);
    const [loading, setLoading] = useState(true);

    const getExpensesAndIncomes = async () => {
        try {
            const responseExpenses = await apiClient.get("/expenses/get");
            const responseIncomes = await apiClient.get("/incomes");
            setExpenses(responseExpenses);
            setIncomes(responseIncomes);
        } catch (error) {
            console.error('Error al obtener la actividad reciente', error)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getExpensesAndIncomes();
    }, [])
    

  return {expenses, incomes, loading}
}

export default useExpensesAndIncomes