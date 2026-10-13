async function loadmenu(filter) {
    const container = document.getElementById('menu-container');
    
    try {

        const response = await fetch(`http://localhost:3000/api/menus/${filter}`);
        const menuItems = await response.json();
        

        container.innerHTML = ""; 

        menuItems.forEach(item => {
            const ItemDiv = document.createElement('div');
            ItemDiv.className = 'menu-item';
            ItemDiv.innerHTML = `
                <img class="menu-img" src="img/${item.name}.jpg" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>ราคา: ${item.price} บาท</p>
                <p>หมวดหมู่: ${item.cat}</p>
            `;
            container.appendChild(ItemDiv);
        });
    } catch (error) {
        console.error("เกิดข้อผิดพลาดในการโหลดเมนู:", error);
    }
}

const filterButtons = document.querySelectorAll(".filter");
filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const filterValue = btn.id;
        loadmenu(filterValue);
    });
});


loadmenu("all");
