import React from 'react'
import homeBanner from '../image/home-banner.jpg'
import '../styles/home.css'



function Home(props) {
    return (
        <>
        <section className="home-banner-bg ">
           <div className="container">
           <div className="home-banner">
               <div className="row">
                   <div className="col-md-7 col-lg-7 col-sm-12 col-xs-12 order-2 order-lg-1">
                       <div className="box-1">
                           <h2>online hatha yoga</h2>
                        <h1>your happy place for the body and mind</h1>
                        <button className="button">read more</button>
                       </div>
                   </div>
                   <div className="col-md-5 col-lg-5 col-sm-12 col-xs-12 order-1 order-lg-2">
                        <div className="box-2">
                           <img src={ homeBanner } className="img-fluid infinite" alt="home-banner"/> 
                       </div> 
                   </div>
               </div>
               </div>
           </div>

        </section>

        <div className="container">
            {/* <Category /> */}
        </div>
        </>
    )
}



export default Home
