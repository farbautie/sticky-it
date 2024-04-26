import { Board } from '@/components/Board'
import { Controls } from '@/components/Controls'
import { CardProvider } from '@/context/CardContext'

export default function App() {
    return (
        <CardProvider>
            <Board />
            <Controls />
        </CardProvider>
    )
}
