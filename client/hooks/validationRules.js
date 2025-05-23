export const signUpValidationRules = [
  {
    check: (data) => !data.name || data.name.length < 2,
    message: "Enter a valid name.",
  },
  {
    check: (data) => !data.lastName || data.lastName.length < 2,
    message: "Enter a valid last name.",
  },
  {
    check: (data) => !data.email || !/\S+@\S+\.\S+/.test(data.email),
    message: "Enter a valid email address.",
  },
  {
    check: (data) => !data.password || data.password.length < 8,
    message: "The password must be at least 8 characters.",
  },
  {
    check: (data) => data.password !== data.confirmPassword,
    message: "The passwords must match.",
  },
  { check: (data) => !data.avatar, message: "All fields are required." },
];

export const signInValidationRules = [
  { check: (data) => !data.email, message: "Email is required." },
  { check: (data) => !data.password, message: "Password is required." },
];

export const addIncomeValidationRules = [
  { check: (data) => !data.name, message: "El nombre es obligatorio." },
  { check: (data) => !data.amount, message: "La cantidad es obligatoria." },
  { check: (data) => !data.date, message: "La fecha es obligatoria." },
];

export const bsExpenseValidationRules = [
  { check: (data) => !data.name, message: "El nombre es obligatorio." },
  { check: (data) => !data.amount, message: "La cantidad es obligatoria." },
  { check: (data) => !data.date, message: "La fecha es obligatoria." },
  { check: (data) => !data.category, message: "La categoría es obligatoria." },
];

export const addCategoryValidationRules = [
  { check: (data) => !data.name, message: "El nombre es obligatorio." },
  { check: (data) => !data.budget, message: "El presupuesto es obligatorio." },
  { check: (data) => !data.color, message: "El color es obligatorio." },
  { check: (data) => !data.icon, message: "El icono es obligatorio." },
];
