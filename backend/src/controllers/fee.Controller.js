const FeeStructure = require("../models/FeeStructure");
const FeeLedger = require("../models/FeeLedger");

/*
|--------------------------------------------------------------------------
| CREATE FEE STRUCTURE (ADMIN)
|--------------------------------------------------------------------------
*/
exports.createFeeStructure = async (req, res) => {
  try {
    const structure = await FeeStructure.create({
      instituteId: req.user.instituteId,
      createdBy: req.user._id,
      ...req.body,
    });

    res.status(201).json(structure);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/*
|--------------------------------------------------------------------------
| ASSIGN FEE TO STUDENT (ADMIN)
|--------------------------------------------------------------------------
| Creates ONE ledger per student
*/
exports.assignFeeToStudent = async (req, res) => {
  try {
    const { studentId, className, totalFee } = req.body;

    // ❗ Prevent duplicate ledger
    const existingLedger = await FeeLedger.findOne({
      instituteId: req.user.instituteId,
      studentId,
    });

    if (existingLedger) {
      return res
        .status(400)
        .json({ message: "Fee already assigned to this student" });
    }

    const ledger = await FeeLedger.create({
      instituteId: req.user.instituteId,
      studentId,
      className,
      totalFee,
      paidAmount: 0,
      transactions: [],
    });

    res.status(201).json(ledger);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/*
|--------------------------------------------------------------------------
| ADD PAYMENT (ACCOUNTANT)
|--------------------------------------------------------------------------
| Append-only accounting entry
*/
exports.addFeePayment = async (req, res) => {
  try {
    const { ledgerId, amount, mode, reference } = req.body;

    const ledger = await FeeLedger.findOne({
      _id: ledgerId,
      instituteId: req.user.instituteId,
    });

    if (!ledger) {
      return res.status(404).json({ message: "Fee ledger not found" });
    }

    ledger.transactions.push({
      amount,
      mode,
      reference,
    });

    ledger.paidAmount += amount;

    await ledger.save();

    res.json({
      message: "Payment recorded successfully",
      ledger,
      dueAmount: ledger.totalFee - ledger.paidAmount,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/*
|--------------------------------------------------------------------------
| GET STUDENT FEE LEDGER (STUDENT / PARENT)
|--------------------------------------------------------------------------
*/
exports.getStudentFeeLedger = async (req, res) => {
  try {
    const { studentId } = req.params;

    const ledger = await FeeLedger.findOne({
      instituteId: req.user.instituteId,
      studentId,
    }).populate("studentId", "name email");

    if (!ledger) {
      return res.status(404).json({ message: "No fee record found" });
    }

    res.json({
      totalFee: ledger.totalFee,
      paidAmount: ledger.paidAmount,
      dueAmount: ledger.totalFee - ledger.paidAmount,
      transactions: ledger.transactions,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
