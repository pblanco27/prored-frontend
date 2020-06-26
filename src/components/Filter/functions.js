import React from "react";
import { API, axiosHeader } from "../../services/env";
import axios from "axios";
import swal from "sweetalert";
import {
  no_filter_option,
  project_type,
  activity_dependence,
  status,
} from "../../helpers/Enums";

export function isEmpty(list) {
  return JSON.stringify(list) === JSON.stringify([]);
}

/**
 * * Usadas por: Filter
 */
export function loadEnums() {
  let project_types = JSON.parse(JSON.stringify(project_type));
  let activity_dependences = JSON.parse(JSON.stringify(activity_dependence));
  let statuses = JSON.parse(JSON.stringify(status));
  project_types.unshift(no_filter_option);
  activity_dependences.unshift(no_filter_option);
  statuses.unshift(no_filter_option);
  this.setState({
    data_list: {
      ...this.state.data_list,
      project_types,
      activity_dependences,
      statuses,
    },
  });
}

export async function loadInvestigationUnits() {
  const res = await axios.get(`${API}/investigation_unit`, axiosHeader());
  const inv_unit_data = res.data;
  let inv_units = inv_unit_data.map((inv) => ({
    label: inv.name,
    value: inv.id_inv_unit,
  }));
  inv_units.unshift(no_filter_option);
  this.setState({
    data_list: {
      ...this.state.data_list,
      inv_units,
    },
  });
}

export async function loadActivityTypes() {
  const res = await axios.get(`${API}/activity/type`, axiosHeader());
  const activity_type_data = res.data;
  let activity_types = activity_type_data.map((type) => ({
    label: type.name,
    value: type.id_acti_type,
  }));
  activity_types.unshift(no_filter_option);
  this.setState({
    data_list: {
      ...this.state.data_list,
      activity_types,
    },
  });
}

export function clearFilters() {
  this.setState({
    project: {
      type: "",
      inv_unit: "",
    },
    activity: {
      type: "",
      dependence: "",
    },
    person: {
      type: this.state.person.type,
      status: "",
      campus: "",
      career: "",
      inv_unit: "",
      select_key: this.state.person.select_key + 1,
    },
  });
}

export function clearResults() {
  this.setState({
    results: {
      project_list: [],
      activity_list: [],
      student_list: [],
      researcher_list: [],
    },
    show: {
      ...this.state.show,
      filterResults: false,
    },
  });
}

function getProjectTypeLabel(value) {
  for (let pos in project_type) {
    if (project_type[pos].value === value) {
      return project_type[pos].label;
    }
  }
}

/**
 * * Las siguientes funciones "getFiltered..." obtienen la lista
 * * de resultados de la base de datos luego de aplicar los filtros
 */
export async function getFilteredProjects() {
  const filterBody = {
    id_inv_unit:
      this.state.project.inv_unit !== "" ? this.state.project.inv_unit : null,
    project_type:
      this.state.project.type !== "" ? this.state.project.type : null,
  };
  const res = await axios.post(
    `${API}/filter/project`,
    filterBody,
    axiosHeader()
  );
  const filterData = res.data;
  const project_list = filterData.map((project) => {
    return [
      project.code_manage,
      project.name,
      project.inv_name,
      getProjectTypeLabel(project.project_type),
      project.id_project,
    ];
  });
  if (!isEmpty(project_list)) {
    this.setState({
      results: {
        ...this.state.results,
        project_list,
      },
    });
  } else {
    swal(
      "¡Atención!",
      "No se encuentran resultados para la búsqueda realizada.",
      "info"
    );
  }
}

export async function getFilteredDependentActivities() {
  const filterBody = {
    id_acti_type:
      this.state.activity.type !== "" ? this.state.activity.type : null,
  };
  const res = await axios.post(
    `${API}/filter/activity/project`,
    filterBody,
    axiosHeader()
  );
  const filterData = res.data;
  let activity_list = filterData.map((activity) => {
    return [
      activity.name,
      activity.project_name,
      activity.acti_type_name,
      activity.id_activity,
    ];
  });
  if (!isEmpty(activity_list)) {
    this.setState({
      results: {
        ...this.state.results,
        activity_list,
      },
    });
  } else if (isEmpty(this.state.results.activity_list)) {
    swal(
      "¡Atención!",
      "No se encuentran resultados para la búsqueda realizada.",
      "info"
    );
  }
}

export async function getFilteredIndependentActivities() {
  const filterBody = {
    id_acti_type:
      this.state.activity.type !== "" ? this.state.activity.type : null,
  };
  const res = await axios.post(
    `${API}/filter/activity/no_project`,
    filterBody,
    axiosHeader()
  );
  const filterData = res.data;
  let activity_list = filterData.map((activity) => {
    return [
      activity.name,
      "Actividad independiente",
      activity.acti_type_name,
      activity.id_activity,
    ];
  });
  if (!isEmpty(activity_list)) {
    if (!isEmpty(this.state.results.activity_list)) {
      activity_list = activity_list.concat(this.state.results.activity_list);
    }
    this.setState({
      results: {
        ...this.state.results,
        activity_list,
      },
    });
  } else if (isEmpty(this.state.results.activity_list)) {
    swal(
      "¡Atención!",
      "No se encuentran resultados para la búsqueda realizada.",
      "info"
    );
  }
}

