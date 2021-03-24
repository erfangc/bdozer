import { useEffect, useState } from "react";
import { ModelResult } from "../../../client";

interface Props {
    result: ModelResult
}
export function FutureEarningsPerShare(props: Props) {
    const { result: { cells } } = props;
    const [options, setOptions] = useState<Highcharts.Options>()
    useEffect(() => {
        const options: Highcharts.Options = {

        }
        setOptions(options)
    }, [])
    return (
        <>
            <p>Based on the above projections. How much per share earnings is expected going forward?</p>
        </>
    )
}