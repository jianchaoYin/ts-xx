import { useContext } from 'react'
import { RootContext } from '@/components/container/shared/App/Provider'

export default function useRootStore(){
    return useContext(RootContext)
}