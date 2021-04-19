import React from 'react'
import {App} from '../../../../components/App'
import {FilingEntityChooser} from "../../../../components/Pages/ControlPanel/StockAnalysisControlFlow/FilingEntityChooser";

export default function Index() {
    return (
        <App>
            <FilingEntityChooser/>
        </App>
    )
}