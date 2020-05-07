import { API } from "./env";
import axios from "axios";

class StudentService {
  /**
   * * Funcion para obtener los campus
   * * Obtiene de la base los campus previamente registrados
   */
  async getCampuses() {
    const res = await axios.get(`${API}/campus`);
    const campusesData = res.data;
    const campuses = campusesData.map((campus) => ({
      title: campus.campus_code + " - " + campus.name,
      name: campus.name,
      id: campus.campus_code,
    }));
    this.setState({ campuses });
  }

  /**
   * * Función para obtener las carreras
   * * Obtiene de la base las carreras previamente registradas
   */
  async getCareers() {
    const res = await axios.get(`${API}/career`);
    const careerData = res.data;
    const careers = careerData.map((career) => ({
      title: career.career_code + " - " + career.degree + " - " + career.name,
      name: career.name,
      degree: career.degree,
      id: career.career_code,
    }));
    this.setState({ careers });
  }

  /**
   * * Función para obtener ls centros
   * * Obtiene de la base los centros educativos previamente registradas
   */
  async getCenters() {
    const res = await axios.get(`${API}/center`);
    const centerData = res.data;
    this.setState({ centers: [] });
    const centers = centerData.map((center) => ({
      title: center.name,
      name: center.name,
      id: center.id_center,
    }));
    this.setState({ centers });
  }

  /**
   * * Función para obtener las carreras asociadas
   * * Obtiene de la base las carreras asociadas a centros previamente registradas
   */
  async getAssociatedCareers(idCenter) {
    const res = await axios.get(
      `${API}/associated_career_from_center/${idCenter}`
    );
    const assoData = res.data;
    const associated_careers = assoData.map((assocareer) => ({
      title: assocareer.name,
      name: assocareer.name,
      id: assocareer.id_associated_career,
    }));
    this.setState({ associated_careers });
  }

  /**
   * * Función para obtener las carreras
   * * Obtiene de la base las carreras previamente registradas
   */
  async getNetworks() {
    const res = await axios.get(`${API}/network`);
    const networkData = res.data;
    const networks = networkData.map((network) => ({
      title: network.name,
      name: network.name,
      type: network.network_type,
      id: network.id_network,
    }));
    this.setState({ networks });
  }
}

const studentService = new StudentService();
export default studentService;
