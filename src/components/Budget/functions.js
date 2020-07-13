import Validator from "../../helpers/Validations";

export function createBudgetObject() {
  const budget = {
    date_created: this.state.date_created,
    amount: this.state.amount,
    type: this.state.type, //no valido
    id_project: this.state.id_project, //no valido
    id_activity: this.state.id_activity, //no valido
    dni: this.state.dni,
    code_unit: this.state.code_unit, //seleccionado
    code_subunit: this.state.code_subunit, //seleccionado
    id_financial_item: this.state.id_financial_item,
  };
  return budget;
}

export function validateBudget(budget) {
  let error = false;

  error = !Validator.validateSimpleDateJquery(
    budget.date_created,
    "budgetDateError"
  );

  error = !Validator.validateSimpleTextJquery(
    budget.amount,
    "budgetAmountError",
    20,
    "money"
  );

  error =
    !Validator.validateSimpleTextJquery(
      budget.dni,
      "selectStudentError",
      40,
      "dni"
    ) || error;

  error =
    !Validator.validateSimpleSelectJquery(
      budget.code_unit,
      "selectBudgetUnitError"
    ) || error;
  error =
    !Validator.validateSimpleSelectJquery(
      budget.code_subunit,
      "selectBudgetSubUnitError"
    ) || error;

  if (budget.type !== "Independiente") {
    if (budget.type === "Proyecto") {
      error =
        !Validator.validateSimpleSelectJquery(
          budget.id_project,
          "selectProjectError"
        ) || error;
    } else {
      error =
        !Validator.validateSimpleSelectJquery(
          budget.id_activity,
          "selectActivityError2"
        ) || error;
    }
  }

  return error;
}
