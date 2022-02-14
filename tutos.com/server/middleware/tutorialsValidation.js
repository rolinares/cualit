const { body } = require("express-validator");

exports.validate = (method) => {
  switch (method) {
    case "create": {
      return [
        body("title", "El título es un campo requerido").exists(),
        body("video_url", "Debe ingresar una URL válida").optional().isURL(),
        body(
          "published_status",
          "El estado del tutorial debe ser un valor booleano"
        )
          .optional()
          .isBoolean(),
      ];
    }
    case "update": {
      return [
        body("title", "El título es un campo requerido").exists(),
        body("video_url", "Debe ingresar una URL válida").optional().isURL(),
      ];
    }
  }
};
