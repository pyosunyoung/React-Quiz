import React from 'react';
import './main.css'
function StudentBox({img, name, id, department}) {
  return (
    <div>
      <div className='student-box'>
            <div className='left-box'>
              <img src={img} alt='Student' />
            </div>
            <div className='right-box'>
              <p>Name: {name}</p>
              <p>ID: {id}</p>
              <p>Department: {department}</p>
            </div>
          </div>
    </div>
  )
}

export default StudentBox;