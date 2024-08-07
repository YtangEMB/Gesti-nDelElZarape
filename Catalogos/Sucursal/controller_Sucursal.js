let sucursales = [];
let editIndex = -1;

// Cargar sucursales desde el archivo JSON al iniciar
fetch('sucursales.json')
    .then(response => response.json())
    .then(data => {
        sucursales = data;
        renderBranches();
    });

// Guardar o actualizar sucursal
document.getElementById('branch-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const sucursal = {
        nombre: document.getElementById('branch-name').value,
        direccion: document.getElementById('branch-address').value,
        foto: document.getElementById('branch-photo').files[0] ? URL.createObjectURL(document.getElementById('branch-photo').files[0]) : "",
        url: document.getElementById('branch-url').value,
        gps_latitud: document.getElementById('branch-lat').value,
        gps_longitud: document.getElementById('branch-lon').value,
        horario_apertura: document.getElementById('opening-time').value,
        horario_cierre: document.getElementById('closing-time').value
    };

    if (editIndex === -1) {
        sucursales.push(sucursal);
    } else {
        sucursales[editIndex] = sucursal;
        editIndex = -1;
        document.getElementById('cancel-edit').style.display = 'none';
    }

    renderBranches();
    document.getElementById('branch-form').reset();
});

// Renderizar lista de sucursales
function renderBranches() {
    const branchList = document.getElementById('branch-list');
    branchList.innerHTML = '';

    sucursales.forEach((sucursal, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${sucursal.nombre}</td>
            <td>${sucursal.direccion}</td>
            <td><img src="${sucursal.foto}" alt="Foto" width="50" height="50"></td>
            <td><a href="${sucursal.url}" target="_blank">${sucursal.url}</a></td>
            <td>${sucursal.gps_latitud}</td>
            <td>${sucursal.gps_longitud}</td>
            <td>${sucursal.horario_apertura}</td>
            <td>${sucursal.horario_cierre}</td>
            <td>
                <button class="edit" onclick="editBranch(${index})">Editar</button>
                <button class="delete" onclick="deleteBranch(${index})">Eliminar</button>
            </td>
        `;

        branchList.appendChild(row);
    });
}

// Editar sucursal
function editBranch(index) {
    const sucursal = sucursales[index];
    document.getElementById('branch-name').value = sucursal.nombre;
    document.getElementById('branch-address').value = sucursal.direccion;
    document.getElementById('branch-url').value = sucursal.url;
    document.getElementById('branch-lat').value = sucursal.gps_latitud;
    document.getElementById('branch-lon').value = sucursal.gps_longitud;
    document.getElementById('opening-time').value = sucursal.horario_apertura;
    document.getElementById('closing-time').value = sucursal.horario_cierre;

    editIndex = index;
    document.getElementById('cancel-edit').style.display = 'block';
}

// Cancelar edición
document.getElementById('cancel-edit').addEventListener('click', function () {
    editIndex = -1;
    document.getElementById('branch-form').reset();
    this.style.display = 'none';
});

// Eliminar sucursal
function deleteBranch(index) {
    sucursales.splice(index, 1);
    renderBranches();
}

// Buscar sucursal
document.getElementById('search-input').addEventListener('input', function () {
    const searchTerm = this.value.toLowerCase();

    const filteredSucursales = sucursales.filter(sucursal =>
        sucursal.nombre.toLowerCase().includes(searchTerm) ||
        sucursal.direccion.toLowerCase().includes(searchTerm)
    );

    const branchList = document.getElementById('branch-list');
    branchList.innerHTML = '';

    filteredSucursales.forEach((sucursal, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${sucursal.nombre}</td>
            <td>${sucursal.direccion}</td>
            <td><img src="${sucursal.foto}" alt="Foto" width="50" height="50"></td>
            <td><a href="${sucursal.url}" target="_blank">${sucursal.url}</td>
            <td>${sucursal.gps_latitud}</td>
            <td>${sucursal.gps_longitud}</td>
            <td>${sucursal.horario_apertura}</td>
            <td>${sucursal.horario_cierre}</td>
            <td>
                <button class="btn btn-info" onclick="editBranch(${index})">Editar</button>
                <button class="btn btn-danger" onclick="deleteBranch(${index})">Eliminar</button>
            </td>
        `;

        branchList.appendChild(row);
    });
});
