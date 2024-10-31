import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  remove,
  clear,
  update,
  updateAge,
  add,
  updateName,
} from "./redux/studentSlice";
import { MdEdit } from "react-icons/md";

function App() {
  const [currentStudent, setCurrentStudent] = useState(null);
  const [modalType, setModalType] = useState(null);
  const student = useSelector((state) => state.student.value);
  const dispatch = useDispatch();
  const formRef = useRef();
  const ageRef = useRef();
  const nameRef = useRef();
  const ageModalRef = useRef();
  const nameModalRef = useRef();
  function handleSubmit(e) {
    e.preventDefault();
    const data = {
      id: Date.now(),
      name: nameRef.current.value,
      age: ageRef.current.value,
    };
    dispatch(add(data));
    formRef.current.reset();
  }
  function hdDel(id) {
    dispatch(remove(id));
  }
  function hdclr() {
    dispatch(clear());
  }
  function openModal(type, student) {
    setCurrentStudent(student);
    setModalType(type);
    if (type === "name") {
      nameModalRef.current.value = student.name;
    } else if (type === "age") {
      ageModalRef.current.value = student.age;
    } else if (type === "full") {
      nameModalRef.current.value = student.name;
      ageModalRef.current.value = student.age;
    }
  }

  function handleEditSubmit() {
    if (modalType === "name") {
      dispatch(
        updateName({ id: currentStudent.id, name: nameModalRef.current.value })
      );
    } else if (modalType === "age") {
      dispatch(
        updateAge({ id: currentStudent.id, age: ageModalRef.current.value })
      );
    } else if (modalType === "full") {
      dispatch(
        update({
          id: currentStudent.id,
          name: nameModalRef.current.value,
          age: ageModalRef.current.value,
        })
      );
    }
    setModalType(null);
  }

  return (
    <div className="flex flex-col bg-zinc-900 h-[700px]">
      <div className="flex justify-center ">
        <form
          className=" shadow-md shadow-slate-200 p-6 w-[400px] rounded-md mt-9 h-[300px] "
          ref={formRef}
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label htmlFor="name" className="block text-white">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="mt-1 block w-full px-4 py-2 border"
              ref={nameRef}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="age" className="block text-white">
              Age
            </label>
            <input
              type="number"
              id="age"
              name="age"
              className="mt-1 block w-full px-4 py-2 border"
              ref={ageRef}
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-md"
          >
            Submit
          </button>
        </form>
      </div>

      <div className="flex justify-end  container mx-auto px-24">
        <button
          className=" p-3 relative mr-[1200px]  rounded-md bg-red-00 text-white"
          onClick={hdclr}
        >
          All Clear
        </button>
      </div>

      <div className="wrapper grid w-[1200px]  grid-cols-4 gap-6 container ">
        {student.map((value) => (
          <div
            key={value.id}
            className="shadow-lg  flex flex-col gap-6 p-4 rounded-lg shadow-slate-800"
          >
            <div className="flex justify-between">
              <h3 className="text-2xl font-bold text-white">
                Name: {value.name.toUpperCase()}
              </h3>
              <button onClick={() => openModal("name", value)}>
                <MdEdit />
              </button>
            </div>
            <div className="flex justify-between">
              <p className="text-white text-2xl">Age: {value.age}</p>
              <button onClick={() => openModal("age", value)}>
                <MdEdit />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-100 hover:bg-blue-700 rounded-md text-white py-2 px-5 mt-2"
                onClick={() => openModal("full", value)}
              >
                Update
              </button>
              <button
                className="bg-red-100 hover:bg-red-700 rounded-md text-white py-2 px-5 mt-2"
                onClick={() => hdDel(value.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {modalType && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-gray-900 text-white w-full max-w-md p-6 rounded-lg shadow-lg relative">
            <button
              className="absolute top-3 right-3 text-white"
              onClick={() => setModalType(null)}
            >
              &times;
            </button>
            <h2 className="text-2xl font-semibold text-center text-white mb-4">
              {modalType === "name"
                ? "Update Name"
                : modalType === "age"
                ? "Update Age"
                : ""}
            </h2>
            <div className="space-y-4">
              {(modalType === "name" || modalType === "full") && (
                <div>
                  <label htmlFor="update-name" className="block text-white">
                    Name:
                  </label>
                  <input
                    type="text"
                    id="update-name"
                    className="mt-1 block w-full px-4 py-2 border"
                    ref={nameModalRef}
                  />
                </div>
              )}
              {(modalType === "age" || modalType === "full") && (
                <div>
                  <label htmlFor="update-age" className="block text-white">
                    Age:
                  </label>
                  <input
                    type="number"
                    id="update-age"
                    className="mt-1 block w-full px-4 py-2 border"
                    ref={ageModalRef}
                  />
                </div>
              )}
              <button
                onClick={handleEditSubmit}
                className="w-full py-2 px-4 bg-blue-500 text-white rounded-md mt-4"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
