let usuarios = [];
let editIndex = -1;

// Cargar usuarios desde el archivo JSON al iniciar
fetch('usuarios.json')
    .then(response => response.json())
    .then(data => {
        usuarios = data;
        renderUsers();
    });

// Guardar o actualizar usuario
document.getElementById('user-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const usuario = {
        id: document.getElementById('user-id').value,
        nombre: document.getElementById('user-name').value,
        apellido_paterno: document.getElementById('user-lastname').value,
        apellido_materno: document.getElementById('user-mother-lastname').value,
        telefono: document.getElementById('user-phone').value,
        ciudad: document.getElementById('user-city').value,
        estado: document.getElementById('user-state').value,
        domicilio: document.getElementById('user-address').value
    };

    if (editIndex === -1) {
        usuarios.push(usuario);
    } else {
        usuarios[editIndex] = usuario;
        editIndex = -1;
        document.getElementById('cancel-edit').style.display = 'none';
    }

    renderUsers();
    document.getElementById('user-form').reset();
});

// Renderizar lista de usuarios
function renderUsers() {
    const userList = document.getElementById('user-list');
    userList.innerHTML = '';

    usuarios.forEach((usuario, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${usuario.id}</td>
            <td>${usuario.nombre}</td>
            <td>${usuario.apellido_paterno}</td>
            <td>${usuario.apellido_materno}</td>
            <td>${usuario.telefono}</td>
            <td>${usuario.ciudad}</td>
            <td>${usuario.estado}</td>
            <td>${usuario.domicilio}</td>
            <td>
                <button class="edit" onclick="editUser(${index})">Editar</button>
                <button class="delete" onclick="deleteUser(${index})">Eliminar</button>
            </td>
        `;

        userList.appendChild(row);
    });
}

// Editar usuario
function editUser(index) {
    const usuario = usuarios[index];
    document.getElementById('user-id').value = usuario.id;
    document.getElementById('user-name').value = usuario.nombre;
    document.getElementById('user-lastname').value = usuario.apellido_paterno;
    document.getElementById('user-mother-lastname').value = usuario.apellido_materno;
    document.getElementById('user-phone').value = usuario.telefono;
    document.getElementById('user-city').value = usuario.ciudad;
    document.getElementById('user-state').value = usuario.estado;
    document.getElementById('user-address').value = usuario.domicilio;

    editIndex = index;
    document.getElementById('cancel-edit').style.display = 'block';
}

// Cancelar edición
document.getElementById('cancel-edit').addEventListener('click', function () {
    editIndex = -1;
    document.getElementById('user-form').reset();
    this.style.display = 'none';
});

// Eliminar usuario
function deleteUser(index) {
    usuarios.splice(index, 1);
    renderUsers();
}

// Buscar usuario
document.getElementById('search-input').addEventListener('input', function () {
    const searchTerm = this.value.toLowerCase();

    const filteredUsuarios = usuarios.filter(usuario =>
        usuario.nombre.toLowerCase().includes(searchTerm) ||
        usuario.apellido_paterno.toLowerCase().includes(searchTerm) ||
        usuario.apellido_materno.toLowerCase().includes(searchTerm)
    );

    const userList = document.getElementById('user-list');
    userList.innerHTML = '';

    filteredUsuarios.forEach((usuario, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${usuario.id}</td>
            <td>${usuario.nombre}</td>
            <td>${usuario.apellido_paterno}</td>
            <td>${usuario.apellido_materno}</td>
            <td>${usuario.telefono}</td>
            <td>${usuario.ciudad}</td>
            <td>${usuario.estado}</td>
            <td>${usuario.domicilio}</td>
            <td>
                <button class="btn btn-info" onclick="editUser(${index})">Editar</button>
                <button class="btn btn-danger" onclick="deleteUser(${index})">Eliminar</button>
            </td>
        `;

        userList.appendChild(row);
    });
});
