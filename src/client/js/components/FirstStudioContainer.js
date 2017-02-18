import React from 'react';
export default class FirstStudioContainer extends React.Component{
  render(){
    return(
      <div>
        <div style={{width: "100%", minHeight: "40px", height: "5vh", backgroundColor: "#0058a9"}}>

        <img src="/img/logo_filled.svg"
              style={{height:"100%",padding: "1px",paddingLeft: "15px"}} />

        </div>
          {this.props.children}
      </div>
    )
  }
}
