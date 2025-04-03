import { useEffect, useState } from "react"

export const Autocomplete =()=>{
    const [input,setInput]=useState(" ")
    const [results, setResults]=useState([])
    const [showResults,setShowResults] =useState(false)
    const [cache,setCache]=useState({})
    const fetchData= async ()=>{
        if(cache[input])
        {
            setResults(cache[input])
            return
        }else{
            const data= await fetch("https://dummyjson.com/recipes/search?q="+input)
            const json=await data.json()
            setResults(json?.recipes)
            setCache(prev=> ({...prev, [input]:json?.recipes}))
        }
        
    }
    useEffect(()=>{
        const timer = setTimeout(fetchData,300);
        return ()=>clearTimeout(timer)
    },[input])
    return(
        <div className="App">
        <div>AutoComplete</div>
        <div>
<input type="text" value={input} onFocus={()=>setShowResults(true)} onBlur={()=>setShowResults(false)} onChange={(e)=>setInput(e.target.value)}  placeholder="Enter Something....." className="search-input"/>
        </div>
        {showResults &&<div className="results-container">
           { (results.map ((r)=><span key={r.id} className="result">{r.name}</span>))}
        </div>}
        
        </div>
    )
}