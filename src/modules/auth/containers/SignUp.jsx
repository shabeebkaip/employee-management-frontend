import { useState } from "react";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import {
  TextField,
  IconButton,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import loginBanner from "../../../assets/1728384308140.jpg";
import logo from "../../../assets/btc_networks_logo.jpg";

import { useNavigate } from "react-router-dom";
import { signUpApi } from "../api";
import { enqueueSnackbar } from "notistack";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        setLoading(true);
        signUpApi({ email, password, name })
          .then((res) => {
            localStorage.setItem("token", res.token);
            localStorage.setItem("user", JSON.stringify(res.data));
            enqueueSnackbar("Signed Up Successfully", {
              variant: "success",
              anchorOrigin: { vertical: "top", horizontal: "right" },
            });
          })
          .catch((error) => {
            console.log(error);
            enqueueSnackbar("Error Signing Up", {
              variant: "error",
              anchorOrigin: { vertical: "top", horizontal: "right" },
            });
          });
      } catch (error) {
        console.log(error);
      }
    } else {
      // setTimeout(() => {
      //   setErrors({});
      // }, 1000);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!name) newErrors.name = "Name is required";
    if (!email) {
      newErrors.email = "Email is required";
    } else {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailPattern.test(email)) {
        newErrors.email = "Invalid email address";
      }
    }
    if (!password) newErrors.password = "Password is required";
    if (password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  console.log(showConfirmPassword);
  return (
    <div className="flex w-full h-screen">
      <div className="flex-1">
        {/* login part */}
        <div
          style={{
            // backgroundImage: `url(${loginbg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            height: "100%",
            position: "relative",
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="max-w-auto w-[441px] h-[554px] p-6 bg-transparent rounded-lg">
              <div className="flex justify-center mb-6">
                <img src={logo} alt="Logo" />
              </div>
              <h1 className="mb-8 text-3xl font-medium">
                Manage your employees!
              </h1>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-4 mb-5">
                  <TextField
                    label="Enter Name *"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    variant="outlined"
                    fullWidth
                    error={!!errors.name}
                    helperText={errors.name}
                    onFocus={() => setErrors({ ...errors, name: "" })}
                  />
                  <TextField
                    label="Enter Email *"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    variant="outlined"
                    fullWidth
                    error={!!errors.email}
                    helperText={errors.email}
                    onFocus={() => setErrors({ ...errors, email: "" })}
                  />
                </div>
                <div className="grid gap-4 mb-5">
                  <TextField
                    autoComplete="off"
                    label="Enter Password *"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    variant="outlined"
                    fullWidth
                    error={!!errors.password}
                    helperText={errors.password}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? (
                              <MdOutlineVisibilityOff size={20} />
                            ) : (
                              <MdOutlineVisibility size={20} />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    onFocus={() => setErrors({ ...errors, password: "" })}
                  />
                  <TextField
                    autoComplete="off"
                    label="Confirm Password *"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    variant="outlined"
                    fullWidth
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            edge="end"
                          >
                            {showConfirmPassword ? (
                              <MdOutlineVisibilityOff size={20} />
                            ) : (
                              <MdOutlineVisibility size={20} />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    onFocus={() =>
                      setErrors({ ...errors, confirmPassword: "" })
                    }
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-4 py-2 text-white bg-[#00aeaa] rounded-md hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  {loading ? (
                    <CircularProgress
                      style={{ color: "#ffffff" }}
                      size={"25px"}
                    />
                  ) : (
                    "Sign Up"
                  )}
                </button>
                <p className="mt-2">
                  Already have an Account ?{" "}
                  <a href="/login" className="text-blue-700">
                    Login
                  </a>{" "}
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1">
        <div
          style={{
            backgroundImage: `url(${loginBanner})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            height: "100%",
            position: "relative",
          }}
        />
      </div>
    </div>
  );
};

export default Login;
