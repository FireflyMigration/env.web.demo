import usePromise from 'react-use-promise'

export default function DemoComponent() {
    const [data] = usePromise(async () => 1, [])

    return (
        <div>
            Demo {data}
        </div>
    )
}