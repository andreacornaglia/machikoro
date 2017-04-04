import React from 'react'

export default function(props) {
    return (
      <div id="body">
        { props.children && React.cloneElement(props.children, props) }
      </div>
    )
}
