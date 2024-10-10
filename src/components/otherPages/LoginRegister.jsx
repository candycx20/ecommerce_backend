import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Home from "../homes/home-8/Hero";

const URL = "http://18.218.13.130:2003/";

export default function LoginRegister() {
  const [contrasenia, setContrasenia] = useState('');
  const [contraseniaLogin, setContraseniaLogin] = useState('');
  const [usuario, setUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [emailLogin, setEmailLogin] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [telefono, setTelefono] = useState('');
  const [loginSuccessful, setLoginSuccessful] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorMessageLogin, setErrorMessageLogin] = useState('');
  const [passwordErrors, setPasswordErrors] = useState([]); 

  const navigate = useNavigate();

  // Función para validar el formato de correo electrónico
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidEmailLogin = (emailLogin) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailLogin);
  };

  // Función para validar la contraseña
  const validatePassword = (password) => {
    const errors = [];

    if (password.length < 8) {
      errors.push("La contraseña debe tener al menos 8 caracteres.");
    }
    if (!/[a-z]/.test(password)) {
      errors.push("La contraseña debe incluir al menos una letra minúscula.");
    }
    if (!/[A-Z]/.test(password)) {
      errors.push("La contraseña debe incluir al menos una letra mayúscula.");
    }
    if (!/[0-9]/.test(password)) {
      errors.push("La contraseña debe incluir al menos un número.");
    }
    if (!/[!@#$%^&*(),.?":{}|<>_]/.test(password)) {
      errors.push("La contraseña debe incluir al menos un carácter especial.");
    }

    return errors;
  };

  const isValidPhone = (phone) => {
    const phoneRegex = /^[0-9]+$/;
    return phoneRegex.test(phone);
  };

  const validateRegisterForm = () => {
    if (!emailLogin || !contraseniaLogin) {
      return false;
    }
    return true;
  };
  

  const validateCreateForm = () => {
    if (!usuario || !email || !contrasenia || !nombre || !apellido || !telefono) {
      return false; 
    }
    return true;
  };

  const handdleLogin = async (e) => {
    e.preventDefault();
  
    if (!validateRegisterForm()) {
      setErrorMessageLogin("Por favor, completa todos los campos.");
      return;
    }
    
    if (!isValidEmailLogin(emailLogin)) {
      setErrorMessageLogin("Por favor, ingresa un correo electrónico válido.");
      return false;
    }
    const data = { email: emailLogin, contrasenia: contraseniaLogin };
  
    try {
      const response = await fetch(`${URL}usuarios/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        const errorData = await response.json(); 
        throw new Error(errorData.message || 'Usuario o contraseña incorrectos');
      }
  
      const result = await response.json();
      console.log(result.token);
  
      if (result.token) {
        localStorage.setItem('token', result.token);
        setLoginSuccessful(true);
  
        navigate('/shop-6'); 
        window.location.reload();
      }
  
    } catch (error) {
      setErrorMessageLogin(error.message);
    }
  };

  const handdleRegister = async (e) => {
    e.preventDefault();
  
    if (!validateCreateForm()) {
      setErrorMessage("Por favor, completa todos los campos.");
      return;
    }

    // Validar la contraseña
    const passwordValidationErrors = validatePassword(contrasenia);
    if (passwordValidationErrors.length > 0) {
      setPasswordErrors(passwordValidationErrors); // Almacenar los errores de la contraseña
      handleReturnRegisterClick();
      return;
    } else {
      setPasswordErrors([]); 
    }
    
    if (!isValidEmail(email)) {
      setErrorMessage("Por favor, ingresa un correo electrónico válido.");
      handleReturnRegisterClick();
      return false;
    }

    // Validar el número de teléfono
    if (!isValidPhone(telefono)) {
      setErrorMessage("El número de teléfono solo puede contener números.");
      return;
    } else {
      setErrorMessage(''); 
    }
    
    const data = { 
      nombre_usuario: usuario,
      email: email, 
      contrasenia: contrasenia, 
      nombre: nombre, 
      apellido: apellido, 
      telefono: telefono, 
      id_rol: 2 
    };
  
    try {
      const response = await fetch(`${URL}usuarios/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        const errorData = await response.json(); 
        throw new Error(errorData.message || 'Error de registro');
      }
  
      const result = await response.json();
      console.log("Registro exitoso", result);
      setErrorMessage(''); 
      navigate('/login_register#login-tab'); 
      
      window.location.reload();
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleRegisterClick = (e) => {
    e.preventDefault();
  
    const tabLink = document.querySelector('a[href="#tab-item-register2"]'); 
    if (tabLink) {
      tabLink.click();
    } else {
      console.error('El enlace a la pestaña register2 no fue encontrado.');
    }
  };

  const handleReturnRegisterClick = (e) => {
    const tabLink = document.querySelector('a[href="#tab-item-register"]'); 
    if (tabLink) {
      tabLink.click();
    } else {
      console.error('El enlace a la pestaña register no fue encontrado.');
    }
  };

  return (
    <>
      {loginSuccessful ? (
        <Home />
      ) : (
        <section className="login-register container">
          <h2 className="d-none">Login & Register</h2>
          <ul className="nav nav-tabs mb-5" id="login_register" role="tablist">
            <li className="nav-item" role="presentation">
              <a
                className="nav-link nav-link_underscore active"
                id="login-tab"
                data-bs-toggle="tab"
                href="#tab-item-login"
                role="tab"
                aria-controls="tab-item-login"
                aria-selected="true"
              >
                Login
              </a>
            </li>
            <li className="nav-item" role="presentation">
              <a
                className="nav-link nav-link_underscore"
                id="register-tab"
                data-bs-toggle="tab"
                href="#tab-item-register"
                role="tab"
                aria-controls="tab-item-register"
                aria-selected="false"
              >
                Register
              </a>
            </li>
            <li className="nav-item" role="presentation">
              <a
                className="nav-link nav-link_underscore"
                id="register-tab2"
                data-bs-toggle="tab"
                href="#tab-item-register2"
                role="tab"
                aria-controls="tab-item-register2"
                aria-selected="false"
              >
              </a>
            </li>
          </ul>
          <div className="tab-content pt-2" id="login_register_tab_content">
            <div
              className="tab-pane fade show active"
              id="tab-item-login"
              role="tabpanel"
              aria-labelledby="login-tab"
            >
              <div className="login-form">
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="needs-validation"
                >
                  <div className="form-floating mb-3">
                    <input
                      name="login_email"
                      type="email"
                      className="form-control form-control_gray"
                      placeholder="Email address *"
                      required
                      onChange={(event) => setEmailLogin(event.target.value)}
                    />
                    <label>Email address *</label>
                  </div>

                  <div className="pb-3"></div>

                  <div className="form-floating mb-3">
                    <input
                      name="login_password"
                      type="password"
                      className="form-control form-control_gray"
                      id="customerPasswodInput"
                      placeholder="Password *"
                      required
                      onChange={(event) => setContraseniaLogin(event.target.value)}
                    />
                    <label htmlFor="customerPasswodInput">Password *</label>
                  </div>
                  {errorMessageLogin && (
                    <p className="text-danger mt-3">
                      {errorMessageLogin}
                    </p>
                  )}
                  <button
                    className="btn btn-primary w-100 text-uppercase"
                    type="submit"
                    onClick={handdleLogin}
                  >
                    Log In
                  </button>
                </form>
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="tab-item-register"
              role="tabpanel"
              aria-labelledby="register-tab"
            >
              <div className="register-form">
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="needs-validation"
                >
                  <div className="form-floating mb-3">
                    <input
                      name="user_name"
                      type="text"
                      className="form-control form-control_gray"
                      id="customerUserNameRegisterInput"
                      placeholder="Username"
                      required
                      onChange={(event) => setUsuario(event.target.value)}
                    />
                    <label htmlFor="customerUserNameRegisterInput">Username</label>
                  </div>

                  <div className="pb-3"></div>

                  <div className="form-floating mb-3">
                    <input
                      name="register_email"
                      type="email"
                      className="form-control form-control_gray"
                      id="customerEmailRegisterInput"
                      placeholder="Email address *"
                      required
                      onChange={(event) => setEmail(event.target.value)}
                    />
                    <label htmlFor="customerEmailRegisterInput">
                      Email address *
                    </label>
                  </div>

                  <div className="pb-3"></div>

                  <div className="form-floating mb-3">
                    <input
                      name="register_password"
                      type="password"
                      className="form-control form-control_gray"
                      id="customerPasswodRegisterInput"
                      placeholder="Password *"
                      required
                      onChange={(event) => setContrasenia(event.target.value)}
                    />
                    <label htmlFor="customerPasswodRegisterInput">
                      Password *
                    </label>
                  </div>
                  {/* Errores de la contraseña */}
                  {passwordErrors.length > 0 && (
                    <div className="text-danger mt-3">
                      {passwordErrors.map((error, index) => (
                        <p key={index}>{error}</p>
                      ))}
                    </div>
                  )}
                  {errorMessage && (
                    <p className="text-danger mt-3">
                      {errorMessage}
                    </p>
                  )}
                  <button
                    className="btn btn-primary w-100 text-uppercase"
                    type="submit"
                    onClick={handleRegisterClick}
                  >
                    Register
                  </button>
                </form>
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="tab-item-register2"
              role="tabpanel"
              aria-labelledby="register-tab2" 
            >
              <div className="register-form">
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="needs-validation"
                >
                  <div className="form-floating mb-3">
                    <input
                      name="register_name"
                      type="text"
                      className="form-control form-control_gray"
                      id="customerNameRegisterInput"
                      placeholder="Username"
                      required
                      onChange={(event) => setNombre(event.target.value)}
                    />
                    <label htmlFor="customerNameRegisterInput">Name</label>
                  </div>

                  <div className="pb-3"></div>

                  <div className="form-floating mb-3">
                    <input
                      name="register_lastname"
                      type="text"
                      className="form-control form-control_gray"
                      id="customerLastNameRegisterInput"
                      placeholder="Last Name"
                      required
                      onChange={(event) => setApellido(event.target.value)}
                    />
                    <label htmlFor="customerLastNameRegisterInput">Last name</label>
                  </div>

                  <div className="pb-3"></div>

                  <div className="form-floating mb-3">
                    <input
                      name="register_phone"
                      type="text"
                      className="form-control form-control_gray"
                      id="customerPhoneRegisterInput"
                      placeholder="Phone"
                      required
                      onChange={(event) => setTelefono(event.target.value)}
                    />
                    <label htmlFor="customerPhoneRegisterInput">
                      Phone
                    </label>
                  </div>
                  {errorMessage && (
                    <p className="text-danger mt-3">
                      {errorMessage}
                    </p>
                  )}
                  <button
                    className="btn btn-primary w-100 text-uppercase"
                    type="submit"
                    onClick={handdleRegister}
                  >
                    Create
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
