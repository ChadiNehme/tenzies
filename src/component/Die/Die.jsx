

export default function Die(props) {
  const style = {
    backgroundColor: props.on ? "green" : "white"
  }
  return <button
    style={style}
    onClick={props.toggle}
    aria-pressed={props.on}
    aria-label={`Die with value ${props.value} , ${props.on ? "Held":"Not Held"}`}
  >
    {props.value}

  </button>

}