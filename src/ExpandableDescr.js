import React, {useState} from "react"


const MAX_DESC_LEN = 150;

export default function ExpandableDescr({overview}) {
    const [ isExpanded, setExpanded ] = useState(false)
    const desc = overview
    let desc_short = overview.slice(0, MAX_DESC_LEN)
    desc_short += desc_short.length === MAX_DESC_LEN ? "..." : ""
    
    return (
        <div onClick={() => setExpanded(prevExpanded => !prevExpanded)}>
            <p className="card--desc">{isExpanded ? desc : desc_short}</p>
        </div>
    )

}