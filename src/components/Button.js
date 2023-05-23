import PropTypes from 'prop-types'

const Button =({color, text, onClick}) =>{
    
    return (
    <button onClick={onClick} className='btn' style={{backgroundColor:color}}>
        {text}
    </button>)
}

Button.defaultProps = {
    text: 'Button',
    color:'steelblue',
}

Button.protoTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func,
}

export default Button