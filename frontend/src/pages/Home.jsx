import React from 'react'
import Analytics from '../components/Analytics'


export default function Home() {
  return(
    <>
      <main>
        <section className='section-hero'>
          <div className='container grid grid-two-cols'>
            <div className='hero-content'>
              <p>We are world best IT company</p>
              <h1> Welcome to Demo Technical</h1>
              <p>We are a dynamic IT solutions provider dedicated to transforming businesses through cutting-edge software development, cloud solutions, cybersecurity services, and digital transformations. Our team of experts combines creativity with technical expertise to deliver customized solutions that drive growth, efficiency, and success for our clients. Explore our services, discover our success stories, and let's embark on a journey to redefine possibilities in the digital world together."
              </p>
              <div className='btn btn-group'>
                <a href='/contact'>
                  <button className='btn'>connect now</button>
                </a>
                <a href='/service'>
                  <button className='btn secondary-btn'>Learn more</button>
                </a>
              </div>
            </div>
            <div className='hero-image'>
              <img src="/images/home.png" alt='coding together' width="400" height="500"/>
            </div>
          </div>
        </section>
      </main> 
      <Analytics/>
      <section className='section-hero'>
          
          <div className='container grid grid-two-cols'>
          <div className='hero-image'>
              <img src="/images/design.png" alt='coding together' width="400" height="500"/>
            </div>
            <div className='hero-content'>
              <p>We are here to help you</p>
              <h1> Get Started Today</h1>
              <p>Ready to take the first step towards a more efficient and secure IT infrastructure? Contact us today for a free consultation and let's discuss how Demo Technical can help your business trive in the digital age.
              </p>
              <div className='btn btn-group'>
                <a href='/contact'>
                  <button className='btn'>connect now</button>
                </a>
                <a href='/services'>
                  <button className='btn secondary-btn'>Learn more</button>
                </a>
              </div>
            </div>
           
          </div>
        </section>
    </>
  )
}
