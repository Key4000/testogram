import React from 'react'
import './Logo.css'
import { Image} from 'react-bootstrap';

const Logo = (props) => {

return(
 <div className = "Logo">
   <Image {...props} className ="Inside" />
  </div>
  )
}

export default Logo