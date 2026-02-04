const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const permission = require("../middlewares/permission");

const {
  createFeeStructure,
  assignFeeToStudent,
  addFeePayment,
  getStudentFeeLedger,
} = require("../controllers/fee.controller");

/*
|--------------------------------------------------------------------------
| FEE STRUCTURE
|--------------------------------------------------------------------------
| Permission: fees:manage
| Create class-wise fee structure
*/
router.post(
  "/structure",
  authMiddleware,
  permission("fees:manage"),
  createFeeStructure
);

/*
|--------------------------------------------------------------------------
| ASSIGN FEE TO STUDENT
|--------------------------------------------------------------------------
| Permission: fees:manage
| Creates student fee ledger
*/
router.post(
  "/assign",
  authMiddleware,
  permission("fees:manage"),
  assignFeeToStudent
);

/*
|--------------------------------------------------------------------------
| ADD PAYMENT
|--------------------------------------------------------------------------
| Permission: fees:manage
| Append-only transaction
*/
router.post(
  "/pay",
  authMiddleware,
  permission("fees:manage"),
  addFeePayment
);

/*
|--------------------------------------------------------------------------
| STUDENT / PARENT VIEW
|--------------------------------------------------------------------------
| Permission: fees:read
| View fee ledger + transactions
*/
router.get(
  "/student/:studentId",
  authMiddleware,
  permission("fees:read"),
  getStudentFeeLedger
);

module.exports = router;
