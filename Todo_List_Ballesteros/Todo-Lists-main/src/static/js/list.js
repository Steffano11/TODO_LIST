document.addEventListener('DOMContentLoaded', () => {
    function createNewList(listName) {
        const listWrapper = document.createElement('div');
        listWrapper.className = 'list-wrapper';

        const listHeader = document.createElement('h2');
        listHeader.innerText = listName;
        listWrapper.appendChild(listHeader);

        const taskList = document.createElement('ol');
        taskList.className = 'task-list';

        let taskCounter = 1;

        const form = document.createElement('form');

        const input = document.createElement('input');
        input.id = `${listName}-task`;
        input.setAttribute('autocomplete', 'off');
        input.setAttribute('autofocus', 'true');
        input.setAttribute('placeholder', 'New Task');
        input.setAttribute('type', 'text');

        const submit = document.createElement('input');
        submit.setAttribute('type', 'submit');

        form.appendChild(input);
        form.appendChild(submit);

        form.className = 'task-form';

        form.onsubmit = (event) => {
            event.preventDefault();

            const checkbox = document.createElement("input");
            checkbox.className = 'task-checkbox';
            checkbox.setAttribute("type", "checkbox");

            const listItem = document.createElement('li');
            listItem.appendChild(checkbox);

            const taskText = document.querySelector(`#${listName}-task`).value;
            const taskTextNode = document.createTextNode(`${taskCounter}.- ${taskText}`);
            taskCounter++;

            listItem.appendChild(taskTextNode);

            const deleteButton = document.createElement('button');
            deleteButton.className = 'button-delete-task';
            deleteButton.innerText = 'x';
            deleteButton.onclick = () => {
                listItem.remove();
            };

            listItem.appendChild(deleteButton);

            checkbox.onchange = function () {
                if (this.checked) {
                    listItem.style.textDecoration = 'line-through';
                } else {
                    listItem.style.textDecoration = 'none';
                }
            };

            document.querySelector(`#${listName}-task`).value = '';
            taskList.appendChild(listItem);

            return false;
        };

        const markAllButton = document.createElement('button');
        markAllButton.className = 'button-mark-all';
        markAllButton.innerText = 'Marcar Todo';

        markAllButton.onclick = () => {
            const checkboxes = taskList.querySelectorAll('input[type="checkbox"]');
            checkboxes.forEach((checkbox) => {
                checkbox.checked = !checkbox.checked;
                const listItem = checkbox.parentNode;
                if (checkbox.checked) {
                    listItem.style.textDecoration = 'line-through';
                } else {
                    listItem.style.textDecoration = 'none';
                }
            });
        };

        const deleteListButton = document.createElement('button');
        deleteListButton.innerText = 'Eliminar Lista';
        deleteListButton.className = 'button-delete-list';

        deleteListButton.onclick = () => {
            const confirmDelete = confirm('¿Estás seguro de eliminar la lista?');
            if (confirmDelete) {
                listWrapper.remove();
            }
        };

        listWrapper.appendChild(form);
        listWrapper.appendChild(markAllButton);
        listWrapper.appendChild(deleteListButton);
        listWrapper.appendChild(taskList);

        document.body.appendChild(listWrapper);
    }

    document.querySelector('#new-list').onsubmit = (event) => {
        event.preventDefault();
        const listName = prompt('Ingresa el nombre de la lista:');
        if (listName !== null && listName.trim() !== '') {
            createNewList(listName);
        }
        return false;
    };
});
