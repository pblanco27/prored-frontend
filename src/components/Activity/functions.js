import Validator from "../../helpers/Validations";

export function createActivityObject() {
  const persons = this.state.linked_list.map((linked) => {
    return {
      dni: linked.value,
    };
  });
  const activity = {
    persons,
    name: this.state.name,
    id_acti_type: this.state.id_acti_type,
    id_project: this.state.id_project,
  };
  return activity;
}

export function validateActivity(activity) {
  let error = false;
  error =
    !Validator.validateSimpleTextJquery(
      activity.name,
      "activityNameError",
      40,
      "textSpecial"
    ) || error;

  error =
    !Validator.validateSimpleSelectJquery(
      activity.id_acti_type,
      "selectActivityTypeError"
    ) || error;
  return !error;
}
