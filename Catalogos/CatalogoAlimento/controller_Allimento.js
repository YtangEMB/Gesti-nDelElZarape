let alimentos = [];
let editIndex = -1;

// Cargar alimentos desde el archivo JSON al iniciar
fetch('alimentos.json')
    .then(response => response.json())
    .then(data => {
        alimentos = data;
        renderFoods();
    });

// Guardar o actualizar alimento
document.getElementById('food-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const alimento = {
        nombre: document.getElementById('food-name').value,
        precio: document.getElementById('food-price').value,
        descripcion: document.getElementById('food-description').value,
        foto: document.getElementById('food-photo').files[0] ? URL.createObjectURL(document.getElementById('food-photo').files[0]) : "",
        categoria: document.getElementById('food-category').value
    };

    if (editIndex === -1) {
        alimentos.push(alimento);
    } else {
        alimentos[editIndex] = alimento;
        editIndex = -1;
        document.getElementById('cancel-edit').style.display = 'none';
    }

    renderFoods();
    document.getElementById('food-form').reset();
});

// Renderizar lista de alimentos
function renderFoods() {
    const foodList = document.getElementById('food-list');
    foodList.innerHTML = '';

    alimentos.forEach((alimento, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${alimento.nombre}</td>
            <td>${alimento.precio}</td>
            <td>${alimento.descripcion}</td>
            <td><img src="${alimento.foto}" alt="Foto" width="50" height="50"></td>
            <td>${alimento.categoria}</td>
            <td>
                <button class="edit" onclick="editFood(${index})">Editar</button>
                <button class="delete" onclick="deleteFood(${index})">Eliminar</button>
            </td>
        `;

        foodList.appendChild(row);
    });
}

// Editar alimento
function editFood(index) {
    const alimento = alimentos[index];
    document.getElementById('food-name').value = alimento.nombre;
    document.getElementById('food-price').value = alimento.precio;
    document.getElementById('food-description').value = alimento.descripcion;
    document.getElementById('food-category').value = alimento.categoria;

    editIndex = index;
    document.getElementById('cancel-edit').style.display = 'block';
}

// Cancelar edición
document.getElementById('cancel-edit').addEventListener('click', function () {
    editIndex = -1;
    document.getElementById('food-form').reset();
    this.style.display = 'none';
});

// Eliminar alimento
function deleteFood(index) {
    alimentos.splice(index, 1);
    renderFoods();
}

// Buscar alimento
document.getElementById('search-input').addEventListener('input', function () {
    const searchTerm = this.value.toLowerCase();

    const filteredAlimentos = alimentos.filter(alimento =>
        alimento.nombre.toLowerCase().includes(searchTerm) ||
        alimento.descripcion.toLowerCase().includes(searchTerm) ||
        alimento.categoria.toLowerCase().includes(searchTerm)
    );

    const foodList = document.getElementById('food-list');
    foodList.innerHTML = '';

    filteredAlimentos.forEach((alimento, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${alimento.nombre}</td>
            <td>${alimento.precio}</td>
            <td>${alimento.descripcion}</td>
            <td><img src="${alimento.foto}" alt="Foto" width="50" height="50"></td>
            <td>${alimento.categoria}</td>
            <td>
                <button class="btn btn-info" onclick="editFood(${index})">Editar</button>
                <button class="btn btn-danger" onclick="deleteFood(${index})">Eliminar</button>
            </td>
        `;

        foodList.appendChild(row);
    });
});
