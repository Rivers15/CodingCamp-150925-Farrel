document.addEventListener("DOMContentLoaded", () => {
  const listContainer = document.getElementById("list-container");
  const addBtn = document.getElementById("addBtn");
  const filterSelect = document.getElementById("filter");
  const todoInput = document.getElementById("todo-input");
  const todoDate = document.getElementById("todo-date");
  const deleteAllBtn = document.getElementById("deleteAllBtn");

  // Add event listener to Add button
  addBtn.addEventListener("click", () => {  
    
    // Take value from input
    const taskInput = todoInput.value.trim();
    const dateInput = todoDate.value;

    // Validate input
    if (!(todoInput.value, todoDate.value)) {
        alert("Please fill in both fields.");
        return;
    };
    
    // Add to todos array
    const li = document.createElement("tr");
    li.innerHTML = `
      <td class="px-4 py-2">${taskInput}</td>
      <td class="px-4 py-2 text-sm text-gray-500">${dateInput}</td>
      <td class="px-4 py-2 status">Pending</td>
      <td class="px-4 py-2 flex gap-2">
        <button class="bg-green-500 text-white px-2 py-1 rounded btn-finished">Finished</button>
        <button class="bg-red-500 text-white px-2 py-1 rounded btn-delete">Delete</button>
      </td>
    `;

    // Finished button
    li.querySelector(".btn-finished").addEventListener("click", () => {
      const statusCell = li.querySelector(".status");
      statusCell.textContent =
        statusCell.textContent === "Pending" ? "Finished" : "Pending";
      statusCell.style.color =
        statusCell.textContent.includes("Finished") ? "green" : "";
      applyFilter();
    });

    // Delete button
    li.querySelector(".btn-delete").addEventListener("click", () => {
      li.remove();
      if (!listContainer.querySelector("tr")) {
        showEmptyRow();
      }
    });
    
    // Delete All button
    deleteAllBtn.addEventListener("click", () => {
      listContainer.innerHTML = "";
      showEmptyRow();
    });
    
    listContainer.appendChild(li);

    // Clear input fields
    todoInput.value = "";
    todoDate.value = "";
    applyFilter();
  });

  // Filter
  filterSelect.addEventListener("change", applyFilter);
  function applyFilter() {
    const filter = filterSelect.value;
    const rows = listContainer.querySelectorAll("tr:not(#empty-row)");

    rows.forEach(li => {
      const statusCell = li.querySelector(".status");
      if (!statusCell) return;
      const status = statusCell.textContent.trim();
      li.style.display =
        filter === "all" ||
        (filter === "pending" && status === "Pending") ||
        (filter === "finished" && status.startsWith("Finished"))
          ? ""
          : "none";
    });
  }

});