import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import PassengerInput from "./PassengerInput";
import ListPassenger from "./ListPassenger";
import Header from "./Header";
import gql from "graphql-tag";
import { useLazyQuery, useQuery } from "@apollo/client";
import LoadingSvg from "./LoadingSvg";
import { useEffect } from "react/cjs/react.development";

const getPengunjung = gql`
  query MyQuery {
    pengunjung {
      id
      nama
      jenis_kelamin
      umur
    }
  }
`;
const queryCariById = gql`
  query MyQuery($id: Int) {
    pengunjung(where: { id: { _eq: $id } }) {
      nama
      umur
      jenis_kelamin
    }
  }
`;
export default function Home() {
  const { data, loading: loadingAllData, error } = useQuery(getPengunjung);
  const [cariById, { data: dataById, loading: loadingById }] =
    useLazyQuery(queryCariById);

  const [pengunjung, setPengunjung] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    if (dataById) setPengunjung(dataById);
  }, [dataById]);

  useEffect(() => {
    if (data) setPengunjung(data);
  }, [data]);
  const hapusPengunjung = (id) => {};

  const tambahPengunjung = (newUser) => {
    const newData = {
      id: uuidv4(),
      ...newUser,
    };
    setPengunjung([...pengunjung, newData]);
  };

  const cariPengunjung = () => {
    cariById({ variables: { id } });
  };

  if (loadingAllData) return <LoadingSvg />;
  if (error) return error;

  return (
    <div>
      <Header />
      <input type="text" onChange={(e) => setId(e.target.value)} />
      <button onClick={cariPengunjung}>Cari</button>
      <br />
      <br />
      <ListPassenger
        data={pengunjung}
        loadingById={loadingById}
        hapusPengunjung={hapusPengunjung}
      />
      <PassengerInput tambahPengunjung={tambahPengunjung} />
    </div>
  );
}
