import React, { ReactNode, useState } from "react"
import NumberFormat from "react-number-format"
import { Narrative, Projection } from "../../../client"

function Title(props) {
    return <h1 className="font-bold text-lg mb-4">{props.children}</h1>
}

function Million({ value }: { value?: number }) {
    return <><NumberFormat value={value} thousandSeparator displayType="text" prefix="$" decimalScale={0} /> million</>
}

function Percent({ value }: { value?: number }) {
    return <NumberFormat value={value * 100} thousandSeparator displayType="text" suffix="%" decimalScale={1} />
}

function DollarPerShare({ value }: { value?: number }) {
    return <><NumberFormat value={value} thousandSeparator displayType="text" prefix="$" decimalScale={2} /><span className="text-sm font-light"> / share</span></>
}

function Section(props) {
    return <section className="p-4 w-96 lg:w-full shadow-2xl border rounded-xl border-blueGray-700">{props.children}</section>
}

interface Props {
    narrative: Narrative,
}

function ProjectionTable({ projections }: { projections: Projection[] }) {
    return (
        <table className="table-auto border-collapse">
            <thead>
                <tr>{projections.map(projection => <th className="p-2 text-right text-blueGray-300 font-normal">{projection.year}</th>)}</tr>
            </thead>
            <tbody>
                <tr>
                    {
                        projections.map(rp =>
                            <td className="p-2 text-right border-t border-blueGray-700 font-bold">
                                <NumberFormat
                                    value={rp.value}
                                    prefix="$"
                                    displayType="text"
                                    thousandSeparator
                                    decimalScale={0}
                                />
                            </td>
                        )
                    }
                </tr>
            </tbody>
        </table>
    )
}

interface PopoverProps {
    trigger: ReactNode
    children: ReactNode
}

export function Popover(props: PopoverProps) {
    const [visible, setVisible] = useState(false)
    function show() {
        setVisible(true)
    }
    function hide() {
        setVisible(false)
    }
    return (
        <a className="relative text-blue-300 mt-4 cursor-pointer pb-1 border-b border-blue-300" onMouseEnter={show} onMouseLeave={hide}>
            {props.trigger}
            {
                visible
                    ?
                    <div className="absolute top-full text-blueGray-50 p-4 border bg-blueGray-900 border-blueGray-500 rounded-md z-10 w-96">
                        {props.children}
                    </div>
                    : null
            }
        </a>
    )
}

export function NarrativeComponent({ narrative }: Props) {

    return (
        <div className="space-y-4">
            <Section>
                <Title>How much they made?</Title>
                <p>
                    The company made <Million value={narrative?.revenueTalkingPoint?.data} /> in the most recent year
                    <br />
                    {narrative?.revenueTalkingPoint?.forwardCommentary}
                    <Popover trigger="See projections">
                        <h4 className="my-2 text-base font-semibold">Net Income Projection:</h4>
                        <ProjectionTable projections={narrative?.revenueTalkingPoint.projections} />
                    </Popover>
                </p>
            </Section>

            <Section>
                <Title>They spent <Million value={narrative?.variableCostTalkingPoint?.data} /> in Cost of Goods</Title>
                <p>{narrative?.variableCostTalkingPoint?.forwardCommentary}</p>
            </Section>

            <Section>
                <Title>Research development, administrative cost totaled <Million value={narrative?.fixedCostTalkingPoint?.data} /></Title>
                <p>{narrative?.fixedCostTalkingPoint?.forwardCommentary}</p>
            </Section>

            <Section>
                <Title>What else did they have to pay for?</Title>
                <p>
                    Interest Paid, Taxes totalling <Million value={narrative?.otherExpensesTalkingPoint?.data} />
                </p>
            </Section>

            <Section>
                <Title>What's Left for you the shareholder?</Title>
                <p>Net income <Million value={narrative?.netIncomeTalkingPoint?.data} /></p>
                {
                    narrative?.netIncomeTalkingPoint?.data < 0
                        ?
                        <Popover trigger="When are they expected to turn a profit?">
                            <p className="mb-4 text-lg">Earnings are expected to turn <span className="font-bold">positive in 2022</span></p>
                            <h4 className="my-2 text-base font-semibold">Net Income Projection:</h4>
                            <ProjectionTable projections={narrative.netIncomeTalkingPoint.projections} />
                        </Popover>
                        : null
                }
            </Section>

            <Section>
                <Title>How much per share?</Title>
                <p><DollarPerShare value={narrative?.epsTalkingPoint?.data} /></p>
            </Section>

            <Section>
                <Title>If sales remains the same, how much is the stock worth?</Title>
                <p><DollarPerShare value={narrative?.noGrowthValueTalkingPoint?.data} /></p>
            </Section>

            <Section>
                <Title>How much is sales expected to grow?</Title>
                <p><Percent value={narrative?.growthTalkingPoint?.data} /> on average, for {narrative?.model?.periods} years</p>
            </Section>

            <Section>
                <Title>At this growth rate, what is the stock worth?</Title>
                <p><DollarPerShare value={narrative?.targetPriceTalkingPoint?.data} /></p>
            </Section>
        </div>
    )
}