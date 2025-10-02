import React from 'react'
import './Button.css'

const Button = (props) => 
    props.href? (
       <a {...props} className = {classNames('Button', props.className)} >
        {props.children}
      </a>
      ) : (
         <button {...props} className={classNames('Button', props.className)}>
           
         </button>
        )

export default Button