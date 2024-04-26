import { useContext } from 'react'
import { nanoid } from 'nanoid'

import { CardContext } from '@/context/CardContext'
import { colors } from '@/colors'
import { cn } from '@/utils/cn'

export const Controls = () => {
    const { createNewCard } = useContext(CardContext)

    return (
        <>
            <div className="bottom-4 left-1/2 z-10 absolute flex justify-center items-center gap-4 bg-[#21212b] p-4 rounded-xl -translate-x-1/2">
                {colors.map((color) => (
                    <button
                        key={color.id}
                        className={`${cn(
                            color.button
                        )} border-none rounded-md w-8 hover:w-9 h-8 hover:h-9 transition-all cursor-pointer`}
                        onClick={() => {
                            createNewCard({
                                id: nanoid(),
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
                        }}
                    ></button>
                ))}
            </div>
        </>
    )
}
