import styles from "./CoreValuesSection.module.css";

import coreS from "../../../assets/images/first.png";
import coreW from "../../../assets/images/second.png";
import coreU from "../../../assets/images/third.png";

type Props = {
  label: string;
  variant: "s" | "w" | "u";
};

const imageMap = {
  s: coreS,
  w: coreW,
  u: coreU,
} as const;

const ValueCard = ({ label, variant }: Props) => {
  return (
    <div className={styles.card}>
      <img
        src={imageMap[variant]}
        alt={label}
        className={styles.shape}
        draggable={false}
      />
      <div className={styles.label}>{label}</div>
    </div>
  );
};

export default ValueCard;