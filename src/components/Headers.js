import PropTypes from 'prop-types'
import Button from './Button'
import { useLocation } from 'react-router-dom'

const Headers = (props) => {
    
    const location = useLocation()

  return (
    <header className='header'>
        <h1>{props.title}</h1>
        {location.pathname === '/' && (
            <Button color={props.showAdd ?'red' : 'green'} text={props.showAdd ?'CLose' : 'Add'} onClick={props.onAdd}/>
        )}
    </header>
  )
}

Headers.defaultProps = {
    title: 'Tast Tracker'
}

Headers.propTypes = {
    title : PropTypes.string.isRequired,
}

// CSS in js
// const headingStyle = {
//     color:'red', backgroundColor:'teal'
// }

export default Headers