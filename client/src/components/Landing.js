import { Link } from "react-router-dom"


const Landing=()=>{
    return (
        <>
        <div className="Landing">
           <img className="landing_img" src="https://images.unsplash.com/photo-1499914485622-a88fac536970?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt="" />
            <div className="name_button">
                <h2 className="name">10x Team 04</h2>
                <Link className="button" to='/postview'>Enter</Link>
            </div>
        </div>
        </>
    )
}

export default Landing