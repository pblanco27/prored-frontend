import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";

/**
 * * Función que obtiene la bandera del país dado su código
 */
function countryToFlag(isoCode) {
  return typeof String.fromCodePoint !== "undefined"
    ? isoCode
        .toUpperCase()
        .replace(/./g, (char) =>
          String.fromCodePoint(char.charCodeAt(0) + 127397)
        )
    : isoCode;
}

/**
 * * Clases de CSS utilizadas por el select
 */
const useStyles = makeStyles({
  option: {
    fontSize: 15,
    "& > span": {
      marginRight: 10,
      fontSize: 20,
    },
  },
});

/**
 * * Componente de Material UI
 * * Consiste de un select con autocompletado que incluye
 * * el nombre y código de cada país
 */
export default function CountrySelect(props) {
  const classes = useStyles();
  return (
    <Autocomplete
      disabled={props.disabled}
      defaultValue={props.value}
      id="country-select-demo"
      style={{ width: "100%" }}
      options={countries}
      classes={{
        option: classes.option,
      }}
      onChange={props.onChange}
      autoHighlight
      getOptionLabel={(option) => option.label}
      renderOption={(option) => (
        <React.Fragment>
          <span>{countryToFlag(option.code)}</span>
          {option.label} ({option.code})
        </React.Fragment>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label={props.label}
          variant="outlined"
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-password", // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
}

/**
 * * Const de los paises que se cargan en la aplicación
 */
export const countries = [
  { code: "AF", label: "Afganistán" },
  { code: "AL", label: "Albania" },
  { code: "DE", label: "Alemania" },
  { code: "DZ", label: "Algeria" },
  { code: "AD", label: "Andorra" },
  { code: "AO", label: "Angola" },
  { code: "AI", label: "Anguila" },
  { code: "AQ", label: "Antártida" },
  { code: "AG", label: "Antigua y Barbuda" },
  { code: "SA", label: "Arabia Saudita" },
  { code: "AR", label: "Argentina" },
  { code: "AM", label: "Armenia" },
  { code: "AW", label: "Aruba" },
  { code: "AU", label: "Australia" },
  { code: "AT", label: "Austria" },
  { code: "AZ", label: "Azerbaiyán" },
  { code: "BE", label: "Bélgica" },
  { code: "BS", label: "Bahamas" },
  { code: "BH", label: "Bahrein" },
  { code: "BD", label: "Bangladesh" },
  { code: "BB", label: "Barbados" },
  { code: "BZ", label: "Belice" },
  { code: "BJ", label: "Benín" },
  { code: "BT", label: "Bhután" },
  { code: "BY", label: "Bielorrusia" },
  { code: "MM", label: "Birmania" },
  { code: "BO", label: "Bolivia" },
  { code: "BA", label: "Bosnia y Herzegovina" },
  { code: "BW", label: "Botsuana" },
  { code: "BR", label: "Brasil" },
  { code: "BN", label: "Brunéi" },
  { code: "BG", label: "Bulgaria" },
  { code: "BF", label: "Burkina Faso" },
  { code: "BI", label: "Burundi" },
  { code: "CV", label: "Cabo Verde" },
  { code: "KH", label: "Camboya" },
  { code: "CM", label: "Camerún" },
  { code: "CA", label: "Canadá" },
  { code: "TD", label: "Chad" },
  { code: "CL", label: "Chile" },
  { code: "CN", label: "China" },
  { code: "CY", label: "Chipre" },
  { code: "VA", label: "Ciudad del Vaticano" },
  { code: "CO", label: "Colombia" },
  { code: "KM", label: "Comoras" },
  { code: "CG", label: "República del Congo" },
  { code: "CD", label: "República Democrática del Congo" },
  { code: "KP", label: "Corea del Norte" },
  { code: "KR", label: "Corea del Sur" },
  { code: "CI", label: "Costa de Marfil" },
  { code: "CR", label: "Costa Rica" },
  { code: "HR", label: "Croacia" },
  { code: "CU", label: "Cuba" },
  { code: "CW", label: "Curazao" },
  { code: "DK", label: "Dinamarca" },
  { code: "DM", label: "Dominica" },
  { code: "EC", label: "Ecuador" },
  { code: "EG", label: "Egipto" },
  { code: "SV", label: "El Salvador" },
  { code: "AE", label: "Emiratos Árabes Unidos" },
  { code: "ER", label: "Eritrea" },
  { code: "SK", label: "Eslovaquia" },
  { code: "SI", label: "Eslovenia" },
  { code: "ES", label: "España" },
  { code: "US", label: "Estados Unidos de América" },
  { code: "EE", label: "Estonia" },
  { code: "ET", label: "Etiopía" },
  { code: "PH", label: "Filipinas" },
  { code: "FI", label: "Finlandia" },
  { code: "FJ", label: "Fiyi" },
  { code: "FR", label: "Francia" },
  { code: "GA", label: "Gabón" },
  { code: "GM", label: "Gambia" },
  { code: "GE", label: "Georgia" },
  { code: "GH", label: "Ghana" },
  { code: "GI", label: "Gibraltar" },
  { code: "GD", label: "Granada" },
  { code: "GR", label: "Grecia" },
  { code: "GL", label: "Groenlandia" },
  { code: "GP", label: "Guadalupe" },
  { code: "GU", label: "Guam" },
  { code: "GT", label: "Guatemala" },
  { code: "GF", label: "Guayana Francesa" },
  { code: "GG", label: "Guernsey" },
  { code: "GN", label: "Guinea" },
  { code: "GQ", label: "Guinea Ecuatorial" },
  { code: "GW", label: "Guinea-Bissau" },
  { code: "GY", label: "Guyana" },
  { code: "HT", label: "Haití" },
  { code: "HN", label: "Honduras" },
  { code: "HK", label: "Hong kong" },
  { code: "HU", label: "Hungría" },
  { code: "IN", label: "India" },
  { code: "ID", label: "Indonesia" },
  { code: "IR", label: "Irán" },
  { code: "IQ", label: "Irak" },
  { code: "IE", label: "Irlanda" },
  { code: "BV", label: "Isla Bouvet" },
  { code: "IM", label: "Isla de Man" },
  { code: "CX", label: "Isla de Navidad" },
  { code: "NF", label: "Isla Norfolk" },
  { code: "IS", label: "Islandia" },
  { code: "BM", label: "Islas Bermudas" },
  { code: "KY", label: "Islas Caimán" },
  { code: "CC", label: "Islas Cocos (Keeling)" },
  { code: "CK", label: "Islas Cook" },
  { code: "AX", label: "Islas de Åland" },
  { code: "FO", label: "Islas Feroe" },
  { code: "GS", label: "Islas Georgias del Sur y Sandwich del Sur" },
  { code: "HM", label: "Islas Heard y McDonald" },
  { code: "MV", label: "Islas Maldivas" },
  { code: "FK", label: "Islas Malvinas" },
  { code: "MP", label: "Islas Marianas del Norte" },
  { code: "MH", label: "Islas Marshall" },
  { code: "PN", label: "Islas Pitcairn" },
  { code: "SB", label: "Islas Salomón" },
  { code: "TC", label: "Islas Turcas y Caicos" },
  { code: "UM", label: "Islas Ultramarinas Menores de Estados Unidos" },
  { code: "VG", label: "Islas Vírgenes Británicas" },
  { code: "VI", label: "Islas Vírgenes de los Estados Unidos" },
  { code: "IL", label: "Israel" },
  { code: "IT", label: "Italia" },
  { code: "JM", label: "Jamaica" },
  { code: "JP", label: "Japón" },
  { code: "JE", label: "Jersey" },
  { code: "JO", label: "Jordania" },
  { code: "KZ", label: "Kazajistán" },
  { code: "KE", label: "Kenia" },
  { code: "KG", label: "Kirguistán" },
  { code: "KI", label: "Kiribati" },
  { code: "KW", label: "Kuwait" },
  { code: "LB", label: "Líbano" },
  { code: "LA", label: "Laos" },
  { code: "LS", label: "Lesoto" },
  { code: "LV", label: "Letonia" },
  { code: "LR", label: "Liberia" },
  { code: "LY", label: "Libia" },
  { code: "LI", label: "Liechtenstein" },
  { code: "LT", label: "Lituania" },
  { code: "LU", label: "Luxemburgo" },
  { code: "MX", label: "México" },
  { code: "MC", label: "Mónaco" },
  { code: "MO", label: "Macao" },
  { code: "MK", label: "Macedônia" },
  { code: "MG", label: "Madagascar" },
  { code: "MY", label: "Malasia" },
  { code: "MW", label: "Malawi" },
  { code: "ML", label: "Mali" },
  { code: "MT", label: "Malta" },
  { code: "MA", label: "Marruecos" },
  { code: "MQ", label: "Martinica" },
  { code: "MU", label: "Mauricio" },
  { code: "MR", label: "Mauritania" },
  { code: "YT", label: "Mayotte" },
  { code: "FM", label: "Micronesia" },
  { code: "MD", label: "Moldavia" },
  { code: "MN", label: "Mongolia" },
  { code: "ME", label: "Montenegro" },
  { code: "MS", label: "Montserrat" },
  { code: "MZ", label: "Mozambique" },
  { code: "nan", label: "Namibia" },
  { code: "NR", label: "Nauru" },
  { code: "NP", label: "Nepal" },
  { code: "NI", label: "Nicaragua" },
  { code: "NE", label: "Niger" },
  { code: "NG", label: "Nigeria" },
  { code: "NU", label: "Niue" },
  { code: "NO", label: "Noruega" },
  { code: "NC", label: "Nueva Caledonia" },
  { code: "NZ", label: "Nueva Zelanda" },
  { code: "OM", label: "Omán" },
  { code: "NL", label: "Países Bajos" },
  { code: "PK", label: "Pakistán" },
  { code: "PW", label: "Palau" },
  { code: "PS", label: "Palestina" },
  { code: "PA", label: "Panamá" },
  { code: "PG", label: "Papúa Nueva Guinea" },
  { code: "PY", label: "Paraguay" },
  { code: "PE", label: "Perú" },
  { code: "PF", label: "Polinesia Francesa" },
  { code: "PL", label: "Polonia" },
  { code: "PT", label: "Portugal" },
  { code: "PR", label: "Puerto Rico" },
  { code: "QA", label: "Qatar" },
  { code: "GB", label: "Reino Unido" },
  { code: "CF", label: "República Centroafricana" },
  { code: "CZ", label: "República Checa" },
  { code: "DO", label: "República Dominicana" },
  { code: "SS", label: "República de Sudán del Sur" },
  { code: "RE", label: "Reunión" },
  { code: "RW", label: "Ruanda" },
  { code: "RO", label: "Rumanía" },
  { code: "RU", label: "Rusia" },
  { code: "EH", label: "Sahara Occidental" },
  { code: "WS", label: "Samoa" },
  { code: "AS", label: "Samoa Americana" },
  { code: "BL", label: "San Bartolomé" },
  { code: "KN", label: "San Cristóbal y Nieves" },
  { code: "SM", label: "San Marino" },
  { code: "MF", label: "San Martín (Francia)" },
  { code: "PM", label: "San Pedro y Miquelón" },
  { code: "VC", label: "San Vicente y las Granadinas" },
  { code: "SH", label: "Santa Elena" },
  { code: "LC", label: "Santa Lucía" },
  { code: "ST", label: "Santo Tomé y Príncipe" },
  { code: "SN", label: "Senegal" },
  { code: "RS", label: "Serbia" },
  { code: "SC", label: "Seychelles" },
  { code: "SL", label: "Sierra Leona" },
  { code: "SG", label: "Singapur" },
  { code: "SX", label: "Sint Maarten" },
  { code: "SY", label: "Siria" },
  { code: "SO", label: "Somalia" },
  { code: "LK", label: "Sri lanka" },
  { code: "ZA", label: "Sudáfrica" },
  { code: "SD", label: "Sudán" },
  { code: "SE", label: "Suecia" },
  { code: "CH", label: "Suiza" },
  { code: "SR", label: "Surinám" },
  { code: "SJ", label: "Svalbard y Jan Mayen" },
  { code: "SZ", label: "Swazilandia" },
  { code: "TJ", label: "Tayikistán" },
  { code: "TH", label: "Tailandia" },
  { code: "TW", label: "Taiwán" },
  { code: "TZ", label: "Tanzania" },
  { code: "IO", label: "Territorio Británico del Océano Índico" },
  { code: "TF", label: "Territorios Australes y Antárticas Franceses" },
  { code: "TL", label: "Timor Oriental" },
  { code: "TG", label: "Togo" },
  { code: "TK", label: "Tokelau" },
  { code: "TO", label: "Tonga" },
  { code: "TT", label: "Trinidad y Tobago" },
  { code: "TN", label: "Tunez" },
  { code: "TM", label: "Turkmenistán" },
  { code: "TR", label: "Turquía" },
  { code: "TV", label: "Tuvalu" },
  { code: "UA", label: "Ucrania" },
  { code: "UG", label: "Uganda" },
  { code: "UY", label: "Uruguay" },
  { code: "UZ", label: "Uzbekistán" },
  { code: "VU", label: "Vanuatu" },
  { code: "VE", label: "Venezuela" },
  { code: "VN", label: "Vietnam" },
  { code: "WF", label: "Wallis y Futuna" },
  { code: "YE", label: "Yemen" },
  { code: "DJ", label: "Yibuti" },
  { code: "ZM", label: "Zambia" },
  { code: "ZW", label: "Zimbabue" },
];
