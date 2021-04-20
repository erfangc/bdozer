import React, {useEffect, useState} from 'react'
import {useRouter} from "next/router";
import {useIssues} from "../../../api-hooks";
import {Issue} from "../../../client";
import {Title} from "../../Common/Title";
import {PrimaryButton} from "../../Common/PrimaryButton";
import {DeleteButton} from "../../Common/DeleteButton";

export function IssuesSummary() {
    const router = useRouter()
    const {id} = router.query
    const issuesApi = useIssues()
    const [issues, setIssues] = useState<Issue[]>()

    async function init() {
        const {data: issues} = await issuesApi.findIssues(id as any)
        setIssues(issues)
    }

    useEffect(() => {
        init()
    }, [])

    return (
        <main className="px-4 max-w-xl mx-auto container mt-12 text-blueGray-100">
            <Title>Issues</Title>
            <p className="mt-2 mb-8">
                We identified a few issues while attempting to construct a model automatically. These require your
                attention
            </p>
            {issues?.map(issue => {
                return (
                    <div key={issue['_id']}
                         className="bg-blueGray-700 shadow-lg rounded p-6 flex flex-col space-y-6 md:flex-row md:space-y-0 md:justify-between">
                        <div className="flex flex-col space-y-3">
                            <h1 className="text-lg font-bold">{issue.message}</h1>
                            <div>
                                <span className="p-2 text-xs bg-blueGray-900 rounded-l uppercase">Issue Type</span>
                                <span className="p-2 text-xs bg-blueGray-800 rounded-r">{issue.issueType}</span>
                            </div>
                        </div>
                        <div className="flex space-x-2 md:flex-col md:space-x-0 md:space-y-2">
                            <PrimaryButton>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                    />
                                </svg>
                                <span className="ml-1">Fix</span>
                            </PrimaryButton>
                            <DeleteButton>
                                Ignore
                            </DeleteButton>
                        </div>
                    </div>
                )
            })}
        </main>
    )
}
