// components
import ColorPicker from "../../../../components/colorPicker/ColorPicker";

function Color(props) {
  return (
    <span className={props.styles.color}>
        {props.variants.length > 0 &&
            props.variants[0].color.toLowerCase() !== "default" && (
              <ColorPicker
                Changer={props.setColor}
                color={props.color}
                variants={props.variants}
              />
            )}
    </span>
  )
}

export default Color
