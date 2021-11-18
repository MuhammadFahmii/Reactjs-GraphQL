import "./Home.css";
const ListItem = (props) => {
  const { id, nama, umur, jenis_kelamin } = props.data;
  return (
    <tr>
      <td>{nama}</td>
      <td>{umur}</td>
      <td>{jenis_kelamin}</td>
      <td className="removeBorder" onClick={() => props.hapusPengunjung(id)}>
        <button>Hapus</button>
      </td>
      <td className="removeBorder" onClick={() => props.editPengunjung(id)}>
        <button>Edit</button>
      </td>
    </tr>
  );
};

export default ListItem;
