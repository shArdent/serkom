import { useEffect, useState } from "react";
import FormSelect from "./FormSelect";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { api } from "@/lib/axios";
import { Button } from "./ui/button";

export default function AddRenterForm({
    currentForm,
    isEditing,
}) {
    const [cars, setCars] = useState([]);
    const [programs, setPrograms] = useState([]);
    const [selectedCar, setSelectedCar] = useState(currentForm.selectedCar);
    const [selectedProgram, setSelectedProgram] = useState(
        currentForm.selectedProgram,
    );
    const [name, setName] = useState(currentForm.name);
    const [duration, setDuration] = useState(currentForm.duration);
    const [extraHours, setExtraHours] = useState(currentForm.extraHours);
    const [currId, setCurrId] = useState(null);

    useEffect(() => {
        setName(currentForm.name);
        setSelectedCar(currentForm.selectedCar);
        setSelectedProgram(currentForm.selectedProgram);
        setDuration(currentForm.duration);
        setExtraHours(currentForm.extraHours);
        setCurrId(currentForm.id)
    }, [currentForm]);


    const getAllData = async () => {
        const { data: programsData } = await api.get("/program");
        const { data: carsData } = await api.get("/cars");

        setCars(carsData);
        setPrograms(programsData);
    };

    useEffect(() => {
        console.log(currId);
    }, [currId]);

    useEffect(() => {
        getAllData();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const payload = {
            renter_name: name,
            car_id: +selectedCar,
            program_id: selectedProgram ? +selectedProgram : null,
            duration: duration != 0 ? +duration : null,
        };

        await api.post("/rents", payload);
        window.location.reload();
    };

    const handleEdit = async (e) => {
        e.preventDefault();
        try {
            const newDuration = duration == 0 ? null : +duration
            console.log(duration)

            const payload = {
                renter_name: name,
                car_id: +selectedCar,
                program_id: selectedProgram ? +selectedProgram : null,
                duration: duration == 0 ? null : +duration,
                ...(extraHours ? { extra_hours: +extraHours } : {})
            };

            console.log(payload)

            await api.patch(`/rents/${currId}`, payload);
            window.location.reload()
        } catch (error) {
            console.log(error)
            alert("Gagal update data")

        }

    };

    return (
        <form
            onSubmit={isEditing ? handleEdit : handleSubmit}
            className="w-full mx-auto p-6 bg-white rounded-xl shadow-md space-y-6"
        >
            <div className="space-y-2">
                <Label htmlFor="name">Nama Penyewa</Label>
                <Input
                    id="name"
                    type="text"
                    placeholder="Masukkan nama lengkap"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div className="space-y-2">
                <Label>Mobil</Label>
                <FormSelect data={cars} value={selectedCar} onChange={setSelectedCar} />
            </div>

            <div className="space-y-2">
                <Label>Program</Label>
                <FormSelect
                    data={programs}
                    value={selectedProgram}
                    onChange={setSelectedProgram}
                />
            </div>

            {(!selectedProgram || duration > 0) && (
                <div className="space-y-2">
                    <Label>Durasi (dalam hari)</Label>
                    <Input
                        id="duration"
                        type="number"
                        placeholder="10"
                        value={duration}
                        onChange={(e) => setDuration(+e.target.value)}
                    />
                </div>
            )}

            {isEditing && (
                <div className="space-y-2">
                    <Label>Extra/hour</Label>
                    <Input
                        id="extra-hour"
                        type="numeric"
                        placeholder="10"
                        value={extraHours}
                        onChange={(e) => setExtraHours(+e.target.value)}
                    />
                </div>
            )}

            <Button type="submit" className="w-full">
                {isEditing ? "Edit data" : "Tambah data"}
            </Button>
        </form>
    );
}
