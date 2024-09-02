import './Button.css'

type ButtonProps = {
    title: string
    onClick: () => void
    disabled?: boolean
}
export const Button = ({title, onClick, disabled}: ButtonProps) => {
    return (
        <button className={`button ${disabled && 'buttonDisabled'}`} onClick={onClick} disabled={disabled}>{title}</button>
    )
}
