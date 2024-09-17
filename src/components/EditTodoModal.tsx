type EditTodoModalProps = {
  todo: { id: string; content: string };
};

export default function EditTodoModal({ todo }: EditTodoModalProps) {
  return (
    <section className="flex flex-col gap-4 bg-neutral-900 rounded absolute p-4 text-white">
      <h1 className="text-lg font-semibold">Editar Tarefa</h1>
      <form className="flex gap-2">
        <input
          className="focus:outline-none rounded bg-neutral-800 px-2"
          defaultValue={todo.content}
          type="text"
          name="todo-title"
          id="todo-title"
        />
        <button className="bg-blue-700 py-2 px-4 rounded hover:brightness-75">
          Editar
        </button>
        <button className="bg-red-600 py-2 px-4 rounded hover:brightness-75">
          Cancelar
        </button>
      </form>
    </section>
  );
}
