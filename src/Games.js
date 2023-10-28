import { useEffect, useState } from "react"
import { getGameID } from "./api/api"
import { useParams } from "react-router-dom"

export default function Games(){
    const {id} = useParams();
    const [gameInfo, setGameInfo] = useState(null)
    useEffect(()=>{
        getGameID(id).then((result)=>{
            console.log(result.data)
            setGameInfo(result.data)
          })
    },[])
    return(<div>{gameInfo?.name}</div>)
}