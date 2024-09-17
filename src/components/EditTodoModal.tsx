import { useState } from "react";

type EditTodoModalProps = {
  resetModalFunction: () => void;
  editInitialInfo: { show: boolean; todo: { id: string; content: string } };
  editTodo: (id: string, content: string) => Promise<void>;
};

export default function EditTodoModal({
  resetModalFunction,
  editInitialInfo,
  editTodo,
}: EditTodoModalProps) {
  const [newContent, setNewContent] = useState<string>(
    editInitialInfo.todo.content
  );

  return (
    <section className="flex flex-col gap-4 bg-neutral-900 rounded absolute p-4 text-white">
      <h1 className="text-lg font-semibold">Editar Tarefa</h1>
      <form
        method="post"
        className="flex gap-2"
        onSubmit={async (e) => {
          e.preventDefault();
          await editTodo(editInitialInfo.todo.id, newContent);
        }}
      >
        <input
          className="focus:outline-none rounded bg-neutral-800 px-2"
          type="text"
          name="todo-title"
          id="todo-title"
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
        />
        <button className="bg-blue-700 py-2 px-4 rounded hover:brightness-75">
          Editar
        </button>
        <button
          type="button"
          className="bg-red-600 py-2 px-4 rounded hover:brightness-75"
          onClick={resetModalFunction}
        >
          Cancelar
        </button>
      </form>
    </section>
  );
}
