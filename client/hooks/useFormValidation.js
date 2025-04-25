import {
  signUpValidationRules,
  signInValidationRules,
  addCategoryValidationRules,
  addIncomeValidationRules,
} from "./validationRules";

const useFormValidation = (data, screen) => {
  let validations;
  if (screen === "registration") {
    validations = signUpValidationRules;
  }else if(screen === "categories"){
    validations = addCategoryValidationRules;
  } else if (screen === "BSIncome") {
    validations = addIncomeValidationRules;
  } else {
    validations = signInValidationRules;
  }

  const validateForm = () => {
    const errors = validations
      .filter((rule) => rule.check(data))
      .map((rule) => rule.message);
    if (errors.length) {
      alert(errors.join("\n"));

      return false;
    }
    return true;
  };
  return validateForm;
};

export default useFormValidation;