export async function getFilteredStudents() {
  const filterBody = {
    campus_code:
      this.state.person.campus !== "" ? this.state.person.campus : null,
    career_code:
      this.state.person.career !== "" ? this.state.person.career : null,
    status:
      this.state.person.status !== ""
        ? this.state.person.status === "true"
        : null,
  };
  const res = await axios.post(
    `${API}/filter/student`,
    filterBody,
    axiosHeader()
  );
  const filterData = res.data;
  const student_list = filterData.map((student) => {
    let student_careers = [];
    for (let pos in student.career_name) {
      //student_careers += student.career_name[pos] + "<br />";
      student_careers.push(<li>{student.career_name[pos]}</li>);
    }
    return [
      student.dni,
      `${student.name} ${student.lastname1} ${student.lastname2}`,
      student.campus_name,
      <ul>{student_careers}</ul>,
      student.status ? "Activo" : "Inactivo",
    ];
  });
  if (!isEmpty(student_list)) {
    await this.setState({
      results: {
        ...this.state.results,
        student_list,
      },
    });
  } else {
    swal(
      "¡Atención!",
      "No se encuentran resultados para la búsqueda realizada.",
      "info"
    );
  }
}

export async function getFilteredResearchers() {
  const filterBody = {
    id_inv_unit:
      this.state.person.inv_unit !== "" ? this.state.person.inv_unit : null,
    status:
      this.state.person.status !== ""
        ? this.state.person.status === "true"
        : null,
  };
  const res = await axios.post(
    `${API}/filter/researcher`,
    filterBody,
    axiosHeader()
  );
  const filterData = res.data;
  const researcher_list = filterData.map((researcher) => {
    return [
      researcher.dni,
      `${researcher.name} ${researcher.lastname1} ${researcher.lastname2}`,
      researcher.inv_name,
      researcher.status ? "Activo" : "Inactivo",
    ];
  });
  if (!isEmpty(researcher_list)) {
    await this.setState({
      results: {
        ...this.state.results,
        researcher_list,
      },
    });
  } else {
    swal(
      "¡Atención!",
      "No se encuentran resultados para la búsqueda realizada.",
      "info"
    );
  }
}

/**
 * * Usadas por: Filter Results
 *
 * * Las siguientes funciones "getFormatted..." toman la lista
 * * de resultados y la formatean para ingresarlos en la tabla
 */
export async function getFormattedProjects() {
  const project_list = [];
  for (let i = 0; i < this.props.project_list.length; i++) {
    const project = this.props.project_list[i];
    project_list.push(
      <tr key={i}>
        <td>{project[0]}</td>
        <td>{project[1]}</td>
        <td>{project[2]}</td>
        <td>{project[3]}</td>
        <td>
          <button
            className="btn btn-md btn-success"
            onClick={() => {
              this.props.history.push(`/ver-proyecto/${project[4]}`);
            }}
          >
            <i className="fas fa-eye"></i>
          </button>
        </td>
      </tr>
    );
  }
  await this.setState({
    show: {
      ...this.state.show,
      projectTable: true,
    },
    results: { project_list },
  });
}

export async function getFormattedActivities() {
  const activity_list = [];
  for (let i = 0; i < this.props.activity_list.length; i++) {
    const activity = this.props.activity_list[i];
    activity_list.push(
      <tr key={i}>
        <td>{i + 1}</td>
        <td>{activity[0]}</td>
        <td>{activity[1]}</td>
        <td>{activity[2]}</td>
        <td>
          <button
            className="btn btn-md btn-success"
            onClick={() => {
              this.props.history.push(`/ver-actividad/${activity[3]}`);
            }}
          >
            <i className="fas fa-eye"></i>
          </button>
        </td>
      </tr>
    );
  }
  await this.setState({
    show: {
      ...this.state.show,
      activityTable: true,
    },
    results: { activity_list },
  });
}

export async function getFormattedStudents() {
  const student_list = [];
  for (let i = 0; i < this.props.student_list.length; i++) {
    const student = this.props.student_list[i];
    student_list.push(
      <tr key={i}>
        <td>{student[0]}</td>
        <td>{student[1]}</td>
        <td>{student[2]}</td>
        <td>{student[3]}</td>
        <td>{student[4]}</td>
        <td>
          <button
            className="btn btn-md btn-success"
            onClick={() => {
              this.props.history.push(`/ver-estudiante/${student[0]}`);
            }}
          >
            <i className="fas fa-eye"></i>
          </button>
        </td>
      </tr>
    );
  }
  await this.setState({
    show: {
      ...this.state.show,
      studentTable: true,
    },
    results: { student_list },
  });
}

export async function getFormattedResearchers() {
  const researcher_list = [];
  for (let i = 0; i < this.props.researcher_list.length; i++) {
    const researcher = this.props.researcher_list[i];
    researcher_list.push(
      <tr key={i}>
        <td>{researcher[0]}</td>
        <td>{researcher[1]}</td>
        <td>{researcher[2]}</td>
        <td>{researcher[3]}</td>
        <td>
          <button
            className="btn btn-md btn-success"
            onClick={() => {
              this.props.history.push(`/ver-investigador/${researcher[0]}`);
            }}
          >
            <i className="fas fa-eye"></i>
          </button>
        </td>
      </tr>
    );
  }
  await this.setState({
    show: {
      ...this.state.show,
      researcherTable: true,
    },
    results: { researcher_list },
  });
}
