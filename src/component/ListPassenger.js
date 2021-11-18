import ListItem from "./ListItem";
import LoadingSvg from "./LoadingSvg";
const ListPassenger = ({
  data: { pengunjung },
  hapusPengunjung,
  loadingById,
}) => {
  return (
    <div>
      <table cellPadding="5px" cellSpacing="0" style={{ margin: "auto" }}>
        {loadingById ? (
          <LoadingSvg />
        ) : (
          <>
            {" "}
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
          </>
        )}
      </table>
    </div>
  );
};

export default ListPassenger;
