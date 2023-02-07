import Swal from "sweetalert2";
import api from "../service/api";

export default function RawMaterialItem(props) {
  function handleDelete() {
    Swal.fire({
      title: "Deseja realmente excluir?",
      text: "Você não poderá reverter essa ação!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, excluir!",
    }).then((result) => {
      if (result.isConfirmed) {
        api.delete(`/raw-materials/${props.prop.id}`).then(() => {
          Swal.fire("Excluído!", "A matéria prima foi excluída.", "success");
        });
      }
    });
  }

  function handleEdit() {
    Swal.fire({
      title: "Editar matéria prima",
      html: `<input id="swal-input1" class="swal2-input" placeholder="Nome" value="${props.prop.name}"> <input id="swal-input2" class="swal2-input" placeholder="Quantidade em estoque" value="${props.prop.stocked}">`,
      focusConfirm: false,
      preConfirm: () => {
        return [
          document.getElementById("swal-input1").value,
          document.getElementById("swal-input2").value,
        ];
      },
    }).then((result) => {
      if (result.isConfirmed) {
        api.put(`/raw-materials/${props.prop.id}`, {
          name: result.value[0],
          stocked: result.value[1],
        });
      }
    });
  }
  return (
    <div className="row">
      <div className="col-4">
        <h5> {props.prop.name}</h5>
      </div>
      <div className="col-4">
        <h5>{props.prop.stocked}</h5>
      </div>
      <div className="col-4">
        <button className="btn btn-primary" onClick={handleEdit}>
          Editar
        </button>
        <button className="btn btn-danger" onClick={handleDelete}>
          Deletar
        </button>
      </div>
    </div>
  );
}
