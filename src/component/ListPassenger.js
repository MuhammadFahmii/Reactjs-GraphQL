import ListItem from "./ListItem";
const ListPassenger = ({ data: { pengunjung }, hapusPengunjung }) => {
  return (
    <div>
      <table cellPadding="5px" cellSpacing="0" style={{ margin: "auto" }}>
        <thead bgcolor="red">
          <tr>
            <td>Nama</td>
            <td>Umur</td>
            <td>Jenis Kelamin</td>
            <td bgcolor="white" className="removeBorder"></td>
          </tr>
        </thead>
        <tbody>
          {pengunjung?.map((item) => (
            <ListItem
              key={item.id ? item.id : 1}
              data={item}
              hapusPengunjung={hapusPengunjung}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListPassenger;
