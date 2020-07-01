import React, { useEffect } from 'react'


export function useOnMount( onMount: () => any ){
    return useEffect( ()=>{
        if(onMount){
            onMount()
        }
    }, [] )
}