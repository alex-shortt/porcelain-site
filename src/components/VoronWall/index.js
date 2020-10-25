/* eslint-disable no-param-reassign */
/* eslint-disable no-multi-assign */
/* eslint-disable func-names */
import React, { useEffect } from "react"
import * as THREE from "three"
import { useLoader, useFrame } from "react-three-fiber"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { draco, useFBXLoader } from "drei"

export default function VoronWall(props) {
  const { clicked, setLoading } = props

  const fbx = useFBXLoader("/porcelain.fbx")

  fbx.rotation.x = -Math.PI / 2
  fbx.position.y = -180
  let animationState = false
  let numClicks = 0
  if (fbx) {
    setLoading(false)
  }
  console.log(fbx)

  const onLandingClick = () => {
    if (animationState || fbx === undefined) {
      return
    }
    animationState = true
    numClicks++
    if (numClicks <= 3) {
      setTimeout(function() {
        animationState = false
      }, 50 + 50 * numClicks)
    } else {
      setTimeout(function() {
        animationState = false
      }, 3000)
    }
    clicked()
    if (numClicks > 3) {
      console.log("removed event listener")
      document
        .getElementsByTagName("canvas")[0]
        .removeEventListener("click", onLandingClick)
    }
  }

  document
    .getElementsByTagName("canvas")[0]
    .addEventListener("click", onLandingClick)

  useFrame(({ clock, delta }) => {
    if (animationState && fbx.children[0].scale.x > 0) {
      for (let i = 0; i < fbx.children.length; i++) {
        if (fbx.children[i].geometry) {
          fbx.children[i].scale.x -= 0.01
          fbx.children[i].scale.y -= 0.01
          fbx.children[i].scale.z -= 0.01
          fbx.children[i].rotation.x -= 0.01 * (Math.random() - 0.5)
          fbx.children[i].rotation.y -= 0.01 * (Math.random() - 0.5)
        }
      }
    }
  })

  useEffect(() => {
    // console.log(vid_source)
    if (window.innerWidth < 800 && fbx) {
      // console.log(vid_source.current)
      fbx.scale.x = fbx.scale.y = fbx.scale.z = 0.9
    }
  })

  return <primitive object={fbx} dispose={null} />
}
