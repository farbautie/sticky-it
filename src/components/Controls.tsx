import { colors } from '@/colors'

export default function Controls() {
    return (
        <div className="controls">
            {colors.map((color) => {
                return (
                    <div
                        className="color"
                        key={color.id}
                        id={color.id}
                        style={{
                            backgroundColor: color.header,
                        }}
                    ></div>
                )
            })}
        </div>
    )
}
