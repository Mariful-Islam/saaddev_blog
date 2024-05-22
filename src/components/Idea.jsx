import React from 'react'
import code from '../assets/images/code.png'
import problem_solving from '../assets/images/problem-solving.png'
import thiker from '../assets/images/thinker.png'


const Idea = () => {
  return (
    <div className='idea'>
        <div className='card'>
            <img src={thiker} alt=''/> <br/> <br/>
            <strong>Think</strong>
            <p>Think like an expert to identify a problem that resolves a practical issue or streamlines a time-consuming procedure</p>
        </div>
        <div className='card'>
            <img src={problem_solving} alt=''/> <br/><br/>
            <strong>Problem Solving</strong>
            <p>In order to address the issue, look for several approaches and implement the most effective one</p>
        
        </div>
        <div className='card'>
            <img src={code} alt=''/> <br/><br/>
            <strong>Programming</strong>
            <p>First of all, clarify programming concepts, then implement effective code to solve the problem.</p>
        </div>
    </div>
  )
}

export default Idea