import React from "react";
import { PrimaryButton } from "../../PrimaryButton";
import { Play } from "../../ButtonSvgs/Play";
import { Spinner } from "../../ButtonSvgs/Spinner";
import { Rocket } from "./Rocket";
interface BillboardProps {
    runModel: () => void
    running?: boolean
}
export function Billboard({ runModel, running }: BillboardProps) {
    return (
        <section className="flex-grow flex self-start justify-center h-screen">
            <div className="hidden lg:flex-col lg:flex items-center justify-center space-y-8">
                <Rocket />
                <p className="text-2xl">
                    Click on line items to edit them
                </p>
                <p><Code>Ctrl</Code> + <Code>A</Code>&nbsp;&nbsp;to add an item (doesn't work yet)</p>
                <p><Code>Ctrl</Code> + <Code>Z</Code>&nbsp;&nbsp;to undo item (doesn't work yet)</p>
                <PrimaryButton onClick={runModel}>
                    {running ? <Spinner /> : <Play />}
                    Run Model
                </PrimaryButton>
            </div>
        </section>
    )
}

function Code(props) {
    return (
        <code><span className="border border-blueGray-300 rounded-md p-2">{props.children}</span></code>
    )
}