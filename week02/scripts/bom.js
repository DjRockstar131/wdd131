// BOM List App – Davin Quist – WDD 131

// Get references to input, button, and list
const input = document.querySelector("#favchap");
const addBtn = document.querySelector("#addBtn");
const list = document.querySelector("#chapterList");

// Add chapter on button click
addBtn.addEventListener("click", () => {
  const chapter = input.value.trim();

  if (chapter !== "") {
    // Create list item
    const li = document.createElement("li");

    // Add chapter text
    li.textContent = chapter;

    // Create delete button
    const delBtn = document.createElement("button");
    delBtn.textContent = "❌";
    delBtn.setAttribute("aria-label", `Delete ${chapter}`);

    // Append delete button to li
    li.appendChild(delBtn);

    // Append li to ul
    list.appendChild(li);

    // Clear input field
    input.value = "";
    input.focus();

    // Delete functionality
    delBtn.addEventListener("click", () => {
      list.removeChild(li);
    });
  } else {
    input.focus();
  }
});
