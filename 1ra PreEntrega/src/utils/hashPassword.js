import bcrypt from "bcrypt";

// Hash de una contraseña 
export const createHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

// Valido una contraseña
export const isValidPassword = (userPassword, password) => {
    return bcrypt.compareSync(password, userPassword);
}