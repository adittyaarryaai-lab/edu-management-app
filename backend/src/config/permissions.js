module.exports = {
  institute_admin: [
    "students:read",
    "students:write",
    "teachers:manage",
    "fees:manage",
    "reports:view",
    "settings:manage"
  ],

  teacher: [
    "attendance:write",
    "marks:write",
    "materials:write",
    "students:read"
  ],

  student: [
    "attendance:read",
    "marks:read",
    "fees:read",
    "materials:read"
  ],

  parent: [
    "attendance:read",
    "marks:read",
    "fees:read",
    "materials:read"
  ],

  accountant: [
    "fees:manage"
  ]
};
