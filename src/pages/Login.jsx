import axios from "axios";
import { useEffect, useState } from "react";
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export default function Login() {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  const submit = async (e) => {
    e.preventDefault();
    try {
      const loginRes = await axios.post(`${BASE_URL}/v2/admin/signin`,userData);
      const {token,expired} = loginRes.data
      document.cookie = `userToken=${token}; expires=${new Date(expired)}`;
    } catch (error) {
      alert("帳號密碼錯誤請重新輸入");
    }
  };
//  取得產品data
useEffect(()=>{
    const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("userToken="))
    ?.split("=")[1];
    axios.defaults.headers.common["Authorization"] = token;
    (async()=>{
        const productsData = await axios.get(
            `${BASE_URL}/v2/api/${API_PATH}/admin/products/all`
        );
        console.log(productsData)
    })()
},[])

  // 密碼顯示
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
    console.log(isPasswordVisible);
  };

  return (
    <>
      <div className="login container mt-5">
        <div className="d-flex justify-content-center flex-column align-items-center">
          <h1 className="mb-5 h1">後台管理者登入</h1>
          <form className="d-flex flex-column align-items-center">
            <div className="d-flex align-items-center mb-5 justify-content-center">
              <label htmlFor="username" className="form-label">
                帳號：
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="form-control w-75"
                onChange={handleChange}
                placeholder="使用者帳號"
                autoComplete="username"
              />
            </div>
            <div className="d-flex align-items-center mb-5 justify-content-center position-relative">
              <label htmlFor="password" className="form-label">
                密碼：
              </label>
              <input
                type={`${(isPasswordVisible && "text") || "password"}`}
                id="password"
                name="password"
                className="form-control w-75"
                onChange={handleChange}
                placeholder="使用者密碼"
                autoComplete="current-password"
              />
              <i
                className={`eye bi  ${
                  (isPasswordVisible && "bi-eye-fill") || "bi-eye-slash-fill"
                }`}
                onClick={togglePasswordVisibility}
              ></i>
            </div>
            <button
              type="button"
              className="btn btn-warning w-50"
              onClick={submit}
            >
              登入
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
