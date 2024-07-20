import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addEditItem, removeEditItem } from '../utils/editModeSlice';

const TaskContainer = () => {
  const dispatch = useDispatch();
  const editTimeStamp = useSelector((store) => store.editModeSlice.timeStamp);

  const addItem = () => {
    if (message.current.value === '') return;
    setTaskList([
      ...taskList,
      { timeStamp: Date.now(), message: message.current.value },
    ]);
    message.current.value = '';
  };

  const editItem = () => {
    setTaskList(
      taskList.map((task) => {
        if (task.timeStamp === editTimeStamp) {
          task.message = editMessage.current.value;
        }
        return task;
      })
    );
    setEditMode(false);
    dispatch(removeEditItem());
    editMessage.current.value = '';
    message.current.value = '';
  };

  const deleteItem = (timeStamp) => {
    setTaskList(taskList.filter((elem) => elem.timeStamp !== timeStamp));
  };

  const [taskList, setTaskList] = useState(
    JSON.parse(localStorage.getItem('key') || '[]')
  );
  console.log(taskList);
  const [editMode, setEditMode] = useState(false);
  localStorage.setItem('key', JSON.stringify(taskList));
  console.log(taskList);
  const message = useRef();
  const editMessage = useRef();
  return (
    <div className="h-full bg-purple-100 py-10 flex flex-col items-center">
      <h1 className="text-3xl">Your Tasks ({taskList.length} Tasks)</h1>
      <form
        className="my-10 w-6/12 flex justify-center"
        onSubmit={(e) => e.preventDefault()}
      >
        {editMode ? (
          <>
            <input
              className="w-9/12 p-2 rounded-l-full"
              type="text"
              placeholder={'Edit Task'}
              ref={editMessage}
            />
            <button
              onClick={editItem}
              className="bg-green-400 p-2 rounded-r-full"
            >
              Edit Task
            </button>
          </>
        ) : (
          <>
            <input
              ref={message}
              type="text"
              className="w-9/12 p-2 rounded-l-full"
              placeholder="Write Down a Task"
            />
            <button
              onClick={addItem}
              className="bg-green-400 p-2 rounded-r-full"
            >
              Add Task
            </button>
          </>
        )}
      </form>
      {taskList.length > 0 && (
        <div className="w-6/12 h-auto flex flex-col-reverse scroll-smooth bg-gray-100 overflow-y-scroll">
          {taskList.map(({ timeStamp, message }) => (
            <div
              className={
                timeStamp === editTimeStamp
                  ? 'p-2 border-b border-black flex justify-between bg-red-400'
                  : 'p-2 border-b border-black flex justify-between'
              }
              key={timeStamp}
            >
              <span key={timeStamp}>- {message}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    dispatch(addEditItem(timeStamp));
                    setEditMode(true);
                  }}
                >
                  ✏️
                </button>
                <button onClick={() => deleteItem(timeStamp)}>❌</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskContainer;
