import { Link } from "react-router-dom";
import { useVerifyPenjahit } from "../../queries/admin/adminMutation";
import { usePenjahitByAdmin } from "../../queries/admin/adminQuery";
import { useCategories } from "../../queries/penjahit/penjahitQuery";

const ListVerifyPenjahit = () => {
  const { data: penjahit } = usePenjahitByAdmin();
  const { data: category } = useCategories();
  const { mutate: verifyPenjahit } = useVerifyPenjahit();

  const handleVerify = (penjahitId) => {
    verifyPenjahit(penjahitId);
  };

  return (
    <div className="overflow-x-auto">
      <table className="table table-xs min-w-max w-full">
        <thead>
          <tr className="text-center">
            <th>No</th>
            <th>Picture</th>
            <th>Nama</th>
            <th>Email</th>
            <th>No Telp</th>
            <th>Lokasi</th>
            <th>Deskripsi</th>
            <th>Rentang Harga</th>
            <th>Dok. KTP</th>
            <th>Dok. Portofolio</th>
            <th>Kategori</th>
            <th>Status Verifikasi</th>
            <th>Verifikasi</th>
          </tr>
        </thead>
        <tbody>
          {penjahit?.length > 0 ? (
            penjahit
              .filter((p) => !p.isVerified)
              .map((p, index) => (
                <tr key={p._id} className="text-center">
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={p.user?.profileImg || "/avatar.png"}
                      alt={p.user?.name}
                      className="rounded-full w-8 h-8"
                    />
                  </td>
                  <td>{p.user?.name || "Tidak tersedia"}</td>
                  <td>{p.user?.email || "Tidak tersedia"}</td>
                  <td>{p.user?.noTelp || "Tidak tersedia"}</td>
                  <td>{p.user?.address || "Tidak tersedia"}</td>
                  <td className="max-w-xs break-words whitespace-normal text-justify">
                    {p.description || "Tidak tersedia"}
                  </td>

                  <td>{p.rentangHarga || "Tidak tersedia"}</td>
                  <td>
                    {p.dokKTP ? (
                      <Link
                        to={"/admin/penjahit/verify/dok/" + p.dokKTP}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                      >
                        Lihat KTP
                      </Link>
                    ) : (
                      "Tidak tersedia"
                    )}
                  </td>
                  <td>
                    {p.dokPortofolio?.length > 0
                      ? p.dokPortofolio.map((portofolio, i) => (
                          <div key={i}>
                            <Link
                              to={"/admin/penjahit/verify/dok/" + portofolio}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 underline"
                            >
                              Lihat Portofolio {i + 1}
                            </Link>
                          </div>
                        ))
                      : "Tidak tersedia"}
                  </td>
                  <td>
                    {p.kategori?.length > 0
                      ? p.kategori
                          .map(
                            (id) =>
                              category?.find((cat) => cat._id === id)?.name ||
                              "Tidak ditemukan"
                          )
                          .join(", ")
                      : "Tidak tersedia"}
                  </td>
                  <td>
                    <span className="text-red-500">Belum Terverifikasi</span>
                  </td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleVerify(p._id)}
                    >
                      Verifikasi
                    </button>
                  </td>
                </tr>
              ))
          ) : (
            <tr>
              <td colSpan="10" className="text-center py-4 border">
                Tidak ada penjahit untuk diverifikasi.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListVerifyPenjahit;
