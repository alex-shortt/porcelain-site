import React from "react"

import "./styles.scss"

import PorcelainLogo from "../Images/porcelain.png"

export default function Logo() {
  return (
    <div className="logo-container-static">
      <a href="/" style={{ width: "fit-content" }}>
        <img className="logo" src={PorcelainLogo} alt="Porcelain" />
      </a>
    </div>
  )
}
