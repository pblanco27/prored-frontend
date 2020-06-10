import Validator from "../../helpers/Validations";
export function createProjectObject() {
  const persons = this.state.linked_list.map((linked) => {
    return {
      dni: linked.value,
      role: linked.rol,
    };
  });
  const project = {
    persons,
    inv_unit: this.state.id_inv_unit,
    name: this.state.name,
    code_manage: this.state.project_code,
    project_type: this.state.project_type,
    id_project: this.state.id_project,
  };
  return project;
}

/**code_manage: ""
inv_unit: ""
name: "" */
export function validateProject(project) {
  let error = false;
  error =
    !Validator.validateSimpleTextJquery(
      project.name,
      "projectNameError",
      40,
      "textSpecial"
    ) || error;
  error =
    !Validator.validateSimpleTextJquery(
      project.code_manage,
      "projectCodeError",
      40,
      "textSpecial",
      true
    ) || error;
  error =
    !Validator.validateSimpleSelectJquery(
      project.inv_unit,
      "selectInvestigationUnit"
    ) || error;
  return !error;
}
