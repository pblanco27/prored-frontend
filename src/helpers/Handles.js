/**
 * * Maneja inputs simples
 * * Función que asigna el valor ingresado
 * * en la variable correspondiente
 */
export function handleSimpleInputChange(event) {
  const { name, value } = event.target;
  this.setState({
    [name]: value,
  });
}
