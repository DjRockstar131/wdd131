// BOM List App – Davin Quist – WDD 131

// Get references to input, button, and list
const input = document.querySelector("#favchap");
const addBtn = document.querySelector("#addBtn");
const list = document.querySelector("#chapterList");

// Click event listener for Add Chapter button
addBtn.addEventListener("click", () => {
  const chapter = input.value.trim();

  // Check input is not blank
  if (chapter !== "") {
    // Create list item
    const li = document.createElement("li");
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
  }

  // Always put focus back in input
  input.focus();
});

// Event delegation for delete buttons
list.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const li = e.target.parentElement;
    list.removeChild(li);
  }
});
