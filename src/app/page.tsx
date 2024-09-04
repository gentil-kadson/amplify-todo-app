'use client';

import Image from "next/image";
import { useEffect, useState } from "react";
import { client } from "./services/client";
import type { Schema } from "../../amplify/data/resource";

import { FaTrash } from 'react-icons/fa';
import { Amplify } from 'aws-amplify';
import outputs from '../../amplify_outputs.json';

Amplify.configure(outputs);



export default function Home() {

  const [todos, setTodos] = useState<Schema["Todo"]["type"][]>([]);
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    const sub = client.models.Todo.observeQuery().subscribe({
      next: ({ items }) => {
        setTodos([...items]);
      },
    });

    return () => sub.unsubscribe();

  }, []);

    
  function deleteTodo(id: string) {
    client.models.Todo.delete({ id })
  }


  const createTodo = async () => {
    console.log(todos, "createTodo");
    await client.models.Todo.create({
      content: content,
    });

  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 gap-10">
      <div className="flex flex-col items-center justify-center gap-12">
        <h1 className="text-white text-4xl">Lista de Tarefas</h1>
        <div className="flex flex-row gap-5">
          <input
            type="text"
            className="p-2 border border-gray-300 rounded"
            placeholder="Digite uma tarefa"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button 
          onClick={createTodo} 
          className="p-2 bg-blue-500 text-white rounded">
          Adicionar
        </button>
      </div>
      <div className="flex flex-col gap-4">
        { todos &&
          (
            todos.map(({ id, content }) => (
              <div key={id} className="flex flex-row gap-2">
                <div className="flex flex-row items-center p-[10px] rounded bg-violet-950 w-[280px]">
                  <p className="text-white">{content}</p>
                </div>
                <button onClick={() => deleteTodo(id)} className="bg-gray-50 p-[4px] rounded">
                  <FaTrash className="text-[24px] text-red-600"/>
                </button>
              </div>
            ))
          )
        }
      </div>
    </main>
  );
}



