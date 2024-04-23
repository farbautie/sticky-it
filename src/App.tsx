import Container from '@/components/Container'
import Controls from '@/components/Controls'
import { CardProvider } from '@/context/CardContext'

export default function App() {
    return (
        <CardProvider>
            <Container />
            <Controls />
        </CardProvider>
    )
}
