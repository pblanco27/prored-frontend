import { countries } from "../../helpers/Enums";
import { countryToFlag } from "../Selects/Country";

export function formatCampus(campus_code, campus_name) {
  const campus = {
    label: campus_code + " - " + campus_name,
    value: campus_code,
    name: campus_name,
  };
  return campus;
}

export function formatCareers(careersRaw) {
  const careers_selected = careersRaw.map((career) => {
    return {
      label: `${career.degree} - ${career.name}`,
      value: career.career_code,
      name: career.name,
      degree: career.degree,
    };
  });
  const careers = careersRaw.map((career) => {
    return career.career_code;
  });
  return { careers_selected, careers };
}

export function formatNetworks(networksRaw) {
  const networks_selected = networksRaw.map((network) => {
    return {
      label: network.name,
      value: network.id_network,
      name: network.name,
      type: network.network_type,
    };
  });
  const networks = networksRaw.map((network) => {
    return network.id_network;
  });
  return { networks_selected, networks };
}

export function formatLanguages(languagesRaw) {
  const languages_selected = languagesRaw.map((language) => {
    return {
      label: language.name,
      value: language.id_language,
      name: language.name,
    };
  });
  const languages = languagesRaw.map((language) => {
    return language.id_language;
  });
  return { languages_selected, languages };
}

export function formatAssociatedCareers(associatedCareersRaw) {
  const associatedCareers_selected = associatedCareersRaw.map((assocareer) => ({
    label: assocareer.center + " - " + assocareer.associated_career,
    value: assocareer.id_associated_career,
  }));
  const associated_careers = associatedCareersRaw.map((assocareer) => {
    return assocareer.id_associated_career;
  });
  return { associatedCareers_selected, associated_careers };
}

export function formatCountry(country_code) {
  const country = countries.find((c) => {
    return c.code === country_code;
  });

  return {
    label: `${countryToFlag(country.code)} ${country.label} (${country.code})`,
    value: country.code,
  };
}
