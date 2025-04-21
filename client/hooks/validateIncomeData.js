import { addIncomeValidationRules } from "./validationRules";

export const validateIncomeData = (incomeData) => {
  const errors = addIncomeValidationRules
    .filter((rule) => rule.check(incomeData))
    .map((rule) => rule.message);

  if (errors.length > 0) {
    alert(errors.join("\n"));
    return false;
  }

  return true;
};
