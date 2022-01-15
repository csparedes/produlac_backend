import Animales from "./tbl_animales";
import Catalogo from "./tbl_catalogo";
import Finca from "./tbl_finca";
import FincaPersona from "./tbl_fincapersona";
import Item from "./tbl_item";
import Persona from "./tbl_personas";
import Rol from "./tbl_rol";

//Asociación de Persona y rol
//* Una persona tiene un rol
Rol.hasOne(Persona,{as:"rol", foreignKey:"rol_id"});
Persona.belongsTo(Rol, { foreignKey: "rol_id" });

// * Una persona tiene una finca
Persona.hasOne(Finca, { as: "persona", foreignKey: "per_id" });
Finca.belongsTo(Persona, { foreignKey: "per_id" });

//* Una persona tiene varias fincas
FincaPersona.hasOne(Persona, {foreignKey: "per_id"});
Persona.belongsTo(FincaPersona, { foreignKey: "per_id" });
FincaPersona.hasOne(Finca, { foreignKey: "fin_id" });
Finca.belongsTo(FincaPersona, { foreignKey: "fin_id" });

// * Un animal pertenece a una finca
Animales.hasOne(Finca, { foreignKey: "fin_id" });
Finca.belongsTo(Animales, { foreignKey: "fin_id" });

// * Un animal tiene un estado
Animales.hasOne(Item, {foreignKey: "ite_id" });
Item.belongsTo(Animales, { foreignKey: "ite_id" });

// * Un catalogo puede tener varios items
Item.hasOne(Catalogo, { foreignKey: "cat_id" });
Catalogo.belongsTo(Item, { foreignKey: "cat_id" });



