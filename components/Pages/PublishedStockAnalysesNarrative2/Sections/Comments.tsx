import {useAuth0} from '@auth0/auth0-react'
import React, {useEffect, useState} from 'react'
import {useComments} from '../../../../api-hooks'
import {Comment, StockAnalysis2} from '../../../../client'
import {TextInput} from '../../../Common/TextInput'

interface Props {
    stockAnalysis: StockAnalysis2
}

export function Comments({ stockAnalysis }: Props) {

    const commentsApi = useComments()
    const { user } = useAuth0()
    const [comments, setComments] = useState<Comment[]>([])
    const [text, setText] = useState<string>()

    const stockAnalysisId = stockAnalysis['_id']

    async function fetchComments() {
        const { data } = await commentsApi.getComments(stockAnalysisId)
        setComments(data)
    }

    async function postComment() {
        const comment = {
            stockAnalysisId,
            text,
            userId: user?.sub,
            name: user?.name,
        }
        await commentsApi.postComment(comment as any)
        setText('')
        fetchComments()
    }

    useEffect(() => {
        fetchComments()
    }, [])

    return (
        <div id="comments">
            <TextInput
                placeholder="Enter comment"
                value={text}
                onChange={({ currentTarget: { value } }) => setText(value)}
                onKeyDown={({ key }) => { if (key === 'Enter') postComment() }}
            />
            {comments.map(comment => <CommentComponent key={comment['_id']} comment={comment} />)}
        </div>
    )
}

function CommentComponent(props: { comment: Comment }) {
    const { comment: { lastUpdated, name, text } } = props
    return (
        <div className="flex-col flex space-y-4 pt-4 mt-4 border-t border-blueGray-700">
            <div className="flex space-x-4">
                <div className="w-12 h-12 rounded-full bg-indigo-500"/>
                <div>
                    <div className="font-bold">{name ?? 'Anonymous'}</div>
                    <div className="text-sm text-coolGray-400">{new Date(lastUpdated).toLocaleString()}</div>
                </div>
            </div>
            <p>{text}</p>
        </div>
    )
}