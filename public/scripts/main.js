function openUpdateModal(title, content, image) {
  fetch(`/openUpdateModal?title=${title}`)
    .then((response) => response.text())
    .then((html) => {
      var modalContainer = document.createElement("div");
      modalContainer.innerHTML = html;
      document.body.appendChild(modalContainer);
      var updateModal = new bootstrap.Modal(
        document.getElementById("updateModal"),
      );
      updateModal.show();
    })
    .catch((error) => {
      console.error("Error fetching updateModal.ejs:", error);
    });
}
