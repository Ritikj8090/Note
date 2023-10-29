import { useNavigate } from "react-router-dom";
import notesStore from "../stores/noteStore";

export default function UpdateForm() {
  const store = notesStore();
  const navigate = useNavigate()

  console.log(store.updateForm)
  if (!store.updateForm._id) return <></>;

  return (
    <div className="flex items-center justify-center h-screen w-full">
      <div className={`${store.updateForm.color} p-5 rounded-3xl`}>
      <h2 className="text-2xl font-semibold flex items-center justify-center">Update Note</h2>
      <form onSubmit={() => {store.updateNote(); navigate('/')}} className="w-[300px]">
        <input
          onChange={store.handleUpdateFieldChange}
          value={store.updateForm.title}
          name="title"
          className="border-2 flex w-full h-full my-2 rounded-xl p-3"
          placeholder="Title"
        />
        <textarea
          onChange={store.handleUpdateFieldChange}
          value={store.updateForm.body}
          name="body"
          className="border-2 flex w-full h-full my-2 rounded-xl p-3"
          placeholder="Body..."
        />
        <button className=" flex w-full h-full rounded-xl p-3 items-center justify-center font-bold bg-purple-400" type="submit">Update note</button>
        <div className="mt-5 flex gap-2">
        <input name="color" value={"bg-red-300"} onClick={store.handleUpdateFieldChange}  className="cursor-pointer hover:border-2 rounded-full text-red-300 bg-red-300 h-[50px] w-[50px]"/>
        <input name="color" value={"bg-orange-300"} onClick={store.handleUpdateFieldChange}  className="cursor-pointer hover:border-2 rounded-full text-orange-300 bg-orange-300 h-[50px] w-[50px]"/>
        <input name="color" value={"bg-blue-300"} onClick={store.handleUpdateFieldChange}  className="cursor-pointer hover:border-2 rounded-full text-blue-300 bg-blue-300 h-[50px] w-[50px]"/>
        <input name="color" value={"bg-pink-300"} onClick={store.handleUpdateFieldChange}  className="cursor-pointer hover:border-2 rounded-full text-pink-300 bg-pink-300 h-[50px] w-[50px]"/>
        <input name="color" value={"bg-gray-300"} onClick={store.handleUpdateFieldChange}  className="cursor-pointer hover:border-2 rounded-full text-gray-300 bg-gray-300 h-[50px] w-[50px]"/>
      </div>
      </form>
      </div>
    </div>
  );
}