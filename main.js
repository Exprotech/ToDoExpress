// When the window has finished loading
window.addEventListener('load', () => {

    // Get references to HTML elements
    const form = document.querySelector("#new-task-form");
    const input = document.querySelector("#new-task-input");
    const list_el = document.querySelector("#tasks");

    let draggedItem = null;

    // Event listener for form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get the task from the input field
        const task = input.value;

        // Create task element
        const task_el = document.createElement('div');
        task_el.classList.add('task');
        task_el.draggable = true;

        // Create task content element
        const task_content_el = document.createElement('div');
        task_content_el.classList.add('content');

        // Append content element to task element
        task_el.appendChild(task_content_el);

        // Create task input element
        const task_input_el = document.createElement('input');
        task_input_el.classList.add('text');
        task_input_el.type = 'text';
        task_input_el.value = task;
        task_input_el.setAttribute('readonly', 'readonly');

        // Append input element to content element
        task_content_el.appendChild(task_input_el);

        // Create task actions element
        const task_actions_el = document.createElement('div');
        task_actions_el.classList.add('actions');
        
        // Create Edit button
        const task_edit_el = document.createElement('button');
        task_edit_el.classList.add('edit');
        task_edit_el.innerText = 'Edit';

        // Create Delete button
        const task_delete_el = document.createElement('button');
        task_delete_el.classList.add('delete');
        task_delete_el.innerText = 'Delete';

        // Append buttons to actions element
        task_actions_el.appendChild(task_edit_el);
        task_actions_el.appendChild(task_delete_el);

        // Append actions element to task element
        task_el.appendChild(task_actions_el);

        // Append task element to the task list
        list_el.appendChild(task_el);

        // Clear input field
        input.value = '';

        // Event listener for Edit button click
        task_edit_el.addEventListener('click', (e) => {
            if (task_edit_el.innerText.toLowerCase() == "edit") {
                // Switch to edit mode
                task_edit_el.innerText = "Save";
                task_input_el.removeAttribute("readonly");
                task_input_el.focus();
            } else {
                // Switch back to view mode
                task_edit_el.innerText = "Edit";
                task_input_el.setAttribute("readonly", "readonly");
            }
        });

        // Event listener for Delete button click
        task_delete_el.addEventListener('click', (e) => {
            // Remove the task element from the list
            list_el.removeChild(task_el);
        });

        // Event listeners for drag-and-drop
        task_el.addEventListener('dragstart', handleDragStart);
        task_el.addEventListener('dragover', handleDragOver);
        task_el.addEventListener('dragenter', handleDragEnter);
        task_el.addEventListener('dragleave', handleDragLeave);
        task_el.addEventListener('drop', handleDrop);
        task_el.addEventListener('dragend', handleDragEnd);
    });

    // Function to handle drag start
    function handleDragStart(e) {
        draggedItem = this;
        setTimeout(() => {
            this.style.display = 'none';
        }, 0);
    }

    // Function to handle drag over
    function handleDragOver(e) {
        e.preventDefault();
    }

    // Function to handle drag enter
    function handleDragEnter(e) {
        e.preventDefault();
        this.classList.add('over');
    }

    // Function to handle drag leave
    function handleDragLeave() {
        this.classList.remove('over');
    }

    // Function to handle drop
    function handleDrop() {
        this.classList.remove('over');
        list_el.insertBefore(draggedItem, this);
    }

    // Function to handle drag end
    function handleDragEnd() {
        this.style.display = 'block';
        draggedItem = null;
    }
});

// Function to capitalize the first letter of the input field
function capitalizeFirstLetter() {
    const inputField = document.getElementById('new-task-input');
    const inputValue = inputField.value;
    if (inputValue.length > 0) {
        inputField.value = inputValue.charAt(0).toUpperCase() + inputValue.slice(1);
    }
}
