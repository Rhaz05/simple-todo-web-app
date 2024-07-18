export const todoList = (list) => {
  const todoListHtml = /*html*/ `
      ${list
        .map(
          (task) => /*html*/ `
              <li id="${task.id}" class="flex py-3">
                  <input 
                      class="basis-1/12 text-center" 
                      type="checkbox" 
                      hx-put="/task/${task.id}"
                      hx-target="closest li"
                      hx-swap="outerHTML"
                      ${task.done ? "checked" : ""} 
                      readonly
                  >
                  <div 
                      class="basis-9/12 text-left px-4 hover:cursor-pointer ${
                        task.done ? "line-through" : ""
                      }"
                      hx-get="/task/${task.id}"
                      hx-target="closest li"
                      hx-swap="innerHTML"
                      hx-trigger="click"
                  >
                      ${task.name}
                  </div> 
                  <div class="basis-2/12"> 
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

export const updateTask = (task) => {
  const editField = /*html*/ `
    <div class="w-full">
        <form class="flex justify-between gap-3" hx-put="/task/edit/${task.id}" hx-target="closest li" hx-swap="outerHTML">
            <input 
                type="text" 
                name="task" 
                class="basis-10/12 text-left px-4 py-1 hover:cursor-pointer rounded-md border-slate-300 border" 
                value="${task.name}"
                autocomplete="off"
                required
            >
            <button class="basis-2/12 border text-teal-400 border-teal-400 hover:bg-teal-400 hover:text-white px-4 rounded-md">
                Apply
            </button>
        </form>
    </div>`;

  return editField;
};

//data-hx-delete="/task/${task.id}
