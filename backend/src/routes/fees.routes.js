const express = require("express");
const FeeStructure = require("../models/FeeStructure");
const FeeInvoice = require("../models/FeeInvoice");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");

const router = express.Router();

// 🟢 CREATE FEE STRUCTURE (ADMIN)
router.post(
  "/structure",
  authMiddleware,
  roleMiddleware(["SUPER_ADMIN", "INSTITUTE_ADMIN"]),
  async (req, res) => {
    try {
      const structure = await FeeStructure.create({
        ...req.body,
        instituteId: req.user.instituteId,
        createdBy: req.user._id,
      });

      res.status(201).json(structure);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

// 🟢 GENERATE INVOICE (ADMIN / ACCOUNTANT)
router.post(
  "/invoice",
  authMiddleware,
  roleMiddleware(["SUPER_ADMIN", "INSTITUTE_ADMIN"]),
  async (req, res) => {
    try {
      const invoice = await FeeInvoice.create({
        ...req.body,
        instituteId: req.user.instituteId,
      });

      res.status(201).json(invoice);
    } catch (error) {
      res.status(400).json({ message: "Invoice already exists" });
    }
  }
);

// 🟢 RECORD PAYMENT (ACCOUNTANT)
router.post(
  "/invoice/:id/pay",
  authMiddleware,
  roleMiddleware(["ACCOUNTANT"]),
  async (req, res) => {
    const invoice = await FeeInvoice.findById(req.params.id);

    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    invoice.payments.push(req.body);
    invoice.paidAmount += req.body.amount;

    if (invoice.paidAmount >= invoice.totalAmount) {
      invoice.status = "PAID";
    } else {
      invoice.status = "PARTIAL";
    }

    await invoice.save();
    res.json(invoice);
  }
);

// 🔵 STUDENT / PARENT VIEW
router.get(
  "/invoice/student/:studentId",
  authMiddleware,
  async (req, res) => {
    const invoices = await FeeInvoice.find({
      studentId: req.params.studentId,
      instituteId: req.user.instituteId,
    });

    res.json(invoices);
  }
);

module.exports = router;
