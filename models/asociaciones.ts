
import Aborto from "./tbl_aborto";
import Animales from "./tbl_animales";
import Catalogo from "./tbl_catalogo";
import Deceso from "./tbl_deceso";
import Especie from "./tbl_especies";
import Finca from "./tbl_finca";
import FincaPersona from "./tbl_fincapersona";
import IngresoEgreso from "./tbl_ingresoegreso";
import Inseminacion from "./tbl_inseminacion";
import Item from "./tbl_item";
import Menu from "./tbl_menu";
import Parto from "./tbl_parto";

import Persona from "./tbl_personas";
import ProdGlobal from "./tbl_prodglobal";
import ProdIndividual from "./tbl_prodindividual";
import Rol from "./tbl_rol";
import SubMenu from "./tbl_submenu";
import Tratamiento from "./tbl_tratamiento";
import Vacuna from "./tbl_vacuna";
import Venta from "./tbl_venta";

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

// * Un animal tiene una especie
Animales.hasOne(Especie, { foreignKey: "esp_id" });
Especie.belongsTo(Animales, { foreignKey: "esp_id" });

// * Un catalogo puede tener varios items
Item.hasOne(Catalogo, { foreignKey: "cat_id" });
Catalogo.belongsTo(Item, { foreignKey: "cat_id" });

// * Una especie tiene un catalogo
Especie.hasOne(Catalogo, { foreignKey: "cat_id" });
Catalogo.belongsTo(Especie, { foreignKey: "cat_id" });

// // * Un parto tiene varios animales
// Parto.hasOne(Animales, { foreignKey: "ani_id", sourceKey: "ani_idmadre" });
// Animales.belongsTo(Parto, { foreignKey: "ani_idmadre", targetKey: "ani_idmadre" });

// Parto.hasOne(Animales, { foreignKey: "ani_id", sourceKey: "ani_idhijo"});
// Animales.belongsTo(Parto, { foreignKey: "ani_idhijo", targetKey: "ani_idhijo" });

// * Un aborto tiene un animal
Aborto.hasOne(Animales, { foreignKey: "ani_id", sourceKey: "ani_idmadre" });
Animales.belongsTo(Aborto, { foreignKey: "ani_id", targetKey: "ani_idmadre" });

// * Una inseminación tiene una persona
Inseminacion.hasOne(Persona, { foreignKey: "per_id" });
Persona.belongsTo(Inseminacion, { foreignKey: "per_id" });

// * Una inseminación tiene un animal
Inseminacion.hasOne(Animales, { foreignKey: "ani_id" });
Animales.belongsTo(Inseminacion, { foreignKey: "ani_id" });

// * Un deceso tiene un animal
Deceso.hasOne(Animales, { foreignKey: "ani_id" });
Animales.belongsTo(Deceso, { foreignKey: "ani_id" });

// * Una venta tiene un animal
Venta.hasOne(Animales, { foreignKey: "ani_id" });
Animales.belongsTo(Venta, { foreignKey: "ani_id" });

// * Una venta tiene un vendedor(persona)
Venta.hasOne(Persona, { foreignKey: "per_id", sourceKey: "per_idvendedor" });
Persona.belongsTo(Venta, { foreignKey: "per_id", targetKey: "per_idvendedor" });

// * Un tratamiento tiene un animal
Tratamiento.hasOne(Animales, { foreignKey: "ani_id" });
Animales.hasOne(Tratamiento, { foreignKey: "ani_id" });

// * Una vacuna tiene un animal
Vacuna.hasOne(Animales, { foreignKey: "ani_id" });
Animales.belongsTo(Vacuna, { foreignKey: "ani_id" });

// * Producción individual tiene un animal
ProdIndividual.hasOne(Animales, { foreignKey: "ani_id" });
Animales.belongsTo(ProdIndividual, { foreignKey: "ani_id" });

// * Producción global tiene una finca
ProdGlobal.hasOne(Finca, { foreignKey: "fin_id" });
Finca.belongsTo(ProdGlobal, { foreignKey: "fin_id" });

// * IngresoEgreso tiene una finca
IngresoEgreso.hasOne(Finca, { foreignKey: "fin_id" });
Finca.belongsTo(IngresoEgreso, { foreignKey: "fin_id" });

// * IngresoEgreso tiene un item
IngresoEgreso.hasOne(Item, { foreignKey: "ite_id", sourceKey: "ite_idingresoegreso" });
Item.belongsTo(IngresoEgreso, { foreignKey: "ite_id", targetKey: "ite_idingresoegreso" });

// * Un menú muestra un rol
Menu.hasOne(Rol, { foreignKey: "rol_id" });
Rol.belongsTo(Menu, { foreignKey: "rol_id" });

// * Un submenu muestra un menu
SubMenu.hasOne(Menu, { foreignKey: "men_id" });
Menu.belongsTo(SubMenu, { foreignKey: "men_id" });