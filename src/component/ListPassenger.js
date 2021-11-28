import ListItem from "./ListItem";
import LoadingSvg from "./LoadingSvg";
const ListPassenger = ({
  data: { pengunjung },
  hapusPengunjung,
  editPengunjung,
  loadingById,
}) => {
  return (
    <div>
      {loadingById ? (
        <LoadingSvg />
      ) : (
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
                editPengunjung={editPengunjung}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ListPassenger;
