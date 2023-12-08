const validateUsername = (username: null | string) => {
    if (typeof username !== 'string') {
      return 'Username must be a string';
    }
    if (!username) {
      return 'Username should not be empty';
    }
    if (username.length < 4) {
      return 'Username must be at least 4 characters long';
    }
    if (username.length > 20) {
      return 'Username must be no longer than 20 characters';
    }
    return '';
  };
  
  const validatePassword = (password: null | string) => {
    if (typeof password !== 'string') {
      return 'Password must be a string';
    }
    if (!password) {
      return 'Password should not be empty';
    }
    if (password.length < 8) {
      return 'Password must be at least 8 characters long';
    }
    if (password.length > 32) {
      return 'Password must be no longer than 32 characters';
    }
    const passwordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z]))/;
    if (!passwordRegex.test(password)) {
      return 'Password is too weak';
    }
    return '';
  };
  
  export { validateUsername, validatePassword };
  