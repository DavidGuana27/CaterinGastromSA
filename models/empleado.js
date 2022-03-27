module.exports = {
    obtener:function(conexion, funcion){
        conexion.query("SELECT e.id, e.nombre, e.apellido, e.rol, e.categoria, e.photo, c.valorxhora , e.horasLaboradas, (c.valorxhora*e.horasLaboradas) AS salario FROM empleados AS e, categorias AS c WHERE e.categoria = c.letra;",
         funcion);
    },
    insertar:function(conexion, datos, photo, funcion){
        conexion.query("INSERT INTO empleados (nombre, apellido, rol, categoria, photo, horasLaboradas) VALUES (?,?,?,?,?,?)",
        [datos.nombre, datos.apellido, datos.rol, datos.categoria, photo.filename, datos.horasLaboradas], funcion);
    },
    retornarDatosID: function(conexion, id, funcion) {
        conexion.query("SELECT * FROM empleados WHERE id = ?",[id] ,funcion);
    },
    borrar:function(conexion, id, funcion){
        conexion.query("DELETE FROM empleados WHERE id = ?", [id], funcion);
    },
    actualizar:function(conexion, datos, funcion){
        conexion.query("UPDATE empleados SET nombre = ?, apellido = ?, rol = ?, categoria = ?, horasLaboradas = ?, salario = ? WHERE id = ?", 
        [datos.nombre, datos.apellido, datos.rol, datos.categoria, datos.horasLaboradas, datos.salario, datos.id], funcion);
    },
    actualizarPhoto:function(conexion, datos, photo, funcion){
        conexion.query("UPDATE empleados SET photo = ? WHERE id = ?", 
        [photo.filename, datos.id], funcion);
    }
}