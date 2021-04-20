import React, {ReactNode, useEffect, useState} from 'react'
import {Issue, IssueIssueTypeEnum} from "../../../client";
import {useIssues} from "../../../api-hooks";
import {useRouter} from "next/router";
import {Message} from "../ControlPanel/Message";
import {Title} from "../../Common/Title";
import {ItemNameNotFoundResolutionUI} from "./ItemNameNotFoundResolutionUI";

const itemNamesNotFoundIssueTypes = [
    IssueIssueTypeEnum.RevenueItemNotFound,
    IssueIssueTypeEnum.NetIncomeItemNotFound,
    IssueIssueTypeEnum.SharesOutstandingItemNotFound,
    IssueIssueTypeEnum.EpsItemNotFound,
]

export function IssueDetail() {
    const [issue, setIssue] = useState<Issue>()
    const [error, setError] = useState<string>()
    const issuesApi = useIssues()
    const router = useRouter()
    const {id, issueId} = router.query

    async function init() {
        const {data: issues} = await issuesApi.findIssues(id as string)
        const issue = issues.find(it => it['_id'] === issueId)
        if (!issue) {
            setError('Cannot find issue')
        } else {
            setIssue(issue);
        }
    }

    useEffect(() => {
        init()
    }, [])

    function goBack() {
        router.back()
    }

    const issueType = issue?.issueType
    let resolutionComponent: ReactNode = null
    if (itemNamesNotFoundIssueTypes.includes(issueType)) {
        resolutionComponent = <ItemNameNotFoundResolutionUI issue={issue} onResolved={console.log} onDismiss={goBack}/>
    }
    return (
        <main className="px-4 mt-12 mx-auto container text-blueGray-100 max-w-prose bg-blueGray-900">
            <Title className="mb-6">Issue Detail</Title>
            {
                error
                    ? <Message>{error}</Message>
                    : resolutionComponent
            }

        </main>
    )
}
