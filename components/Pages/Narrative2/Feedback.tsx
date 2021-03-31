import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { useMarketing } from "../../../api-hooks";
import { StockAnalysis } from "../../../client";
import { Label, SubTitle } from "../../Title";

interface Props {
    result: StockAnalysis
}

export function Feedback(props: Props) {
    const marketing = useMarketing()
    const [submitted, setSubmitted] = useState(false)

    function submitForm(values: any) {
        marketing.feedback20210329({ body: values })
        setSubmitted(true)
    }

    return (
        <section>
            <SubTitle className="mb-2">Feedback</SubTitle>
            {
                !submitted
                    ?
                    <>
                        <p className="mb-4">Give us some feedback to help us give you better analysis going forward</p>
                        <Formik onSubmit={submitForm} initialValues={{}}>
                            <Form className="space-y-8">
                                <Field
                                    as="textarea"
                                    className="rounded border bg-blueGray-900 border-blueGray-500 px-4 py-4 block w-full"
                                    type="text"
                                    name="freeFromFeedback"
                                    placeholder="Please write any specific feedback that's on your mind"
                                />
                                <div className="space-y-2">
                                    <Label>After reading the above analysis</Label>
                                    <p className="text-xs">(Check all that apply)</p>
                                    <div className="space-x-3">
                                        <Field type="checkbox" name="structuredFeedback" value="My conviction to buy / not buy increased significantly" />
                                        <label htmlFor="q3">My conviction to buy / not buy increased significantly</label>
                                    </div>
                                    <div className="space-x-3">
                                        <Field type="checkbox" name="structuredFeedback" value="I was confused by the analysis" />
                                        <label htmlFor="q3">I was confused by the analysis</label>
                                    </div>
                                    <div className="space-x-3">
                                        <Field type="checkbox" name="structuredFeedback" value="I disagree with the inputs used in the analysis" />
                                        <label htmlFor="q3">I disagree with the inputs used in the analysis</label>
                                    </div>
                                    <div className="space-x-3">
                                        <Field type="checkbox" name="structuredFeedback" value="I disagree with the logic of the analysis" />
                                        <label htmlFor="q3">I disagree with the logic of the analysis</label>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>Investment experience</Label>
                                    <div className="space-x-3">
                                        <Field type="radio" name="investmentExperience" value="Fewer than 1 year" />
                                        <label htmlFor="investmentExperience">Fewer than 1 year</label>
                                    </div>
                                    <div className="space-x-3">
                                        <Field type="radio" name="investmentExperience" value="Between 1 and 5 years" />
                                        <label htmlFor="investmentExperience">Between 1 and 5 years</label>
                                    </div>
                                    <div className="space-x-3">
                                        <Field type="radio" name="investmentExperience" value="Longer than 5 years" />
                                        <label htmlFor="investmentExperience">Longer than 5 years</label>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>Your investment philosophy</Label>
                                    <p className="text-xs">(Check all that apply)</p>
                                    <div className="space-x-3">
                                        <Field type="checkbox" name="investmentPhilosophy" value="Day trading with technical analysis" />
                                        <label htmlFor="investmentPhilosophy">Day trading with technical analysis</label>
                                    </div>
                                    <div className="space-x-3">
                                        <Field type="checkbox" name="investmentPhilosophy" value="Hunting for the next home run" />
                                        <label htmlFor="investmentPhilosophy">Hunting for the next home run</label>
                                    </div>
                                    <div className="space-x-3">
                                        <Field type="checkbox" name="investmentPhilosophy" value="Look for undervalued stocks with stable earnings" />
                                        <label htmlFor="investmentPhilosophy">Look for undervalued stocks with stable earnings</label>
                                    </div>
                                    <div className="space-x-3">
                                        <Field type="checkbox" name="investmentPhilosophy" value="Top down macro economy driven" />
                                        <label htmlFor="investmentPhilosophy">Top down macro economy driven</label>
                                    </div>
                                </div>

                                <button
                                    className="text-sm border w-48 border-blueGray-500 cursor-pointer hover:bg-blueGray-400 hover:text-blueGray-900 rounded transition ease-linear p-2"
                                    type="submit"
                                >
                                    Submit
                            </button>

                            </Form>
                        </Formik>
                    </>
                    :
                    <blockquote className="border-blueGray-500 border-l-4 pl-8 text-blueGray-300 py-2">
                        Your feedback has been submitted, we really appreciate you taking the time! Please check back often
                    </blockquote>
            }
        </section>
    )
}
