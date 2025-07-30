export function signUpValidation(data) {
  const { name, email, password, confirmPassword } = data;
  if (!name || !email || !password || !confirmPassword) {
    throw new Error("All fields are required");
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("Invalid email address");
  }

  if (password !== confirmPassword) {
    throw new Error("Password unmatched");
  }

  if (password.length < 6) {
    throw new Error("Password must contain at least 6 characters long");
  }

  return true;
}

export function signInValidation(data) {
  const { email, password } = data;

  if (!email || !password) {
    throw new Error("All fields are required");
  }

  return true;
}

export function createProductValidation(data) {
  const { name, description, price, category, image } = data;

  if (!name || !description || !price || !category || !image) {
    throw new Error("All fields are required");
  }

  return true;
}
