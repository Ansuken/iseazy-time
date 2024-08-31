import './Button.css'

export const Button = ({title, onClick}: {title: string, onClick: () => void}) => {
    return (
        <button className="button" onClick={onClick}>{title}</button>
    )
}
