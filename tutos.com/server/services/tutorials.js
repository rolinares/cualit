const db = require("./db");
const { generateToken } = require("../utils/token");

async function getMultiple(filter) {
  const rows = await db.query(
    `SELECT * FROM Tutorial WHERE ${
      filter
        ? `(title LIKE '%${filter}%' OR description LIKE '%${filter}%') AND published_status = true`
        : "published_status = true"
    };`
  );
  const data = !rows ? [] : rows;

  return {
    data,
  };
}

async function getById(id) {
  const rows = await db.query(
    `SELECT * FROM Tutorial WHERE id = ${id} AND published_status = true;`
  );
  const data = !rows ? [] : rows;

  return {
    data,
  };
}

async function create(tutorial) {
  const result = await db.query(
    `INSERT INTO Tutorial 
    (title, video_url, description, published_status, deleted_at) 
    VALUES 
    ('${tutorial.title}', '${tutorial.video_url}', '${tutorial.description}', true, null)`
  );

  let message = "Error in creating tutorial";

  if (result.affectedRows) {
    message = "Tutorial created successfully";
  }

  return { message };
}

async function update(id, tutorial) {
  const result = await db.query(
    `UPDATE Tutorial 
    SET title="${tutorial.title}", video_url="${tutorial.video_url}", description="${tutorial.description}"
    WHERE id=${id}`
  );

  let message = "Error in updating tutorial";

  if (result.affectedRows) {
    message = "Tutorial updated successfully";
  }

  return { message };
}

async function remove(id) {
  const result = await db.query(
    `UPDATE Tutorial 
    SET published_status = false, deleted_at = NOW() 
    WHERE id = ${id}`
  );

  let message = "Error in deleting tutorial";

  if (result.affectedRows) {
    message = "Tutorial deleted successfully";
  }

  return { message };
}

async function removeAll() {
  const result = await db.query(`UPDATE Tutorial 
    SET published_status = false, deleted_at = NOW()`);

  let message = "Error in deleting tutorials";

  if (result.affectedRows) {
    message = "Tutorials deleted successfully";
  }

  return { message };
}

async function getToken() {
  return generateToken();
}

module.exports = {
  getMultiple,
  getById,
  create,
  update,
  remove,
  removeAll,
  getToken,
};
