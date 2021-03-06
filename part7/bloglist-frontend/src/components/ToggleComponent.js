import React, { useState } from 'react'
import PropTypes from 'prop-types'

function ToggleComponent(props) {
  const [active, setActive] = useState(false)

  const hideWhenActive = { display: active ? 'none' : '' }
  const showWhenActive = { display: active ? '' : 'none' }

  return (
    <div>
      <div style={hideWhenActive}>
        <button type="button" onClick={() => setActive(true)}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenActive}>
        {props.children}
        <button type="button" onClick={() => setActive(false)}>Cancel</button>
      </div>
    </div>
  )
}

ToggleComponent.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

export default ToggleComponent