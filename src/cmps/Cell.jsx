import { useEffect, useRef, useState } from "react"

export function Cell({ coord, onPlay, symbol }) {

    const [isClicked, setIsClicked] = useState(false)
    const cellBtn = useRef()

    useEffect(() => {
        setIsClicked(!!cellBtn.current.innerText)
    }, [])

    const onCellClick = () => {
        onPlay(coord)
    }

    return (
        <section className="cell">
            <button disabled={isClicked} ref={cellBtn} onClick={() => onCellClick()}>{symbol}</button>

        </section>
    )
}
