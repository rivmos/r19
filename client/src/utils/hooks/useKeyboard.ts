import { useEffect } from "react"

const useKeyboard = (element:HTMLElement) => {

    useEffect(() => {
        document.addEventListener('click', (e) => {
            if(e.ctrlKey){
                
            }
        })
    }, [])

}

export default useKeyboard