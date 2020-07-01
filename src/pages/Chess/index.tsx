import React,{ useState } from 'react'
import { observer } from 'mobx-react'
import styles from './index.scss'
import { ChuType, HanType } from './data'

type ChessType = typeof ChuType


function Chess(){

    const [ xichu,setXichu ] = useState(ChuType)
    const [ donghan,setDonghan ] = useState(HanType)

    const getChess = (type: ChessType) => {
        return type.map( chess => {
            return chess.coordinate.map( item => {
                return (
                    <div className={styles.chessman} style={{ left:item[0]*62+32,bottom:item[1]*62+6 }}
                     key={ `${item[0]}-${item[1]}` }  > 
                        { chess.type } 
                    </div>
                )
            })
        })
    }

    return (
        <div className={styles.wrap}>
            <div className={styles.chess}>
                {  getChess( xichu )  }
                {  getChess( donghan )  }
            </div>
        </div>
    )
}

export default observer(Chess)