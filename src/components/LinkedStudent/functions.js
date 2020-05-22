export function createStudentObject() {
  const invitedOrBasic =
    this.state.profile === "Invitado" || this.state.profile === "Básico";
  const student = {
    dni: this.state.dni,
    name: this.state.name,
    lastname1: this.state.lastname1,
    lastname2: this.state.lastname2,
    born_dates: this.state.born_dates,
    id_district: this.state.resident ? this.state.id_district : 0,
    marital_status: this.state.marital_status,
    campus_code: this.state.campus_code,
    profile: this.state.profile,
    address: this.state.address,
    nationality: this.state.nationality,
    careers: this.state.careers,
    languages: invitedOrBasic ? [] : this.state.languages,
    networks: invitedOrBasic ? [] : this.state.networks,
    associated_careers: invitedOrBasic ? [] : this.state.associated_careers,
  };
  return student;
}
