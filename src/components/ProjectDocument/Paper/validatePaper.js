import Validator from "../../../helpers/Validations";

export function createPaperObject() {
  const paper = {
    paper_name: this.state.name,
    type: this.state.type,
    date_assisted: this.state.date,
    speaker: this.state.speaker,
    place: this.state.place,
    country: this.state.country,
  };
  return paper;
}

export function validatePaperEdit(paper) {
  let error = false;
  error =
    !Validator.validateSimpleTextJquery(
      paper.paper_name,
      "paperNameError",
      90,
      "textSpecial"
    ) || error;
  error =
    !Validator.validateSimpleSelectJquery(paper.type, "paperTypeError") ||
    error;
  error =
    !Validator.validateSimpleSelectJquery(
      paper.date_assisted,
      "paperDateError"
    ) || error;
  error =
    !Validator.validateSimpleTextJquery(
      paper.speaker,
      "paperSpeakerError",
      40,
      "textSpecial",
      true
    ) || error;
  error =
    !Validator.validateSimpleTextJquery(
      paper.place,
      "paperPlaceError",
      90,
      "textSpecial",
      true
    ) || error;
  error =
    !Validator.validateSimpleSelectJquery(paper.country, "paperCountryError") ||
    error;

  return !error;
}

export function validatePaperCreate(paper) {
  let error = false;
  error =
    !Validator.validateSimpleTextJquery(
      paper.paper_name,
      "paperNameCreateError",
      90,
      "textSpecial"
    ) || error;
  error =
    !Validator.validateSimpleSelectJquery(paper.type, "paperTypeCreateError") ||
    error;
  error =
    !Validator.validateSimpleSelectJquery(
      paper.date_assisted,
      "paperDateCreateError"
    ) || error;
  error =
    !Validator.validateSimpleTextJquery(
      paper.speaker,
      "paperSpeakerCreateError",
      40,
      "textSpecial",
      true
    ) || error;
  error =
    !Validator.validateSimpleTextJquery(
      paper.place,
      "paperPlaceCreateError",
      90,
      "textSpecial",
      true
    ) || error;
  error =
    !Validator.validateSimpleSelectJquery(
      paper.country,
      "paperCountryCreateError"
    ) || error;

  return !error;
}
