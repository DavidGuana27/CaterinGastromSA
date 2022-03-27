var express = require("express");
var router = express.Router();

const empleadosController = require("../controllers/empleadosController");
var multer = require("multer");
var fecha = Date.now();
var rutaAlmacen = multer.diskStorage({
  destination: function (request, file, callback) {
    callback(null, "./public/images/");
  },
  filename:function(request, file, callback) {
    console.log(file);
    callback(null, fecha + "-" + file.originalname);
  }
});

var cargar = multer({ storage:rutaAlmacen });

/* GET empleados (empleados.ejs) */
router.get("/", empleadosController.empleado);
router.get("/liquidacion", empleadosController.liquidacion);

/* POST listarEmpledos (empleados.ejs)*/
router.post("/",cargar.single("photo") ,empleadosController.guardar);

/* GET crearEmpleado (crear.ejs)*/
router.get("/crear", empleadosController.crear);

/* EliminarEmpleado */
router.post('/eliminar/:id', empleadosController.eliminar);

router.get('/editar/:id', empleadosController.editar);

router.post("/actualizar",cargar.single("photo") ,empleadosController.actualizar);

module.exports = router;
