import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Home from "../homes/home-8/Hero";

const URL = "http://candy21.icu/";

export default function LoginRegister() {
  const [contrasenia, setContrasenia] = useState('');
  const [email, setEmail] = useState('');
  const [loginSuccessful, setLoginSuccessful] = useState(false);

  const navigate = useNavigate();  // Hook para redirigir

  const handdleLogin = (e) => {
    e.preventDefault();
    const data = { email: email, contrasenia: contrasenia };

    fetch(`${URL}usuarios/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result.token);

        if (result.token) {
          localStorage.setItem('token', result.token);
          setLoginSuccessful(true);
          navigate('/shop-6');  // Redirigir a la página de Shop después de iniciar sesión
        }
      })
      .catch((error) => {
        console.log({ error });
      });
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
                      onChange={(event) => setEmail(event.target.value)}
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
                      onChange={(event) => setContrasenia(event.target.value)}
                    />
                    <label htmlFor="customerPasswodInput">Password *</label>
                  </div>

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
                      name="register_username"
                      type="text"
                      className="form-control form-control_gray"
                      id="customerNameRegisterInput"
                      placeholder="Username"
                      required
                    />
                    <label htmlFor="customerNameRegisterInput">Username</label>
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
                    />
                    <label htmlFor="customerPasswodRegisterInput">
                      Password *
                    </label>
                  </div>

                  <button
                    className="btn btn-primary w-100 text-uppercase"
                    type="submit"
                  >
                    Register
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
