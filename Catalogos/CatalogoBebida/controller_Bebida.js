let bebidas = [];
let editIndex = -1;

// Cargar bebidas desde el archivo JSON al iniciar
fetch('bebidas.json')
    .then(response => response.json())
    .then(data => {
        bebidas = data;
        renderBeverages();
    });

// Guardar o actualizar bebida
document.getElementById('beverage-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const bebida = {
        nombre: document.getElementById('beverage-name').value,
        precio: document.getElementById('beverage-price').value,
        descripcion: document.getElementById('beverage-description').value,
        foto: document.getElementById('beverage-photo').files[0] ? URL.createObjectURL(document.getElementById('beverage-photo').files[0]) : "",
        categoria: document.getElementById('beverage-category').value
    };

    if (editIndex === -1) {
        bebidas.push(bebida);
    } else {
        bebidas[editIndex] = bebida;
        editIndex = -1;
        document.getElementById('cancel-edit').style.display = 'none';
    }

    renderBeverages();
    document.getElementById('beverage-form').reset();
});

// Renderizar lista de bebidas
function renderBeverages() {
    const beverageList = document.getElementById('beverage-list');
    beverageList.innerHTML = '';

    bebidas.forEach((bebida, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${bebida.nombre}</td>
            <td>${bebida.precio}</td>
            <td>${bebida.descripcion}</td>
            <td><img src="${bebida.foto}" alt="Foto" width="50" height="50"></td>
            <td>${bebida.categoria}</td>
            <td>
                <button class="edit" onclick="editBeverage(${index})">Editar</button>
                <button class="delete" onclick="deleteBeverage(${index})">Eliminar</button>
            </td>
        `;

        beverageList.appendChild(row);
    });
}

// Editar bebida
function editBeverage(index) {
    const bebida = bebidas[index];
    document.getElementById('beverage-name').value = bebida.nombre;
    document.getElementById('beverage-price').value = bebida.precio;
    document.getElementById('beverage-description').value = bebida.descripcion;
    document.getElementById('beverage-category').value = bebida.categoria;

    editIndex = index;
    document.getElementById('cancel-edit').style.display = 'block';
}

// Cancelar edición
document.getElementById('cancel-edit').addEventListener('click', function () {
    editIndex = -1;
    document.getElementById('beverage-form').reset();
    this.style.display = 'none';
});

// Eliminar bebida
function deleteBeverage(index) {
    bebidas.splice(index, 1);
    renderBeverages();
}

// Buscar bebida
document.getElementById('search-input').addEventListener('input', function () {
    const searchTerm = this.value.toLowerCase();

    const filteredBebidas = bebidas.filter(bebida =>
        bebida.nombre.toLowerCase().includes(searchTerm) ||
        bebida.descripcion.toLowerCase().includes(searchTerm)
    );

    const beverageList = document.getElementById('beverage-list');
    beverageList.innerHTML = '';

    filteredBebidas.forEach((bebida, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${bebida.nombre}</td>
            <td>${bebida.precio}</td>
            <td>${bebida.descripcion}</td>
            <td><img src="${bebida.foto}" alt="Foto" width="50" height="50"></td>
            <td>${bebida.categoria}</td>
            <td>
                <button class="btn btn-info" onclick="editBeverage(${index})">Editar</button>
                <button class="btn btn-danger" onclick="deleteBeverage(${index})">Eliminar</button>
            </td>
        `;

        beverageList.appendChild(row);
    });
});
