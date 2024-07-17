export const todoList = (list) => {
  const todoListHtml = /*html*/ `
    ${list
      .map(
        (task) => /*html*/ `
            <li id="${task.id}" class="flex py-3">
                <div class="basis-9/12 text-left px-4">${task.name}</div> 
                <input 
                    class="basis-2/12 text-center" 
                    type="checkbox" 
                    hx-put="/task/${task.id}"
                    ${task.done ? "checked" : ""} 
                    readonly
                >
                <div class="basis-1/12"> 
                    <button 
                        hx-delete="/task/${task.id}" 
                        hx-target="closest li"
                        hx-swap="outerHTML"
                        class="text-red-500 hover:text-red-700"
                    >
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            </li>`
      )
      .join("")}`;
  return todoListHtml;
};

//data-hx-delete="/task/${task.id}
