import { closeModalUserlogin } from "@/utlis/aside";
import { Link } from "react-router-dom";
import { useEffect, useState} from "react";

export default function CustomerLogin() {

  
  const [loginSuccessful, setLoginSuccessful] = useState(false)

  const handdleLogin = (e) =>{
    e.preventDefault();
    const data = {email: email, contrasenia: contrasenia};

    fetch('http://18.218.13.130:2003/usuarios/login',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(response => response.json())
    .then(result => {
      console.log(result.token)

      if(result.token){
        localStorage.setItem('token', result.token)
        setLoginSuccessful(true)
      }
    }).catch(error =>{
      console.log(error)
    })
  }

  useEffect(() => {
    const pageOverlay = document.getElementById("pageOverlay");

    pageOverlay.addEventListener("click", closeModalUserlogin);

    return () => {
      pageOverlay.removeEventListener("click", closeModalUserlogin);
    };
  }, []);

  return (
    <> {loginSuccessful ? <Home />:
    <div
      id="userAside"
      className="aside aside_right overflow-hidden customer-forms "
    >
      <div className="customer-forms__wrapper d-flex position-relative">
        <div className="customer__login">
          <div className="aside-header d-flex align-items-center">
            <h3 className="text-uppercase fs-6 mb-0">Login</h3>
            <button
              onClick={() => closeModalUserlogin()}
              className="btn-close-lg js-close-aside ms-auto"
            />
          </div>
          <form onSubmit={(e) => e.preventDefault()} className="aside-content">
            <div className="form-floating mb-3">
              <input
                name="email"
                type="email"
                className="form-control form-control_gray"
                placeholder="name@example.com"
              />
              <label>Username or email address *</label>
            </div>
            <div className="pb-3" />
            <div className="form-label-fixed mb-3">
              <label className="form-label">Password *</label>
              <input
                name="password"
                className="form-control form-control_gray"
                type="password"
                placeholder="********"
              />
            </div>
            {/* <div className="d-flex align-items-center mb-3 pb-2">
              <div className="form-check mb-0">
                <input
                  name="remember"
                  className="form-check-input form-check-input_fill"
                  type="checkbox"
                  defaultValue
                />
                <label className="form-check-label text-secondary">
                  Remember me
                </label>
              </div>
              <Link to="/reset_password" className="btn-text ms-auto">
                Lost password?
              </Link>
            </div> */}
            <button
              className="btn btn-primary w-100 text-uppercase"
              type="submit"
              onClick={handdleLogin}
            >
              Log In
            </button>
            <div className="customer-option mt-4 text-center">
              <span className="text-secondary">No account yet?</span>{" "}
              <Link
                to="/login_register#register-tab"
                className="btn-text js-show-register"
              >
                Create Account
              </Link>
            </div>
          </form>
        </div>
        <div className="customer__register">
          <div className="aside-header d-flex align-items-center">
            <h3 className="text-uppercase fs-6 mb-0">Create an account</h3>
            <button className="btn-close-lg js-close-aside btn-close-aside ms-auto" />
          </div>
          <form onSubmit={(e) => e.preventDefault()} className="aside-content">
            <div className="form-floating mb-4">
              <input
                name="username"
                type="text"
                className="form-control form-control_gray"
                placeholder="Username"
              />
              <label>Username</label>
            </div>
            <div className="pb-1" />
            <div className="form-floating mb-4">
              <input
                name="email"
                type="email"
                className="form-control form-control_gray"
                placeholder="user@company.com"
              />
              <label>Email address *</label>
            </div>
            <div className="pb-1" />
            <div className="form-label-fixed mb-4">
              <label className="form-label">Password *</label>
              <input
                name="password"
                className="form-control form-control_gray"
                type="password"
                placeholder="*******"
              />
            </div>
            <p className="text-secondary mb-4">
              Your personal data will be used to support your experience
              throughout this website, to manage access to your account, and for
              other purposes described in our privacy policy.
            </p>
            <button
              className="btn btn-primary w-100 text-uppercase"
              type="submit"
            >
              Register
            </button>
            <div className="customer-option mt-4 text-center">
              <span className="text-secondary">Already have account?</span>
              <a href="#" className="btn-text js-show-login">
                Login
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
    } </>
  );
}
