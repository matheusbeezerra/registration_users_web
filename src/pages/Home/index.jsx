import { useEffect, useState, useRef } from 'react';
import './style.css';
import Clear from '../../assets/clear.svg';
import api from '../../services/api'

function Home() {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const inputName = useRef();
  const inputAge = useRef();
  const inputEmail = useRef();
  const inputCPF = useRef();

  async function getUsers() {
    const usersFromApi = await api.get('/user');
    setUsers(usersFromApi.data);
  }

  async function createUsers() {
    await api.post('/user', {
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value,
      cpf: inputCPF.current.value
    });
    getUsers();
  }

  async function deleteUsers(id) {
    await api.delete(`/user/${id}`);
    getUsers();
  }

  useEffect(() => {
    getUsers();
  }, []);

  function toggleModal() {
    setIsModalOpen(!isModalOpen);
  }

  return (
    <div className='container'>
      <form>
        <h1>Venha fazer parte desse time! Cadastre-se!</h1>
        <input name='name' type='text' placeholder='Nome' ref={inputName} />
        <input name='age' type='number' placeholder='Idade' ref={inputAge} />
        <input name='email' type='email' placeholder='Email' ref={inputEmail} />
        <input name='cpf' type='text' placeholder='CPF' ref={inputCPF} />
        <button type='button' onClick={createUsers}>Cadastrar</button>
        <button type='button' className='view-users-btn' onClick={toggleModal}>Acesse seu Cadastro</button>
      </form>
      {isModalOpen && (
        <div className='modal'>
          <div className='modal-content'>
            <span className='close' onClick={toggleModal}>&times;</span>
            <h1>Usuários Cadastrados</h1>
            {users.map((user) => (
              <div key={user.id} className='user-card'>
                <div>
                  <p>Nome: <span>{user.name}</span></p>
                  <p>Idade: <span>{user.age}</span></p>
                  <p>Email: <span>{user.email}</span></p>
                  <p>CPF: <span>{user.cpf}</span></p>
                </div>
                <button onClick={() => deleteUsers(user.id)}>
                  <img src={Clear} alt='Clear' />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
