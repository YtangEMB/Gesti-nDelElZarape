let combos = [];
let editIndex = -1;

// Cargar combos desde el archivo JSON al iniciar
fetch('combos.json')
    .then(response => response.json())
    .then(data => {
        combos = data;
        renderCombos();
    });

// Cargar platillos y bebidas en los selectores
function loadOptions() {
    const dishSelect = document.getElementById('combo-dishes');
    const beverageSelect = document.getElementById('combo-beverages');

    fetch('../CatalogoAlimento/alimentos.json')
        .then(response => response.json())
        .then(dishes => {
            dishSelect.innerHTML = dishes.map(dish => `<option value="${dish.nombre}">${dish.nombre}</option>`).join('');
        });

    fetch('../CatalogoBebida/bebidas.json')
        .then(response => response.json())
        .then(beverages => {
            beverageSelect.innerHTML = beverages.map(beverage => `<option value="${beverage.nombre}">${beverage.nombre}</option>`).join('');
        });
}

// Llamar a la función para cargar las opciones al inicio
loadOptions();

// Guardar o actualizar combo
document.getElementById('combo-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const combo = {
        nombre: document.getElementById('combo-name').value,
        platillos: Array.from(document.getElementById('combo-dishes').selectedOptions).map(option => option.value),
        bebidas: Array.from(document.getElementById('combo-beverages').selectedOptions).map(option => option.value),
        foto: document.getElementById('combo-photo').files[0] ? URL.createObjectURL(document.getElementById('combo-photo').files[0]) : "",
        precio: document.getElementById('combo-price').value,
        descripcion: document.getElementById('combo-description').value
    };

    if (editIndex === -1) {
        combos.push(combo);
    } else {
        combos[editIndex] = combo;
        editIndex = -1;
        document.getElementById('cancel-edit').style.display = 'none';
    }

    renderCombos();
    document.getElementById('combo-form').reset();
});

// Renderizar lista de combos
function renderCombos() {
    const comboList = document.getElementById('combo-list');
    comboList.innerHTML = '';

    combos.forEach((combo, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${combo.nombre}</td>
            <td>${combo.platillos.join(', ')}</td>
            <td>${combo.bebidas.join(', ')}</td>
            <td><img src="${combo.foto}" alt="Foto" width="50" height="50"></td>
            <td>${combo.precio}</td>
            <td>${combo.descripcion}</td>
            <td>
                <button class="edit" onclick="editCombo(${index})">Editar</button>
                <button class="delete" onclick="deleteCombo(${index})">Eliminar</button>
            </td>
        `;

        comboList.appendChild(row);
    });
}

// Editar combo
function editCombo(index) {
    const combo = combos[index];
    document.getElementById('combo-name').value = combo.nombre;

    // Seleccionar platillos y bebidas
    const dishSelect = document.getElementById('combo-dishes');
    const beverageSelect = document.getElementById('combo-beverages');

    Array.from(dishSelect.options).forEach(option => {
        option.selected = combo.platillos.includes(option.value);
    });

    Array.from(beverageSelect.options).forEach(option => {
        option.selected = combo.bebidas.includes(option.value);
    });

    document.getElementById('combo-price').value = combo.precio;
    document.getElementById('combo-description').value = combo.descripcion;

    editIndex = index;
    document.getElementById('cancel-edit').style.display = 'block';
}

// Cancelar edición
document.getElementById('cancel-edit').addEventListener('click', function () {
    editIndex = -1;
    document.getElementById('combo-form').reset();
    this.style.display = 'none';
});

// Eliminar combo
function deleteCombo(index) {
    combos.splice(index, 1);
    renderCombos();
}

// Buscar combo
document.getElementById('search-input').addEventListener('input', function () {
    const searchTerm = this.value.toLowerCase();

    const filteredCombos = combos.filter(combo =>
        combo.nombre.toLowerCase().includes(searchTerm) ||
        combo.descripcion.toLowerCase().includes(searchTerm)
    );

    const comboList = document.getElementById('combo-list');
    comboList.innerHTML = '';

    filteredCombos.forEach((combo, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${combo.nombre}</td>
            <td>${combo.platillos.join(', ')}</td>
            <td>${combo.bebidas.join(', ')}</td>
            <td><img src="${combo.foto}" alt="Foto" width="50" height="50"></td>
            <td>${combo.precio}</td>
            <td>${combo.descripcion}</td>
            <td>
                <button class="btn btn-info" onclick="editCombo(${index})">Editar</button>
                <button class="btn btn-danger" onclick="deleteCombo(${index})">Eliminar</button>
            </td>
        `;

        comboList.appendChild(row);
    });
});
