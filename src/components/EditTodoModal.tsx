type EditTodoModalProps = {
  todoId: string;
  onClick: () => Promise<void>;
  setContent: (newContent: string) => void;
  setEditModalInfo: (data: { show: boolean; todoId: string }) => void;
};

export default function EditTodoModal({
  todoId,
  onClick,
  setContent,
  setEditModalInfo,
}: EditTodoModalProps) {
  return (
    <section className="flex flex-col gap-4 bg-neutral-900 rounded absolute p-4 text-white">
      <h1 className="text-lg font-semibold">Editar Tarefa</h1>
      <form
        method="post"
        className="flex gap-2"
        onSubmit={async (e) => {
          e.preventDefault();
          await onClick();
        }}
      >
        <input
          className="focus:outline-none rounded bg-neutral-800 px-2"
          type="text"
          name="todo-title"
          id="todo-title"
          onChange={(e) => setContent(e.target.value)}
        />
        <button className="bg-blue-700 py-2 px-4 rounded hover:brightness-75">
          Editar
        </button>
        <button
          type="button"
          onClick={() => {
            setContent("");
            setEditModalInfo({ show: false, todoId: "" });
          }}
          className="bg-red-600 py-2 px-4 rounded hover:brightness-75"
        >
          Cancelar
        </button>
      </form>
    </section>
  );
}
