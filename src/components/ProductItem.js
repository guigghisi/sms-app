import Swal from "sweetalert2";
import api from "../service/api";

export default function ProductItem(props) {
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
        api.delete(`/products/${props.prop.id}`).then(() => {
          Swal.fire("Excluído!", "A matéria prima foi excluída.", "success");
        });
      }
      window.location.reload();
    });
  }

  function handleEdit() {
    Swal.fire({
      title: "Editar matéria prima",
      html: `<input id="swal-input1" class="swal2-input" placeholder="Nome" value="${props.prop.name}"> <input id="swal-input2" class="swal2-input" placeholder="Quantidade em estoque" value="${props.prop.price}">
`,

      focusConfirm: false,
      preConfirm: () => {
        return [
          document.getElementById("swal-input1").value,
          document.getElementById("swal-input2").value,
          props.prop.rawMaterials,
        ];
      },
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(result.value);
        api.put(`/products/${props.prop.id}`, {
          name: result.value[0],
          price: result.value[1],
          rawMaterials: result.value[2],
        });
      }
      window.location.reload();
    });
  }
  return (
    <div className="row">
      <div className="col-4">
        <h5> {props.prop.name}</h5>
      </div>
      <div className="col-4">
        <h5>{props.prop.price}</h5>
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
