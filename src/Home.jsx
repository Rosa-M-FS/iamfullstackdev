import {Link} from 'react-router-dom'
const Home = ({data, fetchData}) => {
  return (
    <>
    <h2>Lista de datos</h2>
    <ul className='task-list'>
      {data.map(item => (
        <li key={item._id} className='task-item'>
          <div className='task-content'>
          <Link to={`/${item._id}`}>{item.title}</Link>
          <button className="btn-delete" onClick={async () => {
              const confirmDelete = confirm("¿Estás seguro de borrar esta tarea?");
              if (!confirmDelete) return;
              try {
                const response = await fetch(`http://localhost:3000/id/${item._id}`, {
                  method: 'DELETE',
                });

                if (response.ok) {
                  await fetchData();
                } else {
                  alert("Error al eliminar la tarea ❌");
                }
              } catch (error) {
                console.error("Error al borrar tarea:", error);
              }
            }}
          >❌</button>
          </div>
        </li>
      ))}
    </ul>
    </>
  )
};

export default Home;
