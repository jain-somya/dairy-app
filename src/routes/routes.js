import express from "express";
import { addOrder, updateOrder, deleteOrder, getCapacity } from "../models/db.js";
const router = express.Router();

router.post("/add", async (req, res) => {
  const response = await addOrder(req.body);
  res.json({ message: response });
});
router.post("/update/:id", async (req, res) => {
  const reqBody = req.body;
  reqBody["id"] = req.params.id;
  const response = await updateOrder(reqBody);
  res.json({ message: response });
});
router.post("/updateStatus/:id", async (req, res) => {
  const reqBody = req.body;
  reqBody["id"] = req.params.id;
  const response = await updateOrder(reqBody);
  res.json({ message: response });
});
router.post("/delete/:id", async (req, res) => {
  const response = await deleteOrder(req.params.id);
  res.json({ message: response });
});
router.get("/checkCapacity/:date", async (req, res) => {
  const response = await getCapacity(req.params.date);
  res.json({ message: response });
});

export default router;
