const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");

const {
  createFeeStructure,
  assignFeeToStudent,
  addFeePayment,
  getStudentFeeLedger,
} = require("../controllers/fee.controller");

/*
|--------------------------------------------------------------------------
| FEE STRUCTURE (ADMIN)
|--------------------------------------------------------------------------
| Create class-wise fee structure
*/
router.post(
  "/structure",
  authMiddleware,
  roleMiddleware(["SUPER_ADMIN", "INSTITUTE_ADMIN"]),
  createFeeStructure
);

/*
|--------------------------------------------------------------------------
| ASSIGN FEE TO STUDENT (ADMIN)
|--------------------------------------------------------------------------
| Creates student fee ledger
*/
router.post(
  "/assign",
  authMiddleware,
  roleMiddleware(["SUPER_ADMIN", "INSTITUTE_ADMIN"]),
  assignFeeToStudent
);

/*
|--------------------------------------------------------------------------
| ADD PAYMENT (ACCOUNTANT)
|--------------------------------------------------------------------------
| Append-only transaction
*/
router.post(
  "/pay",
  authMiddleware,
  roleMiddleware(["ACCOUNTANT"]),
  addFeePayment
);

/*
|--------------------------------------------------------------------------
| STUDENT / PARENT VIEW
|--------------------------------------------------------------------------
| View fee ledger + transactions
*/
router.get(
  "/student/:studentId",
  authMiddleware,
  roleMiddleware(["STUDENT", "PARENT"]),
  getStudentFeeLedger
);

module.exports = router;
