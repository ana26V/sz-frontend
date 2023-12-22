import React from 'react'
import { Image} from 'react-bootstrap';
function Footer() {
    return (
        <div className='footer'>
           <Image
          src="https://tiermaker.com/images/chart/chart/cosas-random-1168650/amoguspng.png"
          alt="Image"
          className='mx-3'
          width={40}
          height={40}
        />
       
           ©Copyright Ana, Gabi, Ligia
        </div>
    )
}

export default Footer