import { useRouter } from "next/router";
import { App } from "../../components/App";
import { ModelEditor } from "../../components/ModelEditor/ModelEditor";

export default function () {
    const router = useRouter()
    const { _id } = router.query
    return (
        <App>
            <ModelEditor _id={_id as any} />
        </App>
    )
}