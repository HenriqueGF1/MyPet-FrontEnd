import { toast } from "react-toastify";

export function previewFiles(idFoto, idFotoMostrar) {
  const fileInput = document.getElementById(idFoto);
  const previewsContainer = document.getElementById(idFotoMostrar);
  previewsContainer.innerHTML = "";
  if (window.FileReader) {
    Array.from(fileInput.files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = function (e) {
        const img = document.createElement("img");
        img.src = e.target.result;
        img.style.width = "300px";
        img.style.maxHeight = "300px";
        img.style.objectFit = "scale-down";
        previewsContainer.appendChild(img);
      };
      reader.readAsDataURL(file);
    });
  } else {
    toast.error("Seu navegador não suporta a visualização de arquivos.");
  }
}
