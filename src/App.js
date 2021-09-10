import React, { useState, useEffect } from 'react';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { FaQuoteRight } from 'react-icons/fa';
import data from './data';
import Title from "./Title"
import Buttons from './Buttons';


function App() {
  const [people, setPeople] = useState(data)
  const [index, setIndex] = useState(0)

  // slide logic
  useEffect(() => {
    // prev slide(if goes under zero index set to last slide)
    const lastIndex = people.length - 1;
    if(index < 0) {
      setIndex(lastIndex)
    }
    // next slide(reverse of prev slide logic above)
    if(index > lastIndex) {
      setIndex(0)
    }
  }, [index, people])

  // autoslide / auto play slides
  useEffect(() => {
     let slider = setInterval(() => {
        setIndex(index+1)
      }, 3000)
      // cleanup function
      return () => clearInterval(slider)
  }, [index])

  return (
    <section className="section">
      <Title/>
      <div className="section-center">
        {people.map((person, personIndex) => {
          const {id, image,name,title,quote} = person;
          let position = "nextSlide";

          if(personIndex === index) {
            position = "activeSlide"
          }

          if(personIndex === index - 1 || (index === 0 && personIndex === people.length - 1)) {
            position = "lastSlide"
          }

          return (
            <article className={position} key={id}>
              <img src={image} alt={name} className="person-img"/>
              <h4>{name}</h4>
              <p className="title">{title}</p>
              <p className="text">{quote}</p>
              <FaQuoteRight className="icon"/>
            </article>
          )
        })}
        <Buttons index={index} setIndex={setIndex}/>
      </div>
    </section>
  )
}

export default App;
