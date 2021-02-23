import axios from "axios";
import "tailwindcss/tailwind.css";
import { serverErrorStore } from "../ServerErrorStore";
import '../styles/globals.css'

axios.interceptors.response.use(
  null,
  error => {
    serverErrorStore.addError(error?.response?.data)
    return Promise.reject(error)
  }
)

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
