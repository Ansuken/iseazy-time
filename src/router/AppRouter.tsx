import { Route, Routes } from "react-router-dom"
import { HomePage } from "../pages/home/HomePage"
import { ConfigPage } from "../pages/config/ConfigPage"

export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/config" element={<ConfigPage />} />
        </Routes>
    )
}