import { NavLink } from 'react-router-dom'
import './TimeApp.css'
import { AppRouter } from './router/AppRouter'

export const TimeApp = () => {

    return (
        <div className="mainApp">
            <div className="header">
                <NavLink to="/" className="brand">
                    <img src="imgs/iseazy.png" alt="iseazy logo" />
                </NavLink>
                <NavLink to="/config" className="configButton">
                    <span className="configButton material-symbols-outlined">
                        settings
                    </span>
                </NavLink>
            </div>
            <AppRouter />
        </div>
    )
}
