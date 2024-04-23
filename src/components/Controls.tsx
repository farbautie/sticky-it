import { useContext } from 'react'

import CardContext from '@/context/CardContext'
import { colors } from '@/colors'

export default function Controls() {
    const { addCard } = useContext(CardContext)

    return (
        <div className="controls">
            {colors.map((color) => {
                return (
                    <button
                        type="button"
                        className="color"
                        key={color.id}
                        id={color.id}
                        style={{
                            backgroundColor: color.header,
                        }}
                        onClick={() =>
                            addCard({
                                id: Math.round(Math.random() * 1000).toString(),
                                body: '',
                                position: {
                                    x: 10,
                                    y: 50,
                                },
                                colors: {
                                    header: color.header,
                                    body: color.body,
                                    text: color.text,
                                },
                            })
                        }
                    ></button>
                )
            })}
        </div>
    )
}
