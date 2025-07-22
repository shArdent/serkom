import { DataTable } from "./components/DataTable";
import { useEffect, useState } from "react";
import { api } from "./lib/axios";
import AddRenterForm from "./components/AddRenterForm";

function App() {
    const [rent, setRent] = useState(null);
    const [currentForm, setCurrentForm] = useState({
        id: 0,
        name: "",
        selectedCar: "",
        selectedProgram: "",
        duration: 0,
        extraHours: 0,
    });
    const [isEditing, setIsEditing] = useState(false);

    const getData = async () => {
        const { data } = await api.get("/");
        console.log(data);

        setRent(data);
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <main className="min-h-dvh w-full flex flex-col px-10 py-10 gap-10 items-start justify-center">
            <h1 className="text-4xl font-extrabold text-center w-full">
                Rental Mobil
            </h1>
            <AddRenterForm currentForm={currentForm} isEditing={isEditing} />
            <DataTable data={rent} setForm={setCurrentForm} setIsEditing={setIsEditing} />
        </main>
    );
}

export default App;
