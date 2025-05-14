import React, {useState, useEffect} from 'react'
import apiClient from "../api/apiClient";

const useExpensesAndIncomes = () => {
    const [expenses, setExpenses] = useState([]);
    const [incomes, setIncomes] = useState([]);
    const [loadingIncomesAndExpenses, setloadingIncomesAndExpenses] = useState(true);

    const getExpensesAndIncomes = async () => {
        try {
            const responseExpenses = await apiClient.get("/expenses/get");
            const responseIncomes = await apiClient.get("/incomes/user");
            setExpenses(responseExpenses);
            setIncomes(responseIncomes);
        } catch (error) {
            console.error('Error al obtener la actividad reciente', error)
        } finally {
            setloadingIncomesAndExpenses(false);
        }
    }

    useEffect(() => {
        getExpensesAndIncomes();
    }, [])
    

  return {expenses, incomes, loadingIncomesAndExpenses, getExpensesAndIncomes}
}

export default useExpensesAndIncomes