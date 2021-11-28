import { useState, useEffect } from "react";
import PassengerInput from "./PassengerInput";
import ListPassenger from "./ListPassenger";
import Header from "./Header";
import gql from "graphql-tag";
import { useLazyQuery, useMutation, useSubscription } from "@apollo/client";
import LoadingSvg from "./LoadingSvg";

const getPengunjung = gql`
  subscription MySubscription {
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
const queryInsertPengunjung = gql`
  mutation MyMutation($object: pengunjung_insert_input = {}) {
    insert_pengunjung_one(object: $object) {
      nama
      umur
      jenis_kelamin
    }
  }
`;

const queryDeletePengunjung = gql`
  mutation queryDeletePengunjung($id: Int!) {
    delete_pengunjung_by_pk(id: $id) {
      nama
    }
  }
`;

export default function Home() {
  const {
    data,
    loading: loadingAllData,
    error,
  } = useSubscription(getPengunjung);
  const [cariById, { data: dataById, loading: loadingById }] =
    useLazyQuery(queryCariById);
  const [insertPengunjung, { loading: loadingInsert }] = useMutation(
    queryInsertPengunjung,
    { refetchQueries: [getPengunjung] }
  );
  const [deletePengunjung, { loading: loadingDelete }] = useMutation(
    queryDeletePengunjung,
    { refetchQueries: [getPengunjung] }
  );

  const [pengunjung, setPengunjung] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    if (dataById) setPengunjung(dataById);
  }, [dataById]);

  useEffect(() => {
    if (data) setPengunjung(data);
  }, [data]);

  const hapusPengunjung = (id) => {
    deletePengunjung({
      variables: { id },
    });
  };

  const tambahPengunjung = (newUser) => {
    insertPengunjung({
      variables: {
        object: newUser,
      },
    });
  };

  const cariPengunjung = () => {
    cariById({ variables: { id } });
  };

  const editPengunjung = (id) => {
    cariById({ variables: { id } });
  };

  if (loadingAllData || loadingInsert || loadingDelete || loadingById)
    return <LoadingSvg />;
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
        editPengunjung={editPengunjung}
      />
      <PassengerInput
        tambahPengunjung={tambahPengunjung}
        data={pengunjung !== undefined && pengunjung}
        loadingById={loadingById}
      />
    </div>
  );
}
