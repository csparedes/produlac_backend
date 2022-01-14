import Finca from "./tbl_finca";
import FincaPersona from "./tbl_fincapersona";
import Persona from "./tbl_personas";
import Rol from "./tbl_rol";

//Asociación de Persona y rol
//* Una persona tiene un rol
Rol.hasOne(Persona,{as:"rol", foreignKey:"rol_id"});
Persona.belongsTo(Rol,{ foreignKey:"rol_id"});

//* Una persona tiene varias fincas
// FincaPersona.belongsTo(Persona);
// Persona.hasOne(FincaPersona);

// Finca.belongsTo(FincaPersona);
// FincaPersona.hasOne(Finca);