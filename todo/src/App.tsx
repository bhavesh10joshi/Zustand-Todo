import './App.css'
import { SendIcon } from './Components/Icons/Send'
import { UseTodos } from './Store/ZustandStore'
import { useRef } from 'react';
import { DeleteIcon } from './Components/Icons/Delete';

function App() {
  const Todo = UseTodos();
  const TodoRef = useRef<HTMLInputElement>(null);

  function getUniqueId(){
      const val =  Math.floor(10000 + Math.random() * 90000);
      return val;
  }
  function AddTodo()
  {
    const val:string|undefined = TodoRef.current?.value;
    TodoRef.current!.value = "";
    const todo:any = {
      id : getUniqueId() ,
      name : val, 
      isDone : false 
    }
    Todo.AddTodo(todo);
    console.log(Todo.Todos);
  }
  return <>
    <div className='h-screen w-screen bg-black flex justify-center items-center'>
      <div className='w-[50rem] h-[30rem] text-white flex flex-col border border-slate-500 rounded-md overflow-hidden'>
        <div className='justify-start items-center w-full pl-[2rem] pt-[1rem] pr-[2rem]'>
            <div className='font-bold text-slate-300 font-mono text-[3rem]'>
              Todos
            </div>
            <div className='font-mono text-[0.7rem] pl-[0.4rem]'>
              Enter your Tasks.... 
            </div>
        </div>
        <div className='pl-[2rem] pr-[2rem] pt-[1rem] flex'>
          <input type="text" aria-label='name' className='flex justify-center items-center w-full rounded-md bg-black  border border-white text-mono text-green-500 h-[2.5rem] pl-[2rem] pr-[2rem] placeholder:text-[0.8rem]' placeholder='Enter the name of the task...' ref={TodoRef}/>
          <button type='submit' aria-label='name' className='ml-[1rem]' onClick={() => AddTodo()}><SendIcon/></button>
        </div>
        <div className='pl-[1rem] pr-[3rem] mt-[2rem] w-full overflow-y-auto flex-1 hide-scrollbar'>
            {
              Todo.Todos?.map((val:any) => (
                <div className='ml-[1rem] bg-blue-800 pl-[2rem] pr-[2rem] rounded-md flex pt-[1rem] pb-[1rem] w-full place-content-between mt-[1rem]'>
                  <div className={`text-[1.3rem] font-mono font-bold flex justify-center items-center ${val.isDone ?`line-through` :``}`}>{val.name}</div>
                  <div className='flex justify-center items-center gap-4'>
                    {
                    !val.isDone
                      ?<div className='flex justify-center items-center'>
                        <input type="checkbox" aria-label='name' className='w-[1.4rem] h-[1.4rem]' onChange={() => Todo.ToogleTodo(val.id , true)}/>
                      </div>
                      :null
                    }
                    <div className='w-1/8 bg-red-800 rounded-md flex justify-center items-center p-[0.3rem]' onClick={() => Todo.DeleteTodo(val.id)}><DeleteIcon/></div>
                  </div>
                </div> 
              ))
            }
        </div>
      </div>
    </div>
  </>
}

export default App
