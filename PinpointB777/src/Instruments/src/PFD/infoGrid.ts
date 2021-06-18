import {IAS1, AGL1, THROTTLEPOS1, THROTTLEPOS2, HDG1,atActive1} from "./index"
import {useSimVar, useSimVarValue} from "../Hooks/simVars"

export let box2topVar : string
export let box3topVar : string
export let box2downVar : string
export let box2topSLeft : number
export let box3topSRigth : number
export let box2downSLeft : number

export const infoGrid = () =>
{
    box3topVar = "ROLL"
    box3topSRigth = 442

    if (atActive1 == false)
    {
        box2downVar = ""
        box2downSLeft = 369
    }
    else if (atActive1 == true)
    {
        box2downVar = "AT"
        box2downSLeft = 369
    }

    if (IAS1 > 60 && box3topVar == "ROLL" && AGL1 < 200)
    {
        box3topVar = "TRACK"
        box3topSRigth = 427
    }
    else if (AGL1 > 200)
    {
        box3topVar = "LNAV"
        box3topSRigth = 440   
    }
    
    if (box3topVar == "LNAV" && HDG1 == true)
    {
        box3topVar = "HDG"
        box3topSRigth = 450
    }
}