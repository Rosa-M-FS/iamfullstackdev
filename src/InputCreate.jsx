import { useState } from "react";
import { useNavigate } from "react-router-dom";

const InputCreate = ({fetchData}) => {
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const urlApi = "http://localhost:3000/create"; 

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const response = await fetch(urlApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      });

      if (response.ok) {
        alert("Tarea creada correctamente ✅");
        setTitle(""); 

        await fetchData();
        navigate("/")
      } else {
        alert("Error al crear la tarea ❌");
      }
    } catch (error) {
      console.error("Error creando tarea:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-create">
      <input
        type="text"
        placeholder="Escribe una nueva tarea"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit" className="btn-crear">Crear tarea</button>
    </form>
  );
};

export default InputCreate;
