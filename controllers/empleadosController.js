var db = require("../conexion/conexion");
var empleado = require("../models/empleado");
var borrar = require("fs");

module.exports = {
  empleado: function (req, res) {
    empleado.obtener(db, function (err, resultados) {
      console.log(resultados);
      res.render("empleados", { title: "Empleados", Empleados: resultados });
    });
  },
  liquidacion: function (req, res) {
    empleado.obtener(db, function (err, resultados) {
      res.render("liquidacion", { title: "Liquidacion", Empleados: resultados });
    });
  },
  crear: function (req, res) {
    res.render("crear", { title: "Crear Empleado" });
  },

  guardar: function (req, res) {
    console.log(req.body);
    console.log(req.file.filename);
    empleado.insertar(db, req.body, req.file, function (err) {
      res.redirect("/empleados");
    });
  },
  eliminar: function (req, res) {
    console.log("Recepcion de datos");
    console.log(req.params.id);
    empleado.retornarDatosID(db, req.params.id, function (err, registros) {
      var nombreImagen = "public/images/"+(registros[0].photo);

      //Si existe la foto en la carpeta images elimina el archivo
      if (borrar.existsSync(nombreImagen)) {
        borrar.unlinkSync(nombreImagen);
      }
      empleado.borrar(db, req.params.id, function (err) {
        res.redirect("/empleados");
      });
    });
  },
  editar: function (req, res) {
    empleado.retornarDatosID(db, req.params.id, function (err, resultados) {
      console.log(resultados[0]);
      res.render("editar", {
        title: "Editar Empleado",
        empleado: resultados[0],
      });
    });
  },
  actualizar: function name(req, res) {
    console.log(req.body);
    //console.log(req.file.filename);
    // if (req.file) {
    //   if (req.file.filename) {
        // empleado.retornarDatosID(db, req.body.id, function (err, resultados) {
        //   var nombreImagen = "public/images/"+(resultados[0].photo);

        //   //Si existe la foto en la carpeta images elimina el archivo
        //   if (borrar.existsSync(nombreImagen)) {
        //     borrar.unlinkSync(nombreImagen);
        //   }
        //   empleado.actualizarPhoto(db, req.body, req.file, function(err){});
        // });
    //   }
    // }
    if (req.body.nombre) {
      empleado.actualizar(db, req.body, function (err) {});
    }

    res.redirect("/empleados");
  }
};
