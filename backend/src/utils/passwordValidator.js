const validatePassword = (password, policy) => {
  if (password.length < policy.minLength) {
    return "Password too short";
  }

  if (policy.requireNumber && !/\d/.test(password)) {
    return "Password must include a number";
  }

  return null;
};

module.exports = validatePassword;
