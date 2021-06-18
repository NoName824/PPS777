import React, { Children } from "react"
import ReactDOM from 'react-dom'
import {useState} from 'react'
import './index-style.scss'
import {render} from "../Hooks/index"
import {useInteractionEvent, useUpdate} from "../Hooks/hooks"
import {useSimVar, useSimVarValue} from "../Hooks/simVars"
import {infoGrid,box2topVar,box2topSLeft,box3topVar,box3topSRigth,box2downVar,box2downSLeft} from "./infoGrid"

export let atActive1 : boolean
export let IAS1 : number
export let AGL1 : number
export let THROTTLEPOS1 : number
export let THROTTLEPOS2 : number
export let HDG1 : boolean
export let lnav1 : number
let speedStripeVal : number
let over30 : boolean
let speedMarkerImg : string
let scaleSpdMarker : number
let startPosSpdMarker : number
let spdMarkerVis : string

import {
    renderTarget,
    getSimVar,
    setSimVar,
} from '../../util.js';

const Electricity = ({ circuitId, children }) => {
    const [circuitOn] = useSimVar(`A:CIRCUIT ON:${circuitId}`,'Bool');
    return (
        <div>
            {circuitOn && children}
        </div>
    )
  }

const PFD = () => {
     const [pitchVar, setPitchVar] = useSimVar('A:PLANE PITCH DEGREES', 'degrees')
     const [rollVar, setRollVar] = useSimVar('A:PLANE BANK DEGREES', 'degrees')
     const [IASVar, setIASVar] = useSimVar('A:AIRSPEED INDICATED', 'knots')

     const [pitch, setPitch] = useState(0)
     const [roll, setRoll] = useState(0)
     const [IAS, setIAS] = useState(0)

     let constructor = () =>
    {
        IAS1 = IAS
    }

     over30 = false
    let airspeedLock = () => 
    {
        if  (IAS < 30)
        {
            over30 = false
        } 
        else if (IAS > 30)
        {
            over30 = true
            IAS1 = speedStripeVal
        }
    }

     useUpdate(dt => {
         setPitch(pitchVar)
         setRoll(rollVar)
         setIAS(IASVar)
     })
    return(
            <div id='body'>
                <div id='horizon'>
                    <img src="/Pages/VCockpit/instruments/B777/SVG/HorizonPFD.svg" width='500'  style={{transform:'translateX('+(pitch*10.4).toString()+ 
                    'px)rotate('+roll.toString()+'deg'}}/>
                </div>
                <div id='border'>
                    <img src="/Pages/VCockpit/instruments/B777/SVG/border.png" width='500'/>
                </div>
                <div id='FD'>
                    <img src="/Pages/VCockpit/instruments/B777/SVG/FlightDirector.svg" width='170' />
                </div>
                <div id="spdStripe">
                    <img src="/Pages/VCockpit/instruments/B777/SVG/SpeedIndicator.svg" width='50' style={{transform:`translateY(${airspeedLock(),over30?(IAS-30)*5.27: 0}px)`}}/>
                </div>
            </div>
    )
}

render(<PFD/>)