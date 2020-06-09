import Validator from "../../../helpers/Validations";

export function createArticleObject() {
  const article = {
    title: this.state.title,
    abstract: this.state.abstract,
    authors: this.state.authors,
    key_words: this.state.key_words,
    magazine: this.state.magazine,
    url: this.state.url,
  };
  return article;
}

export function validateArticleEdit(article) {
  let error = false;
  error =
    !Validator.validateSimpleTextJquery(
      article.title,
      "articleTitleError",
      90,
      "textSpecial"
    ) || error;
  error =
    !Validator.validateSimpleTextJquery(
      article.abstract,
      "articleAbstractError",
      200,
      "textSpecial",
      true
    ) || error;
  error =
    !Validator.validateSimpleTextJquery(
      article.authors,
      "articleAuthorsError",
      190,
      "textSpecial",
      true
    ) || error;
  error =
    !Validator.validateSimpleTextJquery(
      article.key_words,
      "articleKeyWordsError",
      190,
      "textSpecial",
      true
    ) || error;
  error =
    !Validator.validateSimpleTextJquery(
      article.magazine,
      "articleMagazineError",
      40,
      "textSpecial",
      true
    ) || error;
  error =
    !Validator.validateSimpleTextJquery(
      article.url,
      "articleUrlError",
      190,
      "textSpecial",
      true
    ) || error;

  return !error;
}

export function validateArticleCreate(article) {
  let error = false;
  error =
    !Validator.validateSimpleTextJquery(
      article.title,
      "articleTitleCreateError",
      90,
      "textSpecial"
    ) || error;
  error =
    !Validator.validateSimpleTextJquery(
      article.abstract,
      "articleAbstractCreateError",
      200,
      "textSpecial",
      true
    ) || error;
  error =
    !Validator.validateSimpleTextJquery(
      article.authors,
      "articleAuthorsCreateError",
      190,
      "textSpecial",
      true
    ) || error;
  error =
    !Validator.validateSimpleTextJquery(
      article.key_words,
      "articleKeyWordsCreateError",
      190,
      "textSpecial",
      true
    ) || error;
  error =
    !Validator.validateSimpleTextJquery(
      article.magazine,
      "articleMagazineCreateError",
      40,
      "textSpecial",
      true
    ) || error;
  error =
    !Validator.validateSimpleTextJquery(
      article.url,
      "articleUrlCreateError",
      190,
      "textSpecial",
      true
    ) || error;

  return !error;
}
