import Image from "next/image";
import classes from "src/components/Modal/Modal.module.css";

export function Modal(props) {
  const closeModal = () => props.setIsShow(false);

  if (props.isShow) {
    return (
      <div className={classes.overlay} onClick={(e) => e.stopPropagation()}>
        <div className={classes.content} onClick={closeModal}>
          <Image
            className={classes.img}
            src={props.src}
            alt={props.title}
            width={2000}
            height={1600}
          />
        </div>
      </div>
    );
  } else {
    return null;
  }
}
