import React from 'react';
import { StockAnalysis } from '../../../client';
import { Page1 } from './Slides/Page1';
import { Page2 } from './Slides/Page2';
import { Page3 } from './Slides/Page3';
import { Page4 } from './Slides/Page4';

interface Props {
    result: StockAnalysis
}

export function Narrative(props: Props) {
    return (
        <main className="slides text-blueGray-100 relative md:container md:mx-auto md:max-w-2xl">
            <Page1 {...props} />
            <Page2 {...props} />
            <Page3 {...props} />
            <Page4 {...props} />
        </main>
    )
}


