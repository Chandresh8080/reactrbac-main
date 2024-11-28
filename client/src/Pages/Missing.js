import { Link } from "react-router-dom"
import './Missing.css'

const Missing = () => {
    return (
        <article className="missing-container">
            <h1 className="missing-title">Oops!</h1>
            <p className="missing-message">Page Not Found</p>
            <div className="missing-link-container">
                <Link to="/" className="missing-link">Visit Our Homepage</Link>
            </div>
        </article>
    )
}

export default Missing
