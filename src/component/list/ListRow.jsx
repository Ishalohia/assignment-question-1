import styles from "./ListRow.module.css";

const ListRow = ({ onClick, children }) => {
  return <tr className={styles.cell} onClick={onClick}>{children}</tr>;
};

export default ListRow;
