import postgres from "postgres";
import * as dotenv from "dotenv";
dotenv.config();
const MAX_CAPACITY = 100;
const config = {
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  user: "postgres",
  port: 6543,
  database: "postgres",
};
const connString = `postgres://${config.user}:${config.password}@${config.host}:${config.port}/${config.database}`;

console.log("file: db.util.js ~ line 11 ~ connString", connString);
const sql = postgres(connString, {
  prepare: false,
});

export async function addOrder(data) {
  const values = {
    buyer_id: data.buyerId,
    quantity: data.quantity,
  };
  try {
    const rows = await sql`INSERT INTO orders ${sql(values)}`;
    return "New Order Created!";
  } catch (err) {
    return err.message;
  }
}

export async function updateOrder(data) {
  const values = {
    ...(data["buyerId"] && { buyer_id: data["buyerId"] }),
    ...(data["quantity"] && { quantity: data["quantity"] }),
    ...(data["orderStatus"] && { order_status: data["orderStatus"] }),
  };
  try {
    const rows = await sql`UPDATE orders SET  ${sql(values)} WHERE id =${
      data.id
    }`;
    return "Order Updated.";
  } catch (err) {
    return err.message;
  }
}

export async function deleteOrder(id) {
  try {
    const rows = await sql`DELETE FROM orders WHERE id =${id}`;
    return "Order Deleted.";
  } catch (err) {
    return err.message;
  }
}

export async function getCapacity(date) {
  try {
    const [rows] =
      await sql`SELECT COALESCE(SUM(quantity),0) AS result FROM orders WHERE DATE(created)=DATE(${date})`;
    console.log(rows.result);
    const remainingCapacity = MAX_CAPACITY - rows.result;
    return remainingCapacity;
  } catch (err) {
    return err.message;
  }
}
