interface Props {
    children: React.ReactElement | React.ReactElement[]
}

export default function Container({ children }: Props) {
    return <div className="container">{children}</div>
}
