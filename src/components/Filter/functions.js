import React from "react";
import { get_request, post_request } from "../../helpers/Request";
import swal from "sweetalert";
import {
  no_filter_option,
  project_type,
  activity_dependence,
  budget_type,
  status,
} from "../../helpers/Enums";

function verifyString(string) {
  return string !== "" ? string : null;
}

export function isEmpty(list) {
  return JSON.stringify(list) === JSON.stringify([]);
}

/**
 * * Usadas por: Filter
 */
export function loadEnums() {
  let project_types = JSON.parse(JSON.stringify(project_type));
  let activity_dependences = JSON.parse(JSON.stringify(activity_dependence));
  let budget_types = JSON.parse(JSON.stringify(budget_type));
  let statuses = JSON.parse(JSON.stringify(status));
  project_types.unshift(no_filter_option);
  activity_dependences.unshift(no_filter_option);
  budget_types.unshift(no_filter_option);
  statuses.unshift(no_filter_option);
  if (this._isMounted) {
    this.setState({
      data_list: {
        ...this.state.data_list,
        project_types,
        activity_dependences,
        budget_types,
        statuses,
      },
    });
  }
}

export async function loadInvestigationUnits() {
  const res = await get_request(`investigation_unit`);
  if (res.status && this._isMounted) {
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
}

export async function loadActivityTypes() {
  const res = await get_request(`activity/type`);
  if (res.status && this._isMounted) {
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
      campus_key: this.state.person.campus_key + 1,
      career_key: this.state.person.career_key + 1,
    },
    budget: {
      dni: "",
      budget_unit: "",
      budget_subunit: "",
      budget_type: "",
      id_project: "",
      id_activity: "",
      start_date: "",
      end_date: "",
      end_date_key: this.state.budget.end_date_key + 1,
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
      budget_list: [],
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
    id_inv_unit: verifyString(this.state.project.inv_unit),
    project_type: verifyString(this.state.project.type),
  };
  const res = await post_request(`filter/project`, filterBody);
  if (res.status) {
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
    let project_data = filterData.map((project) => {
      return {
        Código: project.code_manage,
        Nombre: project.name,
        "Dirigido por": project.project_type,
        "Unidad de investigación": project.inv_name,
        "Estudiantes asociados": project.studentNames,
        "Investigadores asociados": project.researcherNames,
      };
    });
    if (!isEmpty(project_list)) {
      this.setState({
        results: {
          ...this.state.results,
          project_list,
          project_csv: project_data,
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
}

export async function getFilteredDependentActivities() {
  const filterBody = {
    id_acti_type: verifyString(this.state.activity.type),
  };
  const res = await post_request(`filter/activity/project`, filterBody);
  if (res.status) {
    const filterData = res.data;
    let activity_list = filterData.map((activity) => {
      return [
        activity.name,
        activity.project_name,
        activity.acti_type_name,
        activity.id_activity,
      ];
    });
    let activity_data = filterData.map((activity) => {
      return {
        Nombre: activity.name,
        "Proyecto asociado": activity.project_name,
        Tipo: activity.acti_type_name,
        "Estudiantes asociados": activity.studentNames,
        "Investigadores asociados": activity.researcherNames,
      };
    });
    if (!isEmpty(activity_list)) {
      this.setState({
        results: {
          ...this.state.results,
          activity_list,
          activity_csv: activity_data,
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
}

export async function getFilteredIndependentActivities() {
  const filterBody = {
    id_acti_type: verifyString(this.state.activity.type),
  };
  const res = await post_request(`filter/activity/no_project`, filterBody);
  if (res.status) {
    const filterData = res.data;
    let activity_list = filterData.map((activity) => {
      return [
        activity.name,
        "Actividad independiente",
        activity.acti_type_name,
        activity.id_activity,
      ];
    });
    let activity_data = filterData.map((activity) => {
      return {
        Nombre: activity.name,
        "Proyecto asociado": "",
        Tipo: activity.acti_type_name,
        "Estudiantes asociados": activity.studentNames,
        "Investigadores asociados": activity.researcherNames,
      };
    });
    if (!isEmpty(activity_list)) {
      if (!isEmpty(this.state.results.activity_list)) {
        activity_list = activity_list.concat(this.state.results.activity_list);
        activity_data = activity_data.concat(this.state.results.activity_csv);
      }
      this.setState({
        results: {
          ...this.state.results,
          activity_list,
          activity_csv: activity_data,
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
}

export async function getFilteredStudents() {
  const filterBody = {
    campus_code: verifyString(this.state.person.campus),
    career_code: verifyString(this.state.person.career),
    status:
      this.state.person.status !== ""
        ? this.state.person.status === "true"
        : null,
  };
  const res = await post_request(`filter/student`, filterBody);
  if (res.status) {
    const filterData = res.data;
    const student_list = filterData.map((student) => {
      let student_careers = [];
      for (let pos in student.career_name) {
        student_careers.push(<li key={pos}>{student.career_name[pos]}</li>);
      }
      return [
        student.dni,
        `${student.name} ${student.lastname1} ${student.lastname2}`,
        student.campus_name,
        <ul>{student_careers}</ul>,
        student.status ? "Activo" : "Inactivo",
      ];
    });
    let student_data = filterData.map((student) => {
      let student_careers = "";
      for (let pos in student.career_name) {
        student_careers =
          student_careers === ""
            ? `${student.career_name[pos]}`
            : `${student_careers}; ${student.career_name[pos]}`;
      }
      return {
        Cédula: student.dni,
        "Nombre completo": `${student.name} ${student.lastname1} ${student.lastname2}`,
        "Fecha de nacimiento": student.born_dates,
        "País de nacimiento": student.nationality,
        Localización:
          student.province === "Internacional"
            ? "Internacional"
            : `${student.province}, ${student.canton}, ${student.district}`,
        "Dirección exacta": student.address,
        Correo: student.email,
        "Número telefónico": student.phone_number,
        "Centro universitario": student.campus_name,
        Carreras: student_careers,
        "Proyectos asociados": student.projects,
        "Actividades asociadas": student.activities,
        Estado: student.status ? "Activo" : "Inactivo",
      };
    });
    if (!isEmpty(student_list)) {
      await this.setState({
        results: {
          ...this.state.results,
          student_list,
          student_csv: student_data,
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
}

export async function getFilteredResearchers() {
  const filterBody = {
    id_inv_unit: verifyString(this.state.person.inv_unit),
    status:
      this.state.person.status !== ""
        ? this.state.person.status === "true"
        : null,
  };
  const res = await post_request(`filter/researcher`, filterBody);
  if (res.status) {
    const filterData = res.data;
    const researcher_list = filterData.map((researcher) => {
      return [
        researcher.dni,
        `${researcher.name} ${researcher.lastname1} ${researcher.lastname2}`,
        researcher.inv_name,
        researcher.status ? "Activo" : "Inactivo",
      ];
    });
    let researcher_data = filterData.map((researcher) => {
      return {
        Cédula: researcher.dni,
        "Nombre completo": `${researcher.name} ${researcher.lastname1} ${researcher.lastname2}`,
        "Fecha de nacimiento": researcher.born_dates,
        Correo: researcher.email,
        "Número telefónico": researcher.phone_number,
        "Unidad de investigación": researcher.inv_name,
        "Proyectos asociados": researcher.projects,
        "Actividades asociadas": researcher.activities,
        Estado: researcher.status ? "Activo" : "Inactivo",
      };
    });
    if (!isEmpty(researcher_list)) {
      await this.setState({
        results: {
          ...this.state.results,
          researcher_list,
          researcher_csv: researcher_data
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
}

export async function getFilteredBudgets() {
  const filterBody = {
    startDate: verifyString(this.state.budget.start_date),
    endDate: verifyString(this.state.budget.end_date),
    dni: verifyString(this.state.budget.dni),
    type: verifyString(this.state.budget.budget_type),
    budget_code: verifyString(this.state.budget.budget_unit),
    budget_subunit_code: verifyString(this.state.budget.budget_subunit),
    id_project: verifyString(this.state.budget.id_project),
    id_activity: verifyString(this.state.budget.id_activity),
  };
  const res = await post_request(`filter/financial_item`, filterBody);
  if (res.status) {
    const filterData = res.data;
    let budget_list = filterData.map((budget) => {
      return [
        `${budget.name} ${budget.lastname1} ${budget.lastname2}`,
        budget.date_created,
        budget.budgetname,
        budget.subunitname,
        budget.projectname
          ? budget.projectname
          : budget.activityname
          ? budget.activityname
          : budget.type,
        budget.id_financial_item,
      ];
    });
    let budget_data = filterData.map((budget) => {
      return {
        Fecha: budget.date_created,
        Monto: budget.amount,
        "Nombre completo": `${budget.name} ${budget.lastname1} ${budget.lastname2}`,
        Partida: budget.budgetname,
        Subpartida: budget.subunitname,
        Tipo: budget.type,
        "Nombre actividad": budget.activityname,
        "Nombre proyecto": budget.projectname,
      };
    });
    if (!isEmpty(budget_list)) {
      this.setState({
        results: {
          ...this.state.results,
          budget_list,
          budget_csv: budget_data,
        },
      });
    } else if (isEmpty(this.state.results.budget_list)) {
      swal(
        "¡Atención!",
        "No se encuentran resultados para la búsqueda realizada.",
        "info"
      );
    }
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
  if (this._isMounted) {
    const project_csv = this.props.project_csv;
    await this.setState({
      show: {
        ...this.state.show,
        projectTable: true,
      },
      results: { project_list, project_csv },
    });
  }
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
  if (this._isMounted) {
    const activity_csv = this.props.activity_csv;
    await this.setState({
      show: {
        ...this.state.show,
        activityTable: true,
      },
      results: { activity_list, activity_csv },
    });
  }
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
  if (this._isMounted) {
    const student_csv = this.props.student_csv;
    await this.setState({
      show: {
        ...this.state.show,
        studentTable: true,
      },
      results: { student_list, student_csv },
    });
  }
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
  if (this._isMounted) {
    const researcher_csv = this.props.researcher_csv;
    await this.setState({
      show: {
        ...this.state.show,
        researcherTable: true,
      },
      results: { researcher_list, researcher_csv },
    });
  }
}

export async function getFormattedBudgets() {
  const budget_list = [];
  for (let i = 0; i < this.props.budget_list.length; i++) {
    const budget = this.props.budget_list[i];
    budget_list.push(
      <tr key={i}>
        <td>{budget[0]}</td>
        <td>{budget[1]}</td>
        <td>{budget[2]}</td>
        <td>{budget[3]}</td>
        <td>{budget[4]}</td>
        <td>
          <button
            className="btn btn-md btn-success"
            onClick={() => {
              this.props.history.push(`/ver-partida/${budget[5]}`);
            }}
          >
            <i className="fas fa-eye"></i>
          </button>
        </td>
      </tr>
    );
  }
  if (this._isMounted) {
    const budget_csv = this.props.budget_csv;
    await this.setState({
      show: {
        ...this.state.show,
        budgetTable: true,
      },
      results: { budget_list, budget_csv },
    });
  }
}
